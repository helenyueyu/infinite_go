import React from 'react';

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
        console.log('tags', tags); 
        return (
            <div className="tags">
                {tags.map((tag, idx) => 
                    <div key={idx} className="tag-item">
                        {tag.name}<button onClick={() => this.handleDelete(tag.id)}>Delete</button>
                    </div>
                )}
            </div>
        )
    }
}
export default Tags; 