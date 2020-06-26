import React from 'react'; 

import { displayShortenedDate } from '../../../../selectors/date_selectors'; 
import ProfileActivityContainer from '../profile_activity_container'; 


class BookmarksIndex extends React.Component {
    componentDidMount() {
        this.props.fetchBookmarks(); 
    }

    render() {
        const { bookmarks } = this.props; 
        return (
            <div className="profile_activity_container">
                <ProfileActivityContainer />

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
            </div>
        )
    }
}

export default BookmarksIndex; 