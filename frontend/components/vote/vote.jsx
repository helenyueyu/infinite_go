import React from 'react'; 
import { withRouter } from 'react-router-dom'; 

class Vote extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            user_id: this.props.user_id, 
            voteable_id: this.props.voteable_id, 
            voteable_type: this.props.voteable_type
        }
        this.upVote = this.upVote.bind(this); 
        this.downVote = this.downVote.bind(this); 
    }

    upVote() {
        let newState = Object.assign({}, this.state, {value: 1})
        this.props.createVote(newState).then(() => this.props.action(this.props.match.params.questionId))
    }

    downVote() {
        let newState = Object.assign({}, this.state, {value: -1})
        this.props.createVote(newState).then(() => this.props.action(this.props.match.params.questionId))
    }

    render() {
        const { currentVote, count, type } = this.props; 
        console.log('type and vote count', type, count); 
        return (
            <>
            {type === "comment" ? 
                <div className="comment-vote">
                    
                    <div className="comment-vote-symbols">
                        <div className="comment-vote-symbol up" onClick={this.upVote}>
                            <i className={currentVote === 1 ? "fas fa-sort-up active" : "fas fa-sort-up"}></i>
                        </div>
                        <div className="comment-vote-symbol down" onClick={this.downVote}>
                            <i className={currentVote === 1 ? "fas fa-sort-down active" : "fas fa-sort-down"}></i>
                        </div>
                    </div>
                    <div className={(currentVote === 1 || currentVote === -1) ? 
                        "comment vote-count active" : " comment vote-count"}>
                        {count}
                    </div>
                    
                </div> 
                : 
                <div className="vote">
                    <div className="vote-symbol" onClick={this.upVote}>
                        <i className={currentVote === 1 ? "fas fa-sort-up active" : "fas fa-sort-up"}></i>
                    </div>
                    <div className={(currentVote === 1 || currentVote === -1) ? "vote-count active" : "vote-count"}>
                        {count}
                    </div>
                    <div className="vote-symbol" onClick={this.downVote}>
                        <i className={currentVote === -1 ? "fas fa-sort-down active" : "fas fa-sort-down"}></i>
                    </div>
                </div>}
            </>
        );
    }
}

export default withRouter(Vote); 
