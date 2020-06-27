import React from 'react'; 

class InfoIndex extends React.Component {
    render() {
        return (
            <div className="info_index">
                <h1 className="info_index-title">MVPs</h1>

                Hello! This is a clone of Stack Overflow. The feature list is printed below: 

                <h2>Complete Features</h2>

                <div className="info_index-complete">
                    <div>Rich text editing for questions and answers using DraftJS library</div>
                    <div>Ability to upvote questions, answers and comments.</div> 
                    <div>Ability to create, edit and delete questions, answers and comments.</div>
                    <div>Ability to search for questions via title or by tag.</div>
                    <div>Custom date functions to convert ruby's .createdAt and .updatedAt into readable date formats for profile snippets (author boxes at the bottom of questions/answers).</div>
                    <div></div>
                    <div>Ability to sort tags via popularity, name (alphabetically) or creation date (newest).</div>
                    <div>Able to "accept" or "unaccept" an answer.</div>
                    <div>Can bookmark a question.</div>
                    <div>Last time a user was active visible.</div>
                    <div>Profile view count and question view count, using the impressionist library. </div>
                    <div>Dynamic pagination for questions and </div>
                </div>

                <h2>Incomplete Features</h2>

                <div className="info_index-incomplete">
                    <div>Implement jobs.</div>
                    <div>Implement companies.</div>
                    <div>Implement reputation.</div>
                    <div>Implement badge earning.</div>
                    <div>Implement mod vs. regular user.</div>
                    <div>Implement uploading of profile images with AWS.</div>
                    <div>Implement comments for answers. </div>
                    <div>Implement dynamic pagination for users.</div>
                    <div>Finish user profile and profile activity pages.</div>
                    <div>Implement restriction to 5 tags only per question.</div>
                    <div>Refactor accept and unaccept question component.</div>
                    <div>Implement pagination for answers.</div>
                </div>
            </div>
        )
    }
}

export default InfoIndex; 