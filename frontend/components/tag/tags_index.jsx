import React from 'react';
import { Link } from 'react-router-dom'; 

import moment from 'moment'; 

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
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

    render() {
        const { tags } = this.props;
        const rowifiedTags = this.rowify(tags, 3); 
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
            </div>
        )
    }
}

export default TagIndex; 