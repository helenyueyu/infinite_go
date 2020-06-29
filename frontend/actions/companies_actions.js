import * as companyAPIUtil from '../util/companies_api_util';

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES'; 

const receiveCompanies = companies => ({
    type: RECEIVE_COMPANIES, 
    companies 
})

const receiveCompany = company => ({
    type: RECEIVE_COMPANY,
    company
})

export const fetchCompanies = () => dispatch => {
    return companyAPIUtil.getCompanies()
        .then(companies => dispatch(receiveCompanies(companies)))
}

export const createCompany = company => dispatch => (
    companyAPIUtil.createCompany(company)
        .then(company => dispatch(receiveCompany(company)))
)
