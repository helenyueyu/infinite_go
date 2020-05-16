import React from 'react'; 

class Vote extends React.Component {
    render() {
        return (
            <div className="vote">
                <div onClick={() => this.props.createVote({
                    value: 1, 
                    user_id: this.props.user_id, 
                    voteable_id: this.props.voteable_id, 
                    voteable_type: this.props.voteable_type 
                })}>
                    +
                </div>
                <div>
                    -
                </div>
            </div>
        )
    }
}

export default Vote; 
