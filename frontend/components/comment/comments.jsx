import React from 'react'; 

class Comments extends React.Component {
    render() {
        let { comments } = this.props; 
        return (
            <div>
                {Object.values(comments).map((x, idx) => <div key={idx}>{x.body}{x.username}</div>)}
            </div>
        )
    }
}
export default Comments; 