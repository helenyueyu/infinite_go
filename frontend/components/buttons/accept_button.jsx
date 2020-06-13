import React from 'react';

const AcceptButton = ({ canAccept, action, type }) => {
    return (
        canAccept
            ? <button onClick={(e) => action(e)}>
                {type}
                </button>
            : null
    )
}

export default AcceptButton; 