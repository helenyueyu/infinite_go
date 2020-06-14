import React from 'react'; 

import { Link } from 'react-router-dom'; 
// import myImg from 'images/favicon.png'


class ProfileIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers()
    }

    rowify(items, perRow) {
        let arr = [];
        for (let i = 0; i < items.length; i += perRow) {
            let row = [];
            for (let j = i; j < i + perRow; j++) {
                if (items[j]) row.push(items[j]);
            }
            arr.push(row);
        }
        return arr;
    }

    render() {
        if (!this.props.users) return null; 
        const { users } = this.props; 

        const rowifiedUsers = this.rowify(users, 3); 

        return (
            <div className="profile_index">
                {
                    rowifiedUsers.map((row, idx) => (
                        <div key={idx} className="profile_index-row">
                            {row.map((user, idx) => (
                                <div key={idx} className="profile_index-item">
                                    <img src="/assets/favicon-32x32.png" />
                                    
                                    <div>
                                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                                        <div>{user.reputation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default ProfileIndex; 

