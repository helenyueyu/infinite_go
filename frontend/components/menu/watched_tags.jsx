import React from 'react'; 
// import { withRouter } from 'react-router-dom'; 

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
            // .then(() => this.props.fetchQuestion(this.props.match.params.questionId))
            // .then(() => this.props.fetchTags())
    }

    handleClick() {
        this.setState({
            watchedTagFormShown: !this.state.watchedTagFormShown 
        })
    }

    render() {
        const { tags, watchedTags, userId, addToWatchTags, handleChange, watchedTagQuery } = this.props; 
        const { watchedTagFormShown } = this.state;  
        console.log('here is', watchedTagQuery)
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

                <div className="watched_tags-items">
                    {watchedTags.map((tag, idx) => 
                        <div key={idx}
                            className="watched_tags-item">
                            <div>{tag.name}</div>
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
                            onChange={(e) => handleChange(e)}>
                </input> : null}

                {watchedTagQuery && watchedTagQuery.length > 0 ? 
                    <div className="watched_tags-search-results">
                        {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                            <div key={idx} 
                                onClick={() => addToWatchTags(tag.id, userId)}
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
