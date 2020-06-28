import React from 'react'; 

class EditProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            id: this.props.match.params.userId, 
            description: "", 
            location: "", 
            photoFile: null 
        }

        this.onChange = this.onChange.bind(this); 
        this.handleFile = this.handleFile.bind(this); 
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

    handleFile(e) {
        this.setState({
            photoFile: e.currentTarget.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        const formData = new FormData(); 
        formData.append('user[description]', this.state.description); 
        formData.append('user[location]', this.state.location); 
        formData.append('user[profile_photo]', this.state.photoFile); 

        $.ajax({
            url: `/api/users/${this.state.id}`, 
            method: 'PATCH', 
            data: formData, 
            contentType: false, 
            processData: false 
        }).then(() => this.props.history.push(`/users/${this.state.id}`)); 
    }

    render() {
        console.log('state', this.state); 

        const { description, location } = this.state; 
        return (
            <div className="edit_profile">
                Edit User Profile 
                <form className="edit_profile-form"
                    onSubmit={this.handleSubmit}>
                    <input type="text" 
                        value={description} 
                        onChange={(e) => this.onChange(e, 'description')} />

                    <input type="text" 
                        value={location}
                        onChange={(e) => this.onChange(e, 'location')} />

                    <input type="file" 
                        onChange={this.handleFile} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditProfile; 
