import React from 'react'; 
import { Link } from 'react-router-dom'; 

const EditButton = ({ authorized, link }) => {
    return authorized ? <button className="edit_button">
            <Link to={link} className="edit_button_text">edit</Link>
        </button> : null; 
}

export default EditButton; 

