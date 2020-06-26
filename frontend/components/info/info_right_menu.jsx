import React from 'react'; 

import { Link } from 'react-router-dom'; 

const InfoRightMenu = () => (
    <div className="right_menu">
        <div>
            <Link to="/info">Main</Link>
        </div>
        <div>
            <Link to="/info/badges">badges</Link>
        </div>
    </div>
)

export default InfoRightMenu; 
