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
                <div className="badges_index-main">
                    <div className="badges_index-left">
                        <div className="badges_index-description">
                            Besides gaining reputation with your questions and answers, you receive badges for being especially helpful. Badges appear on your profile page, flair, and your posts.
                        </div>
                        {Object.values(badges).map((badge, idx) => {
                            const { name, description, medalType } = badge;
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
                                    <div className="badges_index-item-awarded">0 awarded</div>
                                </div>
                            )
                        })}
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
                            <div className="badges_index-item-description">
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
                            <div className="badges_index-item-description">
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
                            <div className="badges_index-item-description">
                                Gold badges recognize important contributions from members of the community. They are rarely awarded.
                            </div>
                        </div>
                    </div>
                </div>
                

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
