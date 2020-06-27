import React from 'react'; 

import { Link } from 'react-router-dom'; 

const ErrorsPage = () => (
    <div className="errors_page">
        <div className="errors_page-bug">
            <i className="fas fa-bug"></i>
        </div>
        
        <div>
            <h1 className="errors_page-title">
                Page Not Found
            </h1>
            <h2 className="errors_page-description">
                We're sorry, we couldn't find the page you requested.
            </h2>

            <div className="errors_page-redirect">
                Browse our recent 
                <Link className="errors_page-link" 
                    to="/questions"> questions</Link>
            </div>

            <div className="errors_page-redirect">
                Browse our popular 
                <Link className="errors_page-link" 
                    to="/tags"> tags</Link>
            </div>

            <div className="errors_page-redirect">
                More  
                <Link className="errors_page-link" 
                    to="/info"> info</Link>? 
            </div>
        </div>
    </div>
); 

export default ErrorsPage; 
