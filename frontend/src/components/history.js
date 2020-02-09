import React from 'react'

// Axios
import Axios from 'axios'

// react-router-dom
import { Link } from 'react-router-dom'

let token = window.localStorage.getItem('Inkredostatus')

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pastCompanyDetails : [],
            flag : false
        }
    }

    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:5000/employeedashboard`, {
            headers : {
                Authorization : "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            console.log(res.data[0].past)
            if(res.data[0].past == 'undefined') {
                this.setState({
                    flag :false
                })
            }
            else {
                this.setState({
                    flag : true,
                    pastCompanyDetails : res.data[0].past
                })
            }
        })
    }

    render() {
        const {flag, pastCompanyDetails} = this.state
        return(
            <div className='container mt-5'>
                {flag? 
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Past Company</th>
                                    <th scope="col">Started Month</th>
                                    <th scope="col">Started Year</th>
                                    <th scope="col">Leaving Month</th>
                                    <th scope="col">Leaving Year</th>
                                    <th scope="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastCompanyDetails.map(e => {
                                    return (
                                        <tr>
                                            <th scope="row">{e.pastCompanyName}</th>
                                            <td>{e.StartedMonth}</td>
                                            <td>{e.StartedYear}</td>
                                            <td>{e.leavingMonth}</td>
                                            <td>{e.leavingYear}</td>
                                            <td>{`${e.leavingYear-e.StartedYear} Years ${e.StartedMonthInMonth-e.leavingMonthInNumber} Month`}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> : 
                    <div>
                        <h2>No data to show</h2>
                    </div> }
                    <Link to='/employeedashboard'>Go to Dashboard</Link>
            </div>
        )
    }
}

export default History