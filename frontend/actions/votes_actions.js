import * as voteAPIUtil from '../util/votes_api_util';

export const RECEIVE_VOTE = 'RECEIVE_VOTE';
export const REMOVE_VOTE = 'REMOVE_VOTE';

export const createVote = vote => dispatch => (
    voteAPIUtil.createVote(vote)
        .then(vote => dispatch(receiveVote(vote)))
)

export const deleteVote = vote => dispatch => (
    voteAPIUtil.deleteVote(vote)
        .then(vote => dispatch(removeVote(vote)))
)

const receiveVote = vote => ({
    type: RECEIVE_VOTE,
    vote
})

const removeVote = vote => ({
    type: REMOVE_VOTE,
    vote
})