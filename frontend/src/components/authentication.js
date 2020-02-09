import React from 'react'

// Axios
import Axios from 'axios';

class Landingpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName : '',
            userName : '',
            email : '',
            password : '',
            loginUsername : '',
            loginPassword : ''
        }
    }

    handleSignupChange = (e) => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    handleLoginChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    signUp = (e) => {
        e.preventDefault()
        if (this.state.userName === '' || this.state.email === '' || this.state.password === '' || this.state.fullName === '') {
            alert(`Fill up the required field`)
        } else {
            Axios.post(`http://127.0.0.1:5000/signup`, {
                fullName : this.state.fullName,
                userName : this.state.userName,
                email : this.state.email,
                password : this.state.password
            })
            .then(res => {
                console.log(res)
                alert(`${res.data.status}`)
            })
            this.setState({
                fullName : '',
                userName : '',
                email : '',
                password : ''
            })
        }
    }

    logIn = (e) => {
        e.preventDefault()
        Axios.post(`http://naga.com:5000/login`, {
            loginUsername : this.state.loginUsername,
            loginPassword : this.state.loginPassword
        })
        .then(res => {
            console.log(res.data)
            if(res.data.status === 401) {
                alert(`Invalid credentials`)
            }
            else {
                window.localStorage.setItem('Inkredostatus', res.data.status)
                alert('Success')
                this.props.history.push('/employeedashboard')
            }
        })
        this.setState({
            loginPassword : '', 
            loginUsername : ''
        })
    }

    render() {
        const {fullName, userName, email, password, loginPassword, loginUsername} = this.state
        return(
            <div className="card container shadow" style={{marginTop : 80}}>
                <div className="card-body row">
                    <div className='col-6'>
                        <h2>Sign up</h2>
                        <div className='mt-3'>
                            <div className="form-group">
                                <label htmlFor="exampleInputFullname">Full name</label>
                                <input name='fullName' value={fullName} onChange={this.handleSignupChange} type="text" className="form-control" id="exampleInputFullName1" placeholder="Enter full name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1">User name</label>
                                <input name='userName' value={userName} onChange={this.handleSignupChange} type="text" className="form-control" id="exampleInputuserName1" placeholder="Enter user name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input name='email' value={email} onChange={this.handleSignupChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input name='password' value={password} onChange={this.handleSignupChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick = {this.signUp}>Sign up</button>
                        </div>
                    </div>
                    <div className='col-6'>
                        <h2>Log in</h2>
                        <div className='mt-3'>
                            <div className="form-group">
                                <label htmlFor='exampleInputUsername2'>User name</label>
                                <input name='loginUsername' value={loginUsername} onChange={this.handleLoginChange} type="username" className="form-control" id="exampleInputusername2" aria-describedby="emailHelp" placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">Password</label>
                                <input name='loginPassword' value={loginPassword} onChange={this.handleLoginChange} type="password" className="form-control" id="exampleInputPassword2" placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.logIn}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landingpage