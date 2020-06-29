export const createCompany = company => {
    return $.ajax({
        method: 'POST', 
        url: '/api/companies', 
        data: { company }
    })
}