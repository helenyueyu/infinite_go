import React from 'react'; 

class ProfileIndex extends React.Component {
    componentDidMount() {
        this.props.fetchUsers()
    }
    render() {
        if (!this.props.users) return null; 
        const { users } = this.props; 
        return (
            <div className="profile_index">
                {users.map(user =>
                    <div className="profile_index-item"> 
                        <div>{user.username}</div>
                    </div>
                )}
            </div>
        )
    }
}

export default ProfileIndex; 