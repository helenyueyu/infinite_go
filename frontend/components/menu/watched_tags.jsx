import React from 'react'; 

class WatchedTags extends React.Component {
    render() {
        const { tags, watchedTags, userId, addToWatchTags, handleChange } = this.props; 
        // debugger; 
        return (
            <div>
                <input className="tags_index-search"
                    onChange={(e) => handleChange(e)}>
                </input>

                <div>
                    {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                        <div key={idx} 
                            onClick={() => addToWatchTags(tag.id, userId)}>
                            {tag.name}
                        </div>) : 
                        null}
                </div>
                <div>
                    {watchedTags.map((tag, idx) => <div key={idx}>{tag.name}</div>)}
                </div>
            </div>
        )
    }
}

export default WatchedTags; 
