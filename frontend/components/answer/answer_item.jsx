import React from 'react';

import ProfileSnippet from '../user/profile/profile_snippet'; 
import { displayShortenedDate } from '../../selectors/date_selectors'; 

import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 
import AcceptButton from '../buttons/accept_button'; 

import { Editor, EditorState, convertFromRaw } from 'draft-js'; 

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
        this.handleUnaccept = this.handleUnaccept.bind(this); 
    }

    handleAccept(e) {
        e.preventDefault(); 
        this.setState({
            accepted: true 
        }, () => this.props.handleUpdate(this.state)); 
    }

    handleUnaccept(e) {
        e.preventDefault(); 
        this.setState({
            accepted: false 
        }, () => this.props.handleUpdate(this.state)); 
    }

    render() {
        // debugger; 
        let { id, questionId, body, username, createdAt, authorized, handleDelete, canAccept, reputation, medals, user } = this.props;
        const answerId = id; 
        const currentContent = EditorState.createWithContent(
            convertFromRaw(JSON.parse(body))
        );
        return (
            <div className="answer_item">
                <div>
                    <AcceptButton canAccept={canAccept} action={this.handleAccept} type="accept" />
                    <AcceptButton canAccept={canAccept} action={this.handleUnaccept} type="unaccept" />
                </div>
                
                <div>
                    <Editor editorState={currentContent} readOnly={true} />
                </div>

                <div className="answer_item-footer">
                    <div className="answer_item-button-console">
                        <DeleteButton authorized={authorized} id={id} handleDelete={() => handleDelete(id)} />
                        <EditButton authorized={authorized} link={`/questions/${questionId}/answers/${answerId}/edit`} />
                    </div>
                    <ProfileSnippet id={user.id}
                                username={username} 
                                type="answered"
                                medals={medals}
                                reputation={reputation}
                                timestamp={displayShortenedDate(createdAt)} />
                </div>
            </div>
        )
    }
}

export default AnswerItem; 
