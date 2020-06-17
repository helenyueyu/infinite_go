import React from 'react'; 

class BadgesIndex extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: "",
            description: "",
            category: "",
            medal_type: "", 
            badges: []  
        }
    }
    componentDidMount() {
        this.props.fetchBadges()
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.badges); 
        console.log(this.props.badges); 
        if (Object.values(prevProps.badges).length !== Object.values(this.props.badges).length) {
            this.setState({
                badges: Object.values(this.props.badges)
            })
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
    handleDelete(e, id) {
        e.preventDefault(); 
        this.props.deleteBadge(id)
            .then(() => this.props.fetchBadges())
    }

    groupBadges(badges) {
        const h = {}; 
        for (let i = 0;i < badges.length; i++) {
            let category = badges[i].category; 
            if (h[category] === undefined) {
                h[category] = [badges[i]]; 
            } else {
                h[category].push(badges[i]); 
            }
        }
        return h; 
    }

    filterBadges(type) {
        this.setState({
            badges: type === "" ? Object.values(this.props.badges) : Object.values(this.props.badges).filter(badge => badge.medalType === type)
        })
    }

    render() {
        // const { badges } = this.props; 
        // console.log('state', this.state)
        const badgeGroups = this.groupBadges(Object.values(this.state.badges)); 
        if (Object.keys(badgeGroups).length === 0) return null;  
        return (
            <div className="badges_index">
                <h1 className="badges_index-title">Badges</h1>
                <div className="badges_index-main">
                    <div className="badges_index-left">
                        <div className="badges_index-description">
                            Besides gaining reputation with your questions and answers, you receive badges for being especially helpful. Badges appear on your profile page, flair, and your posts.
                        </div>
                        <div>
                            <button onClick={() => this.filterBadges('')}>All</button>
                            <button onClick={() => this.filterBadges('gold')}>Gold</button>
                            <button onClick={() => this.filterBadges('silver')}>Silver</button>
                            <button onClick={() => this.filterBadges('bronze')}>Bronze</button>
                        </div>
                        {Object.keys(badgeGroups).map((group, idx) => 
                            <div key={idx}>
                                <h1 className="badges_index-group">
                                    {group[0].toUpperCase() + group.slice(1)} Badges
                                </h1>
                                <div>
                                    {Object.values(badgeGroups[group]).map((badge, idx) => {
                                        const { name, description, medalType, id } = badge;
                                        return (
                                            <div className="badges_index-item" key={idx}>
                                                <div className="badges_index-item-name-container">
                                                    <div className="badges_index-item-name">
                                                        <div className={medalType === "gold"
                                                            ? "badges_index-gold-coin" :
                                                            medalType === "silver"
                                                                ? "badges_index-silver-coin" : "badges_index-bronze-coin"}>
                                                            &#x25cf;
                                            </div>
                                                        <div className="badges_index-item-name-name">
                                                            {name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="badges_index-item-description">{description}</div>
                                                <div className="badges_index-item-awarded">0 awarded
                                        <button className="badges_index-item-delete" onClick={(e) => this.handleDelete(e, id)}>X</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        
                    </div>
                    <div className="badges_index-right">
                        <div className="badges_index-bronze">
                            <div className="badges_index-item-name"> 
                                <div className="badges_index-bronze-coin">
                                    &#x25cf;
                                </div>
                                <div className="badges_index-item-name-name">
                                    Bronze Badge
                                </div>
                            </div>
                            <div className="badges_index-item-description-sidebar">
                                Bronze badges encourage users to try out new features on the site. They are easy to get if you try!
                            </div>
                        </div>

                        <div className="badges_index-silver">
                            <div className="badges_index-item-name">
                                <div className="badges_index-silver-coin">
                                    &#x25cf;
                                </div> 
                                <div className="badges_index-item-name-name">
                                    Silver Badge
                                </div>
                            </div>
                            <div className="badges_index-item-description-sidebar">
                                Silver badges are less common than bronze ones. You'll need to plan your strategy to get one of these.
                            </div>
                        </div>

                        <div className="badges_index-gold">
                            <div className="badges_index-item-name">
                                <div className="badges_index-gold-coin">
                                    &#x25cf;
                                </div>
                                <div className="badges_index-item-name-name">
                                    Gold Badge
                                </div>
                            </div>
                            <div className="badges_index-item-description-sidebar">
                                Gold badges recognize important contributions from members of the community. They are rarely awarded.
                            </div>
                        </div>
                    </div>
                </div>
                

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
            </div>
        )
    }
}

export default BadgesIndex; 
