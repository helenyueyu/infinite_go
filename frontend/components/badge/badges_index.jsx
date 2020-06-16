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
        const { badges } = this.props; 
        // console.log('badges', this.props.badges); 
        return (
            <div className="badges_index">
                <h1 className="badges_index-title">Badges</h1>
                <div className="badges_index-description">
                    Besides gaining reputation with your questions and answers, you receive badges for being especially helpful. Badges appear on your profile page, flair, and your posts.
                </div>
                {Object.values(badges).map((badge, idx) => {
                    const { name, description, category, medalType } = badge; 
                    return (
                        <div className="badges_index-item" key={idx}>
                            <div className="badges_index-item-name">
                                <span className="badges_index-gold"> &#x25cf;</span> {name}
                            </div>
                            <div>{description}</div>
                            <div>{category}</div>
                            <div>{medalType}</div>
                        </div>
                    )
                }
                    
                )}

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
