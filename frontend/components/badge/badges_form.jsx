import React from 'react'; 

class BadgesForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            description: "",
            category: "",
            medal_type: ""
        }
    }

    handleChange(e, field) {
        e.preventDefault(); 
        this.setState({
            [field]: e.target.value 
        })
    }
    
    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createBadge(this.state)
            .then(() => this.setState({
                name: "",
                description: "",
                category: "",
                medal_type: ""
            }))
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    Name 
                    <input value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
                </label>
                <br />
                <label>
                    Description 
                    <input value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
                </label>
                <br />
                <label>
                    Medal Type 
                    <input value={this.state.medal_type} onChange={(e) => this.handleChange(e, 'medal_type')} />
                </label>
                <br />
                <label>
                    Category
                    <input value={this.state.category} onChange={(e) => this.handleChange(e, 'category')} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        )
    }
}; 

export default BadgesForm; 
