import React from 'react'; 

class NewQuestion extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            user_id: this.props.authorId, 
            title: "", 
            body: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e, field) {
        e.preventDefault(); 
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createQuestion(this.state)
            .then(() => this.props.history.push(`/questions`));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                {["title", "body"].map(type =>
                    <label key={type}>{type}
                        <input
                            onChange={(e) => this.handleChange(e, type)}
                            value={this.state[type]} />
                    </label>
                )}

                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default NewQuestion; 
