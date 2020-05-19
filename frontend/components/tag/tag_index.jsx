import React from 'react';

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
    }
    render() {
        if (!this.props.tags) return null;
        const { tags } = this.props;
        return (
            <div>
                {tags.map((tag, idx) => <div key={idx}>{tag.name}{tag.count}</div>)}
            </div>
        )
    }
}

export default TagIndex; 