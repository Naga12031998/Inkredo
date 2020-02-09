import React from 'react'

// React-router-dom
import { Link } from 'react-router-dom'

// Axios
import Axios from 'axios'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
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

    render() {
        const { companies } = this.state
        return (
            <div>
                <div className='container mt-5'>
                    {companies.map(e => {
                        return (
                            <div key={e._id.$oid} className='mt-3'>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Company Name: {e.companyname}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Company Type: {e.companytype}</h6>
                                        <p className="card-text">About: {e.about}</p>
                                        <Link to={`/about/${e.companyname}`} className="card-link">More</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default LandingPage