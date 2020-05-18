import React from 'react';

class Tags extends React.Component {
    render() {
        let { tags } = this.props;
        return (
            <div className="tags">
                {tags.map((tag, idx) => 
                    <div key={idx} className="tag-item">
                        {tag.name}
                    </div>
                )}
            </div>
        )
    }
}
export default Tags; 