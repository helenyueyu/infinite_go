import * as commentAPIUtil from '../util/comments_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

export const createComment = comment => dispatch => (
    commentAPIUtil.createComment(comment)
        .then(comment => dispatch(receiveComment(comment)))
)

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})