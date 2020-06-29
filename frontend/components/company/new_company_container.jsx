import { connect } from 'react-redux';
import CompanyForm from './company_form'; 

import { createCompany } from '../../actions/companies_actions'; 

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        createCompany: company => dispatch(createCompany(company))
    }}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm)