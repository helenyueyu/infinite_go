import React from 'react'; 
import { Link } from 'react-router-dom'; 

class WatchedTags extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            watchedTagFormShown: false 
        }
        this.handleClick = this.handleClick.bind(this); 
        this.handleDelete = this.handleDelete.bind(this); 
    }

    handleDelete(e, id) {
        e.preventDefault(); 
        this.props.deleteWatchedTag(id)
    }

    handleClick() {
        this.setState({
            watchedTagFormShown: !this.state.watchedTagFormShown 
        })
    }

    render() {
        const { tags, watchedTags, userId, addToWatchedTags, handleWatchedTagChange, watchedTagQuery } = this.props; 
        const { watchedTagFormShown } = this.state;  
        return (
            <div className="watched_tags">
                <div className="watched_tags-title">
                    <div className="watched_tags-left">
                        <i className="fas fa-eye"></i>
                        <div className="watched_tags-title-text">
                            Watched Tags
                        </div>
                    </div>
                    
                    <div onClick={this.handleClick}
                        className="watched_tags-title-text">
                        edit
                    </div>
                </div>

                <div className="watched_tags-tag-search">
                    <div className="watched_tags-items">
                        {watchedTags.map((tag, idx) => 
                            <div key={idx}
                                className="watched_tags-item">
     
                                    <Link className="watched_tags-item-link" to={`/questions/tagged/${tag.name}`}>
                                        {tag.name}
                                    </Link>
                                
                                {watchedTagFormShown ? 
                                    <button onClick={(e) => this.handleDelete(e, tag.id)}
                                        className="watched_tags-delete-button">
                                        <i className="fas fa-times watched_tags"></i>
                                    </button> : null}
                            </div>)}
                    </div>
                    
                    {watchedTagFormShown ? 
                        <input className="watched_tags-search"
                                value={watchedTagQuery}
                                onChange={(e) => handleWatchedTagChange(e)}>
                    </input> : null}
                </div>

                {watchedTagQuery && watchedTagQuery.length > 0 ? 
                    <div className="watched_tags-search-results">
                        {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                            <div key={idx} 
                                onClick={() => addToWatchedTags(tag.id, userId)}
                                className="watched_tag-search-result">
                                    {tag.name}
                            </div>) 
                        : 
                        null}
                    </div> 
                : 
                null}
                
            </div>
        )
    }
}

export default WatchedTags; 
