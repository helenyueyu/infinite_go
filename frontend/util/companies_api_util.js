export const getCompanies = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/companies'
    })
}

export const createCompany = company => {
    return $.ajax({
        method: 'POST', 
        url: '/api/companies', 
        data: { company }
    })
}