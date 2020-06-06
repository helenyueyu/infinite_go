import * as metasAPIUtil from '../util/metas_api_util';

export const RECEIVE_METAS = 'RECEIVE_METAS';

const receiveMetas = metas => {
    return ({
        type: RECEIVE_METAS,
        metas
    })
}

export const fetchMetas = () => dispatch => {
    return metasAPIUtil.getMetas()
        .then(metas => {
            dispatch(receiveMetas(metas))
        });
}
