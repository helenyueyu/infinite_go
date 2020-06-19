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
        // debugger 
        this.props.createBookmark(bookmark)
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