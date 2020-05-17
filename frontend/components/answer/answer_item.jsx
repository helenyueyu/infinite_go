import React from 'react';

import moment from 'moment'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 

import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

class AnswerItem extends React.Component {
    render() {
        let { id, questionId, body, username, createdAt, authorized, handleDelete } = this.props;
        return (
            <div>
                {body}

                <div className="answer_item-footer">
                    <div className="answer_item-button-console">
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
