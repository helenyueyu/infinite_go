import React from 'react'; 

class BadgesIndex extends React.Component {
    componentDidMount() {
        this.props.fetchBadges(); 
        this.state = {
            name: "", 
            description: "", 
            category: "", 
            medalType: "" 
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
        this.createBadge(this.state); 
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
                    
                    <label>
                        Description 
                        <input onChange={(e) => this.handleChange(e, 'description')} />
                    </label>

                    <label>
                        Medal Type 
                        <input onChange={(e) => this.handleChange(e, 'medalType')} />
                    </label>

                    <label>
                        Category
                        <input onChange={(e) => this.handleChange(e, 'category')} />
                    </label>
                    
                </form>
            </div>
        )
    }
}

export default BadgesIndex; 
