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
        return (
          <div className="vote">
            <div className="vote-symbol" onClick={this.upVote}>
              <i className="fas fa-sort-up"></i>
            </div>
            <div className="vote-count">{this.props.count}</div>
            <div className="vote-symbol" onClick={this.downVote}>
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
        );
    }
}

export default withRouter(Vote); 
