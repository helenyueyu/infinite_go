import React from 'react'; 
import { Link } from 'react-router-dom'; 

class IgnoredTags extends React.Component {
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
        this.props.deleteIgnoredTag(id)
    }

    handleClick() {
        this.setState({
            ignoredTagFormShown: !this.state.ignoredTagFormShown 
        })
    }

    render() {
        const { tags, ignoredTags, userId, addToIgnoredTags, handleIgnoredTagChange, ignoredTagQuery } = this.props; 
        const { ignoredTagFormShown } = this.state;  
        return (
            <div className="watched_tags">
                <div className="watched_tags-title">
                    <div className="watched_tags-left">
                        <i className="fas fa-ban"></i>
                        <div className="watched_tags-title-text">
                            Ignored Tags
                        </div>
                    </div>
                    
                    <div onClick={this.handleClick}
                        className="watched_tags-title-text">
                        edit
                    </div>
                </div>

                <div className="watched_tags-tag-search">
                    <div className="watched_tags-items">
                        {ignoredTags.map((tag, idx) => 
                            <div key={idx} className="watched_tags-item">
                                <Link className="watched_tags-item-link" to={`/questions/tagged/${tag.name}`}>
                                    {tag.name}
                                </Link>

                                {ignoredTagFormShown ? 
                                    <button onClick={(e) => this.handleDelete(e, tag.id)}
                                        className="watched_tags-delete-button">
                                            x
                                    </button> : null}
                            </div>)}
                    </div>
                    
                    {ignoredTagFormShown ? 
                        <input className="watched_tags-search"
                                value={ignoredTagQuery}
                                onChange={(e) => handleIgnoredTagChange(e)}>
                    </input> : null}
                </div>

                {ignoredTagFormShown && ignoredTagQuery && ignoredTagQuery.length > 0 ? 
                    <div className="watched_tags-search-results">
                        {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                            <div key={idx} 
                                onClick={() => addToIgnoredTags(tag.id, userId)}
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

export default IgnoredTags; 