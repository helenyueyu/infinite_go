import * as badgeAPIUtil from '../util/badges_api_util';

export const RECEIVE_BADGES = 'RECEIVE_BADGES';

const receiveBadges = badges => ({
    type: RECEIVE_BADGES,
    badges
})

export const fetchBadges = () => dispatch => {
    return badgeAPIUtil.fetchBadges()
        .then(badges => {
            dispatch(receiveBadges(badges));
        })
}
