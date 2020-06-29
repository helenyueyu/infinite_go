import React from 'react'; 

class CompanyForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "", 
            description: "", 
            company_size: "", 
            company_type: "", 
            date_founded: "", 
            industries: "" 
        }

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({
            industries: this.state.industries.split(', ')
        }, () => this.props.createCompany(this.state))
    }

    render() {
        const { name, description, company_size, company_type, date_founded, industries } = this.state; 
        return (
            <div className="company_form">
                <form onSubmit={this.handleSubmit}>
                    <div className="company_form-input">
                        Name
                        <input type="text" 
                            value={name}
                            onChange={(e) => this.handleChange(e, "name")}></input>
                    </div>

                    <div className="company_form-input">
                        Description  
                        <input type="text" 
                            value={description}
                            onChange={(e) => this.handleChange(e, "description")}></input>
                    </div>

                    <div className="company_form-input">
                        Company Size
                        <input type="text" 
                            value={company_size}
                            onChange={(e) => this.handleChange(e, "company_size")}></input>
                    </div>

                    <div className="company_form-input">
                        Company Type  
                        <input type="text" 
                            value={company_type}
                            onChange={(e) => this.handleChange(e, "company_type")}></input>
                    </div>

                    <div className="company_form-input">
                        Industries 
                        <input type="text" 
                            value={industries}
                            onChange={(e) => this.handleChange(e, "industries")}></input>
                    </div>


                    <div className="company_form-input">
                        Date Founded 
                        <input type="text" 
                            value={date_founded}
                            onChange={(e) => this.handleChange(e, "date_founded")}></input>
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default CompanyForm; 
