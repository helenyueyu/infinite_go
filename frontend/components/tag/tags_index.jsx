import React from 'react';
import { Link } from 'react-router-dom'; 

import { sortByQuestionCount } from '../../selectors/sort_selectors'; 

import FilterTag from './filter_tag'; 

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchStats()
            .then(() => this.props.fetchPaginatedTags(this.props.search.pageNumber, this.props.search.pageLimit))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search.pageNumber !== this.props.search.pageNumber) {
            this.props.fetchPaginatedTags(this.props.search.pageNumber, this.props.search.pageLimit)
        }
    }
    handleChange(e) {
        e.preventDefault();
        this.props.searchTags(e.target.value);
    }

    rowify(items, perRow) {
        let arr = []; 
        for (let i = 0; i < items.length; i+= perRow) {
            let row = []; 
            for (let j = i; j < i + perRow; j++) {
                if (items[j]) row.push(items[j]); 
            }
            arr.push(row); 
        }
        return arr; 
    }

    generatePageNumbers(numQuestions, perPage, pageNumber) {
        numQuestions = parseInt(numQuestions); 
        perPage = parseInt(perPage); 
        pageNumber = parseInt(pageNumber); 

        let breakPoint1 = null; 
        let breakPoint2 = null; 

        let max = Math.floor(numQuestions/perPage) + 1; 
        if (max <= 8) {
            const temp = []; 
            for (let i = 1; i <= max; i++) {
                temp.push(i); 
            }
            return [temp, null, null]; 
        }

        if (pageNumber >= 1 && pageNumber <= 4) {
            const arr = []; 
            for (let i = 1; i <= 4; i++) {
                arr.push(i); 
            }
            arr.push(5); 
            arr.push(max); 
            breakPoint1 = 5; 

            return [arr, breakPoint1, breakPoint2]; 
        } else if (pageNumber >= max-3 && pageNumber <= max) {
            const arr = []; 
            arr.push(1); 
            for (let i = max-4; i <= max; i++) {
                arr.push(i); 
            }
            breakPoint1 = 1; 
            return [arr, breakPoint1, breakPoint2]; 
        } else {
            const arr = []; 
            arr.push(1); 
            for (let i = pageNumber-2; i <= pageNumber+2; i++) {
                arr.push(i); 
            }
            arr.push(max); 
            breakPoint1 = 1; 
            breakPoint2 = pageNumber+2; 
            return [arr, breakPoint1, breakPoint2]; 
        }      
    }

    render() {
        const { tags, search, tagCount } = this.props;
        const rowifiedTags = this.rowify(sortByQuestionCount(tags), 3); 

        const [pages, bp1, bp2] = this.generatePageNumbers(tagCount, search.pageLimit, search.pageNumber); 
  
        return (
            <div className="tags_index">
                <h1 className="tags_index-title">Tags</h1>
                <div className="tags_index-description">
                    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                </div>
                <div>
                    <input className="tags_index-search"
                        onChange={(e) => this.handleChange(e)}></input>
                </div>
                {rowifiedTags.map((row, idx) => (
                    <div key={idx} className="tags_index-row">
                        {row.map((tag, idx) => (
                            <div key={idx} className="tags_index-item">
                                <div className="tags_index_item-name-container">
                                    <div className="tags_index-item-name">
                                        <Link className="tags_index-item-name-link" to={`/questions/tagged/${tag.name}`}>{tag.name}</Link>
                                    </div>
                                </div>
                                <div className="tags_index-item-description">{tag.description}</div>
                                <div className="tags_index-item-details">
                                    <div>{tag.questionCount} question{tag.questionCount == 1 ? "" : "s"}</div>
                                    <div>{tag.dailyQuestionCount} asked today,</div>
                                    <div>{tag.weeklyQuestionCount} this week</div>
                                </div>
                                
                            </div>
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