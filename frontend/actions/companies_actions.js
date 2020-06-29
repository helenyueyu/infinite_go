import * as companyAPIUtil from '../util/companies_api_util';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';

const receiveCompany = company => ({
    type: RECEIVE_COMPANY,
    company
})

export const createCompany = company => dispatch => (
    companyAPIUtil.createCompany(company)
        .then(company => dispatch(receiveCompany(company)))
)
