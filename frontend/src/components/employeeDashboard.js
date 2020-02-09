import React from 'react'

// Axios
import Axios from 'axios'

// react-router-dom
import { Link } from 'react-router-dom'

//components
import Showcompanies from './showCompanies'
import Currentcompany from './currentCompany'

let token = window.localStorage.getItem('Inkredostatus')

class Employeedashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greet : '',
            flag : false
        }
    }

    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:5000/greetuser`, {
            headers : {
                Authorization : "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                greet : res.data
            })
        })
        Axios.get(`http://127.0.0.1:5000/employeedashboard`, {
            headers : {
                Authorization : "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            console.log(res.data[0].isworking)
            if(res.data[0].isworking == 'false') {
                this.setState({
                    flag : false
                })
            }
            else {
                this.setState({
                    flag : true
                })
            }
        })
    }

    render() {
        const {greet, flag} = this.state
        return(
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-10'>
                        <h2>{greet}</h2>
                    </div>
                    <div className='col-2'>
                        <Link to='/history' type='button' className='btn btn-warning'>History</Link>
                    </div>

                </div>
                {flag ? <Currentcompany /> : <Showcompanies />}
            </div>
        )
    }
}

export default Employeedashboard