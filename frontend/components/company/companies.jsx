import React from 'react'; 
import { Link } from 'react-router-dom'; 

import JobsHeader from './../job/jobs_header'; 

class Companies extends React.Component {
    render() {
        return (
            <div className="companies">
                <JobsHeader />
               companies 

                <Link to="/jobs/companies/new">
                    <button>Create New Company</button>
                </Link>
            </div>
        )
    }
}

export default Companies; 