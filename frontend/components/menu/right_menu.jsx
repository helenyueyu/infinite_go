import React from 'react';

import RandomQuestions from './random_questions'; 
import TagStats from './tag_stats'; 

class RightMenu extends React.Component {
    componentDidMount() {
        this.props.fetchRandomQuestions(); 
        this.props.fetchTagStats(); 
    }

    handleChange(e) {
        e.preventDefault();
        this.props.searchTags(e.target.value);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.fetchQuestion(this.props.match.params.questionId); 
        }
    }

    addToWatchTags(tagId, userId) {
        // debugger; 
        this.props.createWatchTag({
            tag_id: tagId, 
            user_id: userId 
        })
    }

    render() {
        let { questions, tagStats, tags, userId } = this.props; 
        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <div>
                    <input className="tags_index-search"
                        onChange={(e) => this.handleChange(e)}>
                    </input>
                    <div>
                        {Object.keys(tags).length > 0 ? tags.slice(0, 5).map((tag, idx) => 
                            <div key={idx} 
                                onClick={() => this.addToWatchTags(tag.id, userId)}>
                                {tag.name}
                            </div>) : 
                            null}
                    </div>
                </div>
                <TagStats tagStats={tagStats} />
                <RandomQuestions questions={questions} />
            </div>
        )
    }
}

export default RightMenu; 