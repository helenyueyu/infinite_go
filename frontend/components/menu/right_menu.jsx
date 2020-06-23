import React from 'react';

import RandomQuestions from './random_questions'; 
import TagStats from './tag_stats'; 
import WatchedTags from './watched_tags'; 

class RightMenu extends React.Component {
    constructor(props) {
        super(props); 
        this.addToWatchTags = this.addToWatchTags.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
        this.state = {
            watchedTagQuery: "" 
        }
    }

    componentDidMount() {
        this.props.fetchRandomQuestions(); 
        this.props.fetchTagStats(); 
        this.props.fetchWatchedTags(); 
    }

    handleChange(e) {
        e.preventDefault();
        const query = e.target.value; 
        this.setState({
            watchedTagQuery: query 
        }, () => this.props.searchTags(query))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.fetchQuestion(this.props.match.params.questionId); 
        }
    }

    addToWatchTags(tagId, userId) {
        this.props.createWatchedTag({
            tag_id: tagId, 
            user_id: userId 
        })
    }

    render() {
        let { questions, tagStats, tags, userId, watchedTags } = this.props; 
        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <WatchedTags tags={tags} 
                            userId={userId} 
                            watchedTags={watchedTags} 
                            addToWatchTags={this.addToWatchTags} 
                            handleChange={this.handleChange} 
                            watchedTagQuery={this.state.watchedTagQuery} />
                <TagStats tagStats={tagStats} />
                <RandomQuestions questions={questions} />
            </div>
        )
    }
}

export default RightMenu; 