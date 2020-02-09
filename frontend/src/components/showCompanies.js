import React from 'react'

// react-router-dom
import { Redirect } from 'react-router-dom'

// Axios
import Axios from 'axios'

let token = window.localStorage.getItem('Inkredostatus')

class Showcompanies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName : '',
            companies : [],
            status : false
        }
    }

    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:5000/getcompanies`)
            .then(res => {
                console.log(res)
                this.setState({
                    companies: res.data
                })
            })
    }

    handleClick = (companyname) => {
        // companyname.preventDefault()
        Axios.patch(`http://127.0.0.1:5000/joincompany/${companyname}`,{
            companyName : companyname
        }, {
            headers : {
                Authorization : "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(setTimeout(() => {
            alert('You have joined new company')
            this.setState({
                status : true
            })
        }, 1500))
        
    }

    render() {
        const {companies, status} = this.state
        return (
            <div className='container mt-5'>
                <h4>You are not joined any companies</h4>
                {companies.map(e => {
                    return (
                        <div key={e._id.$oid} className='mt-3'>
                            <div className="card">
                                <div className='row'>
                                    <div className="card-body col-8">
                                        <h5 className="card-title">Company Name: {e.companyname}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Company Type: {e.companytype}</h6>
                                        <p className="card-text">About: {e.about}</p>
                                    </div>
                                    <div className='col-4 mt-5'>
                                        <button onClick={() => {this.handleClick(e.companyname)}} type='button' className='btn btn-dark'>Join</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {status? <Redirect to='/currentcompany' />: null}
            </div>
        )
    }
}

export default Showcompanies