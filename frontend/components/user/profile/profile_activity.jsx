import React from 'react'; 

import ProfileButtons from '../../buttons/profile_buttons'; 

class ProfileActivity extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    render() {
        if (this.props.users[this.props.match.params.userId] === undefined) {
            return null;
        } 
        let { id } = this.props.users[this.props.match.params.userId]; 
        console.log(this.props)
        return (
            <div>
                <ProfileButtons id={id}
                        activeIdx={1} />
            </div>
        )
    }
}

export default ProfileActivity; 