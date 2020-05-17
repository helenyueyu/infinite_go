import * as voteAPIUtil from '../util/votes_api_util';

export const RECEIVE_VOTE = 'RECEIVE_VOTE';

export const createVote = vote => dispatch => (
    voteAPIUtil.createVote(vote)
        .then(vote => dispatch(receiveVote(vote)))
)

const receiveVote = vote => ({
    type: RECEIVE_VOTE,
    vote
})

