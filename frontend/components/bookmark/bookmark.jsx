import React from 'react'; 

class Bookmark extends React.Component {
    addBookmark(e) {
        e.preventDefault(); 
        const bookmark = {
            user_id: this.props.user_id, 
            bookmarkable_id: this.props.bookmarkable_id, 
            bookmarkable_type: this.props.bookmarkable_type 
        }
        this.props.addBookmark(bookmark)
    }
    render() {
        return (
            <div onClick={this.addBookmark}>
                Book 
            </div>
        )
    }
}

export default Bookmark; 