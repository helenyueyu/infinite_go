import React from 'react';

import moment from 'moment'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 

import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

class AnswerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id, 
            body: this.props.body, 
            questionId: this.props.questionId, 
            accepted: this.props.accepted 
        }

        this.handleAccept = this.handleAccept.bind(this); 
    }

    /* 
    :body, :question_id, :user_id
    */

    handleAccept() {
        this.setState({
            accepted: true 
        }, () => this.props.handleUpdate(this.state)); 
    }

    render() {
        let { id, questionId, body, username, createdAt, authorized, handleDelete, accepted } = this.props;
        console.log(this.props); 
        return (
            <div>
                {body}

                <div className="answer_item-footer">
                    <div className="answer_item-button-console">
                        <button onClick={this.handleAccept}>Accept</button>
                        <DeleteButton authorized={authorized} id={id} handleDelete={() => handleDelete(id)} />
                        <EditButton authorized={authorized} link={`/questions/${questionId}/answers/${id}/edit`} />
                    </div>
                    <ProfileSnippet username={username} timestamp={moment(createdAt).fromNow()} />
                </div>
            </div>
        )
    }
}

export default AnswerItem; 
