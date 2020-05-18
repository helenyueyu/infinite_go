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
            <div className="session_form">
                <h1>{type}</h1>
                <form onSubmit={this.handleSubmit}>
                    {["username", "email", "password"].map(type => 
                        <label key={type}>{type}
                            <input 
                                onChange={(e) => this.handleChange(e, type)} 
                                value={this.state[type]} />
                        </label>
                    )}
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default SessionForm;


