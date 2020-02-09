import React from 'react'

// React-router-dom
import { Link, Redirect } from 'react-router-dom'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            status : false,
            flag : false
        }
    }

    handleLoginClick = (e) => {
        e.preventDefault()
        this.setState ({
            status : true
        })
    }

    handleLogoutClick = (e) => {
        e.preventDefault()
        this.setState({
            flag : true,
            status : false
        })
        window.localStorage.removeItem('Inkredostatus');
    }

    render() {
        const {status, flag} = this.state
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/' className="navbar-brand">Companies</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/createcompany' className="nav-link">Create_Your_Own_Company</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                           {status?  <Link onClick={this.handleLogoutClick} type='button' className='btn btn-danger'>Logout</Link> : <Link onClick={this.handleLoginClick} type='button' className='btn btn-primary'>Login</Link> }
                        </form>
                    </div>
                </nav>
                {status? <Redirect to='/authentication' />: null}
                {flag? <Redirect to='/authentication' />: null}
            </div>
        )
    }
}

export default Navbar