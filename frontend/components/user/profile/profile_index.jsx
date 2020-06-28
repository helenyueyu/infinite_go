import React from 'react'; 

import { generatePageNumbers } from '../../../selectors/pagination_selectors'; 

import FilterTag from '../../tag/filter_tag'; 
import ProfileIndexItem from './profile_index_item'; 

class ProfileIndex extends React.Component {
    componentDidMount() {
        this.props.fetchStats()
            .then(() => this.props.fetchPaginatedUsers(this.props.search.pageNumber, this.props.search.pageLimit, this.props.search.filter))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search.pageNumber !== this.props.search.pageNumber || prevProps.search.filter !== this.props.search.filter) {
            this.props.fetchPaginatedUsers(this.props.search.pageNumber, this.props.search.pageLimit, this.props.search.filter)
        }
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
        const { users, search, userCount } = this.props; 

        const rowifiedUsers = this.rowify(users, 4); 
        const [pages, bp1, bp2] = generatePageNumbers(userCount, search.pageLimit, search.pageNumber); 

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
                                <ProfileIndexItem key={idx} 
                                        user={user} />
                            ))}
                        </div>
                    ))}

                    <div className="questions-filter">
                        <FilterTag
                            values={pages}
                            action={this.props.changeUserPageNumber}
                            active={search.pageNumber} 
                            bp1 = {bp1} 
                            bp2 = {bp2} />
                    </div>
            </div>
        )
    }
}

export default ProfileIndex; 

