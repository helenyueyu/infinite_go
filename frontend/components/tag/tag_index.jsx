import React from 'react';

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
    }
    render() {
        const { tags } = this.props;
        return (
            <div>
                {Array.isArray(tags) && tags.map((tag, idx) => <div key={idx}>{tag.name}{tag.questionCount}</div>)}
            </div>
        )
    }
}

export default TagIndex; 