import React from 'react';

import TagsIndexItem from './tags_index_item'; 

import { sortByQuestionCount, sortByName } from '../../selectors/sort_selectors'; 
import { generatePageNumbers } from '../../selectors/pagination_selectors'; 
import { rowify, createButtonStyle } from '../../selectors/display_selectors'; 

import FilterTag from './filter_tag'; 

class TagIndex extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            activeTagIdx: 0
        }
        this.handleFilter = this.handleFilter.bind(this); 
    }

    componentDidMount() {
        this.props.fetchStats()
            .then(() => this.props.fetchPaginatedTags(this.props.search.pageNumber, this.props.search.pageLimit, this.props.search.filter))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search.pageNumber !== this.props.search.pageNumber || prevProps.search.filter !== this.props.search.filter) {
            this.props.fetchPaginatedTags(this.props.search.pageNumber, this.props.search.pageLimit, this.props.search.filter)
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.props.searchTags(e.target.value);
    }

    handleFilter(filter, idx) {
        this.setState({
            activeTagIdx: idx
        }, () =>  this.props.changeTagFilter(filter)); 
    }

    render() {
        const { tags, search, tagCount, updateTagDescription } = this.props;
        const rowifiedTags = search.filter === "popular" 
                    ? rowify(sortByQuestionCount(tags), 4)
                    : rowify(sortByName(tags), 4); 

        const [pages, bp1, bp2] = generatePageNumbers(tagCount, search.pageLimit, search.pageNumber); 
        const { activeTagIdx } = this.state; 
        return (
            <div className="tags_index">
                <h1 className="tags_index-title">Tags</h1>
                <div className="tags_index-description">
                    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                </div>
                <div className="tags_index-search-container">
                    <input className="tags_index-search"
                        onChange={(e) => this.handleChange(e)}></input>
                    <div className="tags_index-filter-group">
                        {['popular', 'name', 'new'].map((filter, idx) => 
                            <button key={idx}
                                    className={createButtonStyle(activeTagIdx, idx, 2)} 
                                    onClick={() => this.handleFilter(filter, idx)}>
                                    {filter[0].toUpperCase() + filter.slice(1)}
                            </button>
                            )}
                    </div>
                </div>
                {rowifiedTags.map((row, idx) => (
                    <div key={idx} className="tags_index-row">
                        {row.map((tag, idx) => (
                            <TagsIndexItem key={idx}
                                    tag={tag}
                                    updateTagDescription={updateTagDescription}/>
                        ))}
                    </div>
                ))}

                <div className="questions-filter">
                    <FilterTag
                        values={pages}
                        action={this.props.changeTagPageNumber}
                        active={search.pageNumber} 
                        bp1 = {bp1} 
                        bp2 = {bp2} />
                </div>
            </div>
        )
    }
}

export default TagIndex; 