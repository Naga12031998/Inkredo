import React from 'react'

// Axios
import Axios from 'axios'

// react-router-dom
import { Link, Redirect } from 'react-router-dom'

let token = window.localStorage.getItem('Inkredostatus')

class Currentcompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName : '',
            presentCompany : [],
            flag : false
        }
    }

    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:5000/employeedashboard`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(res => {
            console.log(res.data[0].present)
            this.setState({ 
                presentCompany : res.data[0].present
            })
        })
    }

    handleClick = (companyname) => {
        Axios.patch(`http://127.0.0.1:5000/leavecompany/${companyname}`, {
            companyName : companyname
        }, {
            headers : {
                Authorization : "Bearer " + token,
                "Content-type": "application/json"
            }
        })
        .then(setTimeout(() => {
            this.setState({
                flag : true
            })
        }, 2000))
    }

    render() {
        const {presentCompany, flag} = this.state
        return (
            <div className='mt-5 container'>
                <h5><i>Present Company</i></h5>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Joined on</th>
                            <th scope="col">Joined Year</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                            {/* <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td> */}
                            {presentCompany.map((e,index) => {
                                return (
                                   <tr key={index}>
                                        <td>{e.companyname}</td>
                                        <td>{e.month}</td>
                                        <td>{e.year}</td>
                                        <td><button onClick = {() => {this.handleClick(e.companyname)}} type='button' className='btn btn-danger'>Leave</button></td>
                                   </tr>
                                )
                            })}
                    </tbody>
                </table>
                <Link to='/employeedashboard'>Dashboard</Link>
                {flag? <Redirect to='/history' />: null}
            </div>
        )
    }
}

export default Currentcompany