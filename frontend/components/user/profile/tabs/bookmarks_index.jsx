import React from 'react'; 

import { displayShortenedDate } from '../../../../selectors/date_selectors'; 


class Bookmarks extends React.Component {
    componentDidMount() {
        this.props.fetchBookmarks(); 
    }

    render() {
        const { bookmarks } = this.props; 
        return (
            <div className="bookmarks_index">
                {bookmarks.map((bookmark, idx) => 
                    <div className="bookmarks_index-item" key={idx}>
                        <div className="bookmarks_index-left">
                            <div>{bookmark.voteCount}</div>
                            <div>{bookmark.viewCount}</div>
                            <div>{bookmark.answerCount}</div>
                            <div>{bookmark.bookmarkCount}</div>
                            <div>{bookmark.title}</div>
                        </div>
                        <div className="bookmarks_index-right">
                            {displayShortenedDate(bookmark.createdAt)}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Bookmarks; 