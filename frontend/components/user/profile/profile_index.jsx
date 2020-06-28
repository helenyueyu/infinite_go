import React from 'react'; 

import { generatePageNumbers } from '../../../selectors/pagination_selectors'; 

import FilterTag from '../../tag/filter_tag'; 
import ProfileIndexItem from './profile_index_item'; 
import { sortByNewest, sortByReputation } from '../../../selectors/sort_selectors'; 
import { rowify } from '../../../selectors/display_selectors'; 

class ProfileIndex extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            activeTag: 1 
        }
        this.handleFilter = this.handleFilter.bind(this); 
    }

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

    handleFilter(filter, idx) {
        this.setState({
            activeTag: idx + 1
        }, () =>  this.props.changeUserFilter(filter)); 
    }

    render() {
        if (!this.props.users) return null; 
        const { users, search, userCount } = this.props; 

        const rowifiedUsers = search.filter === "reputation" 
                    ? rowify(sortByReputation(users), 4)
                    : rowify(sortByNewest(users), 4); 

        const [pages, bp1, bp2] = generatePageNumbers(userCount, search.pageLimit, search.pageNumber); 
        const { activeTag } = this.state; 

        return (
            <div className="profile_index">
                <h1 className="profile_index-title">Users</h1>
                <div className="tags_index-search-container">
                    <input className="profile_index-search"
                        onChange={(e) => this.handleChange(e)}></input>
                    <div className="tags_index-filter-group">
                        {['reputation', 'new'].map((filter, idx) => 
                            <button key={idx}
                                    className={activeTag === idx + 1 ? "tags_index-filter-active" : "tags_index-filter"} 
                                    onClick={() => this.handleFilter(filter, idx)}>
                                    {filter[0].toUpperCase() + filter.slice(1)}
                            </button>
                            )}
                    </div>
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

