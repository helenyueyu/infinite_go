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
        let { tags, showDelete } = this.props;
        // debugger; 
        return (
            <div className="tags">
                {tags.map((tag, idx) => 
                    <div key={idx} className="tag-item">
                        <div>{tag.name}</div>
                        {showDelete === true ? <button className="tag-button" onClick={() => this.handleDelete(tag.id)}>x</button> : null}
                    </div>
                )}
            </div>
        )
    }
}
export default Tags; 