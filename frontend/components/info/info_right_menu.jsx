import React from 'react'; 

import BadgesInfo from '../badge/badges_info'; 

import { Link } from 'react-router-dom'; 

const InfoRightMenu = (props) => {
    const path = props.match.path; 
    return (
        <div className="right_menu">
            <div>
                <Link to="/info">Main</Link>
            </div>
            <div>
                <Link to="/info/badges">Badges</Link>
            </div>
            <div>
                <Link to="/info/about">About Me</Link>
            </div>
            {path === "/info/badges" ? <BadgesInfo /> : null}
        </div>
    )
}

export default InfoRightMenu; 
