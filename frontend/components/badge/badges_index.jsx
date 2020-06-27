import React from 'react'; 

import BadgesIndexItem from './badges_index_item'; 
import BadgesForm from './/badges_form'; 

class BadgesIndex extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            badges: Object.values(this.props.badges) 
        }
        this.handleDelete = this.handleDelete.bind(this); 
    }
    componentDidMount() {
        this.props.fetchBadges(); 
    }

    componentDidUpdate(prevProps) {
        const prevBadgeLength = Object.values(prevProps.badges).length; 
        const currBadgeLength = Object.values(this.props.badges).length; 
        if (prevBadgeLength !== currBadgeLength) {
            this.setState({
                badges: Object.values(this.props.badges)
            })
        }
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
        const badgeGroups = this.groupBadges(Object.values(this.state.badges)); 
        return (
            <div className="badges_index">
                <h1 className="badges_index-title">Badges</h1>
                <div className="badges_index-main">
                    <div className="badges_index-left">
                        <div className="badges_index-description">
                            Besides gaining reputation with your questions and answers, you receive badges for being especially helpful. Badges appear on your profile page, flair, and your posts.
                        </div>
                        <div className="badges_medals">
                            {['all', 'gold', 'silver', 'bronze'].map((medal, idx) => 
                                <button key={idx} 
                                    className={idx === 0 ? "badges_medal start" : idx === 3 ? "badges_medal end" : "badges_medal"}
                                    onClick={() => this.filterBadges(medal === 'all' ? '' : medal)}>
                                    {medal[0].toUpperCase() + medal.slice(1)}
                                </button>
                            )}
                        </div>
                        {Object.keys(badgeGroups).map((group, idx) => 
                            <div key={idx}>
                                <h1 className="badges_index-group">
                                    {group[0].toUpperCase() + group.slice(1)} Badges
                                </h1>
                                <div>
                                    {Object.values(badgeGroups[group]).map((badge, idx) => {
                                        const { name, description, medalType, id } = badge;
                                        return <BadgesIndexItem key={idx}
                                                        name={name}
                                                        description={description}
                                                        medalType={medalType}
                                                        id={id} 
                                                        handleDelete={this.handleDelete} />
                                    })}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
    
                <BadgesForm createBadge={this.props.createBadge} />
            </div>
        )
    }
}

export default BadgesIndex; 
