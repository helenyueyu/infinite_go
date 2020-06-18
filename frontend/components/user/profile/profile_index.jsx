import React from 'react'; 

import { Link } from 'react-router-dom'; 

class ProfileIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers()
    }

    handleChange(e) {
        e.preventDefault(); 
        this.props.searchUsers(e.target.value); 
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
                <h1 className="profile_index-title">Users</h1>
                <div>
                    <input className="profile_index-search"
                        onChange={(e) => this.handleChange(e)}></input>
                </div>
                
                {
                    users.length === 0 ? 
                        <div className="profile_index-no-results">
                            No users matched your search. 
                        </div> 
                        :
                        rowifiedUsers.map((row, idx) => (
                        <div key={idx} className="profile_index-row">
                            {row.map((user, idx) => (
                                <div key={idx} className="profile_index-item">
                                    <div>
                                        <img className="profile_index-image" src="/assets/bug_mojo.png" />
                                    </div>

                                    <div className="profile_index-item-detail">
                                        <Link className="profile_index-username" 
                                                to={`/users/${user.id}`}>
                                                        {user.username}
                                        </Link>
                                        <div className="profile_index-location">{user.location}</div>
                                        <div className="profile_index-reputation">{user.reputation}</div>
                                        <div className="profile_index-tags">{user.topThreeTags.map((tag, idx) => 
                                                <Link  key={idx}
                                                        className="profile_index-tag" 
                                                        to={`/questions/tagged/${tag}`}>{tag}{idx === user.topThreeTags.length-1 ? '' : ','}</Link>
                                            )}</div>
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

