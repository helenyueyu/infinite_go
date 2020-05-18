import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
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
        this.props.action(this.state)
            .then(() => this.props.history.push(`/questions`));
    }

    render() {
        let {type} = this.props; 
        return (
            <div className="session_form-container">
                <div className="session_form">
                    <h1 className="session_form-title">{type}</h1>
                    <form className="session_form-form" onSubmit={this.handleSubmit}>
                        {["username", "email", "password"].map(type => 
                            <label className="session_form-label" key={type}>{type}
                                <input className="session_form-input"
                                    onChange={(e) => this.handleChange(e, type)} 
                                    value={this.state[type]} />
                            </label>
                        )}
                        
                        <button className="session_form-submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SessionForm;


