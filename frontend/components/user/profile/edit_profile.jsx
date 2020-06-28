import React from 'react'; 

class EditProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            id: this.props.match.params.userId, 
            description: "", 
            location: "" 
        }

        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
            .then(() => {
                const { description, location } = this.props.users[this.props.match.params.userId]; 
                this.setState({
                    description, 
                    location 
                })
            })
    }

    onChange(e, field) {
        e.preventDefault(); 
        this.setState({
            [field]: e.target.value 
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.updateUser(this.state); 
    }

    render() {
        const { description, location } = this.state; 
        return (
            <div>
                Edit User Profile 
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        value={description} 
                        onChange={(e) => this.onChange(e, 'description')}></input>

                    <input type="text" 
                        value={location}
                        onChange={(e) => this.onChange(e, 'location')}></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditProfile; 
