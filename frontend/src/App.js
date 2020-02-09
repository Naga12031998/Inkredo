import React from 'react'

// React-router-dom
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Components
import Navbar from './components/navBar'
import LandingPage from './components/landingPage';
import Authentication from './components/authentication';
import Companydashboard from './components/companyDashboard'
import Createcompany from './components/createCompany';
import Employeedashboard from './components/employeeDashboard';
import Currentcompany from './components/currentCompany';
import History from './components/history'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <Route path='/' exact component={LandingPage} />
                    <Route path='/authentication' component = {Authentication} />
                    <Route path='/createcompany' component = {Createcompany} />
                    <Route path='/employeedashboard' component = {Employeedashboard} />
                    <Route path='/currentcompany' component = {Currentcompany} />
                    <Route path='/history' component = {History} />
                    <Route path='/about/:id' render={(props) => <Companydashboard {...props}/>} />
                </Router>
            </div>
        )
    }
}

export default App