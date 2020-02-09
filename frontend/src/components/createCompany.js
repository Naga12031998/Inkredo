import React from 'react'

// Axios
import Axios from 'axios'

class Createcompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName : '',
            companyType : '',
            founded : '',
            ceo : '',
            about : '',
            flag : false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        Axios.post(`http://127.0.0.1:5000/createcompany`, {
            companyName : this.state.companyName,
            companyType : this.state.companyType,
            founded : this.state.founded,
            ceo : this.state.ceo,
            about : this.state.about
        })
        .then(setTimeout(() => {
            this.props.history.push('/')
        },1000))
    }

    render() {
        const {companyName, companyType, founded, ceo, about} = this.state
        return (
            <div className='container mt-5'>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputCompanyName">Company Name</label>
                        <input name='companyName' value={companyName} onChange={this.handleChange} type="text" className="form-control" id="exampleInputCompanyName" placeholder='enter your company name' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputCompanyType">Company Type</label>
                        <input name='companyType' value={companyType} onChange={this.handleChange} type="text" className="form-control" id="exampleInputCompanyType" placeholder='enter your company type'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFounded">Founded</label>
                        <input name='founded' value={founded} onChange={this.handleChange} type="number" className="form-control" id="exampleInputFounded" placeholder='enter the founded year ' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputCeo">CEO</label>
                        <input name='ceo' value={ceo} onChange={this.handleChange} type="text" className="form-control" id="exampleInputCEO" placeholder='enter name of the CEO' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAbout">About</label>
                        <textarea name='about' value={about} onChange={this.handleChange} type="text" className="form-control" id="exampleInputAbout" style={{height : 150}} placeholder='write something about your company'/>
                    </div>
                    <button onClick={this.handleClick} className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Createcompany