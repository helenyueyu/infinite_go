import * as badgeAPIUtil from '../util/badges_api_util';

export const RECEIVE_BADGES = 'RECEIVE_BADGES';
export const RECEIVE_BADGE = 'RECEIVE_BADGE'; 

const receiveBadges = badges => ({
    type: RECEIVE_BADGES,
    badges
})

const receiveBadge = badge => ({
    type: RECEIVE_BADGE, 
    badge 
})

export const fetchBadges = () => dispatch => {
    return badgeAPIUtil.fetchBadges()
        .then(badges => {
            dispatch(receiveBadges(badges));
        })
}

export const createBadge = badge => dispatch => {
    return badgeAPIUtil.createTag(badge)
            .then(badge => {
                // debugger; 
                dispatch(receiveBadge(badge))
            })
}