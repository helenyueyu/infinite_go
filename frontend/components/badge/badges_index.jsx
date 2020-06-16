import React from 'react'; 

class BadgesIndex extends React.Component {
    componentDidMount() {
        this.props.fetchBadges(); 
    }
    render() {
        console.log('badges', this.props.badges); 
        return (
            <div>
                badges
            </div>
        )
    }
}

export default BadgesIndex; 
