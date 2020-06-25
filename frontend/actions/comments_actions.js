import * as commentAPIUtil from '../util/comments_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'; 
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT'; 

export const createComment = comment => dispatch => (
    commentAPIUtil.createComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const updateComment = comment => dispatch => (
    commentAPIUtil.updateComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

export const deleteComment = id => dispatch => (
    commentAPIUtil.deleteComment(id)
        .then(comment => dispatch(removeComment(comment)))
)

export const fetchComments = questionId => dispatch => {
    return commentAPIUtil.getComments(questionId)
        .then(comments => {
            // debugger; 
            dispatch(receiveComments(comments))
        });
}

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS, 
    comments 
})

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = comment => ({
    type: REMOVE_COMMENT, 
    comment 
})