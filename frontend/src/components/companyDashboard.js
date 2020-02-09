import React from 'react'

// Axios
import Axios from 'axios'

class Companydashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetails: [],
            pastEmployees : [],
            presentEmployees : []
        }
    }

    componentDidMount = () => {
        let matchCompany = this.props.match.params.id
        Axios.get(`http://127.0.0.1:5000/getparticularcompany/${matchCompany}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    companyDetails: res.data,
                    pastEmployees : res.data[0].pastemployees,
                    presentEmployees : res.data[0].presentemployees
                })
            })

    }

    render() {
        const { companyDetails, pastEmployees, presentEmployees } = this.state
        return (
            <div className='container mt-5'>
                {companyDetails.map(e => {
                    return (
                        <div key={e._id.$oid}>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h2 className="card-title">{e.companyname}</h2>
                                    <h6 className="card-subtitle mb-2 text-muted">Type: {e.companytype}</h6>
                                    <p className="card-text">About us: {e.about}</p>
                                    <h4>CEO : {e.ceo}</h4>
                                    <h5>Founded : {e.founded}</h5>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='row mt-5'>
                    <div className='col-6'>
                        <h4>Past Employees</h4>
                        <hr></hr>
                        {pastEmployees.map((e,index) => {
                            return (
                                <th scope="row" key={index}>{e} ,</th>
                            )
                        })}
                    </div>
                    <div className='col-6'>
                        <h4>Present Employees</h4>
                        <hr></hr>
                        {presentEmployees.map(e => {
                            return (
                                <th scope="row">{e}</th>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Companydashboard