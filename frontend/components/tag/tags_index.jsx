import React from 'react';
import { Link } from 'react-router-dom'; 

import moment from 'moment'; 

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
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
                                    <div>{moment(tag.createdAt).fromNow()}</div>
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