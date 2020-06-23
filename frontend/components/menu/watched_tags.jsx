import React from 'react'; 

class WatchedTags extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            watchedTagFormShown: false 
        }
    }
    render() {
        const { tags, watchedTags, userId, addToWatchTags, handleChange } = this.props; 
        const { watchedTagFormShown } = this.state;  

        return (
            <div className="watched_tags">
                <div className="watched_tags-title">
                    <i className="fas fa-eye"></i>
                    <span className="watched_tags-title-text">
                        Watched Tags
                    </span>
                </div>
                {watchedTagFormShown ? <input className="tags_index-search"
                    onChange={(e) => handleChange(e)}>
                </input> : null}

                <div>
                    {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                        <div key={idx} 
                            onClick={() => addToWatchTags(tag.id, userId)}
                            >
                            {tag.name}
                        </div>) : 
                        null}
                </div>
                <div className="watched_tags-items">
                    {watchedTags.map((tag, idx) => 
                        <div key={idx}
                            className="watched_tags-item">
                            {tag.name}
                        </div>)}
                </div>
            </div>
        )
    }
}

export default WatchedTags; 
