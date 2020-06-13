import React from 'react'; 
import { displayDate } from '../../selectors/date_selectors'; 

class Comments extends React.Component {
    render() {
        let { comments } = this.props; 
        console.log('comments', comments); 
        return (
            <div className="comments">
                {Object.values(comments).map((x, idx) => 
                    <div key={idx} className="comments-item">
                        <span className="comments-body">{x.body}</span>
                        <span className="comments-dash">&mdash;</span>
                        <span className="comments-username">{x.username}</span>
                        <span className="comments-date">{displayDate(x.createdAt)}</span>
                    </div>)}
            </div>
        )
    }
}
export default Comments; 