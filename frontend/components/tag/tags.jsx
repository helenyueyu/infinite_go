import React from 'react';

import { Link } from 'react-router-dom'; 

class Tags extends React.Component {
    constructor(props) {
        super(props); 
        this.handleDelete = this.handleDelete.bind(this); 
    }

    handleDelete(id) {
        this.props.deleteTaggable(id)
            .then(() => {
                this.props.fetchQuestion(this.props.taggable_id)
            })
    }

    render() {
        let { tags } = this.props;
        return (
            <div className="tags">
                {tags.map((tag, idx) => 
                <Link key={idx} to={`/questions/tagged/${tag.name}`} className="tag-item">
                        {tag.name}
                </Link>
                )}
            </div>
        )
    }
}
export default Tags; 