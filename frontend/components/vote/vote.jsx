import React from 'react'; 

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
        this.props.createVote(newState).then(() => this.props.action(this.props.info))
    }

    downVote() {
        let newState = Object.assign({}, this.state, {value: -1})
        this.props.createVote(newState).then(() => this.props.action(this.props.info))
    }

    render() {
        return (
            <div className="vote">
                <div onClick={this.upVote}>
                    +
                </div>
                <div>
                    {this.props.count}
                </div>
                <div onClick={this.downVote}>
                    -
                </div>
            </div>
        )
    }
}

export default Vote; 
