import React from 'react';

import moment from 'moment'; 

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
    }

    rowify(tags, perRow) {
        let arr = []; 
        for (let i = 0; i < tags.length; i+= perRow) {
            let row = []; 
            for (let j = i; j < i + perRow; j++) {
                if (tags[j]) row.push(tags[j]); 
            }
            arr.push(row); 
        }
        return arr; 
    }
    render() {
        const { tags } = this.props;
        
        const rowifiedTags = this.rowify(tags, 3); 
        console.log('tags', rowifiedTags); 

        return (
            <div className="tag_index">
                {rowifiedTags.map((row, idx) => (
                    <div key={idx} className="tag_index-row">
                        {row.map((tag, idx) => (
                            <div key={idx} className="tag_index-item">
                                <div className="tag_index_item-name-container">
                                    <div className="tag_index-item-name">{tag.name}</div>
                                </div>
                                <div className="tag_index-item-description">{tag.description}</div>
                                <div className="tag_index-item-details">
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