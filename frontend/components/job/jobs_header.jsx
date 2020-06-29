import React from 'react'; 

import { Link } from 'react-router-dom'; 

const JobsHeader = () => (
    <div className="jobs_header">
        <Link to="/jobs">Jobs</Link>
        <Link to="/jobs/companies">Companies</Link>
    </div>
); 

export default JobsHeader; 