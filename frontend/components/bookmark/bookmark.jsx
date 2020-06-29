import React from 'react'; 

class Bookmark extends React.Component {
    constructor(props) {
        super(props); 
        this.addBookmark = this.addBookmark.bind(this); 
    }

    addBookmark(e) {
        e.preventDefault(); 
        const bookmark = {
            user_id: this.props.user_id, 
            bookmarkable_id: this.props.bookmarkable_id, 
            bookmarkable_type: this.props.bookmarkable_type 
        }
        this.props.createBookmark(bookmark)
    }
    render() {
        const { currentBookmark } = this.props; 
        return (
            <div onClick={this.addBookmark} className={currentBookmark === 1 ? "bookmark-active" : "bookmark"}>
                <i className="fas fa-bookmark"></i>
            </div>
        );
    }
}

export default Bookmark; 