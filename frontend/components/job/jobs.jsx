import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Jobs extends React.Component {
    render() {
        return (
            <div>
                <Link to="/jobs">Jobs</Link>
                <Link to="/jobs/companies">Companies</Link>
                Jobs
            </div>
        )
    }
}

export default Jobs; 