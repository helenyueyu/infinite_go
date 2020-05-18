import React from 'react';

class TagIndex extends React.Component {
    componentDidMount() {
        this.props.fetchTags()
    }
    render() {
        if (!this.props.tags) return null;
        const { tags } = this.props;
        console.log(tags); 
        return (
            <div>
                {tags.map(tag => <div>{tag.name}{tag.count}</div>)}
            </div>
        )
    }
}

export default TagIndex; 