import * as badgeAPIUtil from '../util/badges_api_util';

export const RECEIVE_BADGES = 'RECEIVE_BADGES';
export const RECEIVE_BADGE = 'RECEIVE_BADGE'; 
export const REMOVE_BADGE = 'REMOVE_BADGE'; 

const receiveBadges = badges => ({
    type: RECEIVE_BADGES,
    badges
})

const receiveBadge = badge => ({
    type: RECEIVE_BADGE, 
    badge 
})

const removeBadge = badge => ({
    type: REMOVE_BADGE, 
    badge 
})

export const fetchBadges = () => dispatch => {
    return badgeAPIUtil.fetchBadges()
        .then(badges => {
            dispatch(receiveBadges(badges));
        })
}

export const createBadge = badge => dispatch => {
    return badgeAPIUtil.createBadge(badge)
            .then(badge => {
                dispatch(receiveBadge(badge))
            })
}

export const deleteBadge = id => dispatch => {
    return badgeAPIUtil.deleteBadge(id)
        .then(badge => {
            dispatch(removeBadge(badge))
        })
}