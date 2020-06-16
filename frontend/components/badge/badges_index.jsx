import React from 'react'; 

class BadgesIndex extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            description: "",
            category: "",
            medal_type: ""
        }
    }
    componentDidMount() {
        this.props.fetchBadges(); 
    }

    handleChange(e, field) {
        e.preventDefault(); 
        this.setState({
            [field]: e.target.value 
        })
    }
    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createBadge(this.state); 
    }

    render() {
        console.log('badges', this.props.badges); 
        return (
            <div>
                badges

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                        Name 
                        <input onChange={(e) => this.handleChange(e, 'name')} />
                    </label>
                    <br />
                    <label>
                        Description 
                        <input onChange={(e) => this.handleChange(e, 'description')} />
                    </label>
                    <br />
                    <label>
                        Medal Type 
                        <input onChange={(e) => this.handleChange(e, 'medal_type')} />
                    </label>
                    <br />
                    <label>
                        Category
                        <input onChange={(e) => this.handleChange(e, 'category')} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>

                </form>
            </div>
        )
    }
}

export default BadgesIndex; 
