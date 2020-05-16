import React from 'react'; 

const DeleteButton = ({ authorized, handleDelete, id }) => {
    return authorized ? <button className="delete_button" onClick={() => handleDelete(id)}>delete</button> : null; 
}

export default DeleteButton; 
