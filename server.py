from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request, make_response, jsonify

import json
import hashlib
import os
import jwt
import datetime

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/inkredo"
mongo = PyMongo(app)

# SIGN UP
@app.route('/signup', methods = ['POST'])
def register():
    fullName = request.json['fullName']
    userName = request.json['userName']
    email = request.json['email']
    passwordHash = request.json['password']
    passwordHash = md5_hash(passwordHash)

    checkUsername = mongo.db.employees.find({'userName' : userName}).count()
    # print(checkUsername)

    if checkUsername == 0:
        mongo.db.employees.insert_one({'fullName' : fullName, 'userName' : userName, 'email' : email, 'passwordhash' : passwordHash, 'isworking' : 'false', 'past' : [], 'present' : []})
        return {"status": 'User created successfully'}
    else:
        return {"status" : 'Username already taken' } 

# LOGIN
@app.route('/login', methods = ['POST'])
def signin():
    loginUsername = request.json['loginUsername']
    loginPassword = request.json['loginPassword']
    check = md5_hash(loginPassword)

    checkUser = mongo.db.employees.find({"userName" : loginUsername, "passwordhash" : check}).count()
    getFullName = mongo.db.employees.find({"userName" : loginUsername, "passwordhash" : check})

    if checkUser == 0:
        return {"status" : 401}
    else:
        encode_data = jwt.encode({'username' : loginUsername}, 'naga' , algorithm='HS256').decode('utf-8')
        return {"status": str(encode_data)} 

# HASHING
def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    hash.hexdigest()
    return hash.hexdigest()

# EMPLOYEE DASHBOARD
@app.route('/employeedashboard')
def fetch_userdetails():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    getEmployeeDetail = mongo.db.employees.find({"userName" : decoded_data['username']})
    return dumps(getEmployeeDetail)

# GREET USER
@app.route('/greetuser')
def greetUser():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')

    x = datetime.datetime.now()
    time = int(x.strftime('%H'))
    foundUser = mongo.db.employees.find({'userName' : decoded_data['username']})

    if time < 12:
        greet = 'Good morning' + ' ' + foundUser[0]['fullName']
    elif time >= 12 and time <= 17:
        greet = 'Good Afternoon' + ' ' + foundUser[0]['fullName']
    elif time > 17:
        greet = 'Good evening' + ' ' + foundUser[0]['fullName']
    return greet

# CREATE COMPANY
@app.route('/createcompany', methods = ['POST'])
def createCompany():
    companyName = request.json['companyName']
    companyType = request.json['companyType']
    founded = request.json['founded']
    about = request.json['about']
    ceo = request.json['ceo']

    checkComapnyCount = mongo.db.company.find({"companyname" : companyName}).count()

    if checkComapnyCount != 0:
        return {"status" : "Company already exists"}
    else:
        mongo.db.company.insert({"companyname" : companyName, "companytype" : companyType , "about" : about, "founded" : founded, "ceo" : ceo, "pastemployees" : [], "presentemployees" : []})
        return {"status" : 200}

# GET ALL COMPANIES
@app.route('/getcompanies')
def getCompanies():
    data = mongo.db.company.find()
    return dumps(data)

# GET PARTICULAR COMPANY
@app.route('/getparticularcompany/<companyname>')
def getParticularCompany(companyname):
    data = mongo.db.company.find({'companyname' : companyname})
    return dumps(data)

# JOIN COMPANY
@app.route('/joincompany/<companyname>', methods=['PATCH'])
def joinCompany(companyname):
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')
    getEmployeeDetail = mongo.db.employees.find({'userName' : decoded_data['username']})

    x = datetime.datetime.now()
    month = str(x.strftime('%B'))
    year = int(x.strftime('%Y'))
    monthInNumber = int(x.strftime("%m")) 
    
    mongo.db.employees.update({'userName' : decoded_data['username']}, {'$push' :{'present' : {'companyname' : companyname, 'month' : month, 'year' : year, 'monthInNumber' : monthInNumber}}})
    mongo.db.company.update({'companyname' : companyname}, {'$push' : {'presentemployees' : getEmployeeDetail[0]['fullName'] }})
    mongo.db.employees.update({'userName' : decoded_data['username']}, {"$set": {'isworking' : 'true'}})    

    return {'status' : 200}

# LEAVE COMPANY
@app.route('/leavecompany/<companyname>', methods=['PATCH'])
def leaveCompany(companyname):
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decoded_data = jwt.decode(token_encoded, 'naga', algorithm='HS256')
    getEmployeeDetail = mongo.db.employees.find({'userName' : decoded_data['username']})

    x = datetime.datetime.now()
    leavingMonth = str(x.strftime('%B'))
    leavingYear = int(x.strftime('%Y'))
    leavingMonthInNumber = int(x.strftime("%m"))

    leavingCompanyName = getEmployeeDetail[0]['present'][0]['companyname']
    StartedMonth = getEmployeeDetail[0]['present'][0]['month']
    StartedYear = getEmployeeDetail[0]['present'][0]['year']
    StartedMonthInMonth = getEmployeeDetail[0]['present'][0]['monthInNumber']

    mongo.db.employees.update({'userName' : decoded_data['username']}, {'$push' :{'past' : {'pastCompanyName' : leavingCompanyName, 'StartedMonth' : StartedMonth, 'StartedYear' : StartedYear, 'StartedMonthInMonth' : StartedMonthInMonth, 'leavingMonth' : leavingMonth, 'leavingYear' : leavingYear, 'leavingMonthInNumber' : leavingMonthInNumber}}})  
    mongo.db.company.update({'companyname' : companyname}, {'$push' : {'pastemployees' : getEmployeeDetail[0]['fullName']}})
    mongo.db.employees.update({'userName' : decoded_data['username']}, {'$set' : {'isworking' : 'false'}})
    mongo.db.company.update({'companyname' : companyname}, {'$pull' : {'presentemployees' : getEmployeeDetail[0]['fullName']}})
    mongo.db.employees.update({'userName' : decoded_data['username']}, {'$pop' : {'present' : -1}})

    return {'status' : 200}