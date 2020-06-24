import React from 'react';

import RandomQuestions from './random_questions'; 
import TagStats from './tag_stats'; 
import WatchedTags from './watched_tags'; 
import IgnoredTags from './ignored_tags'; 

class RightMenu extends React.Component {
    constructor(props) {
        super(props); 
        this.addToWatchedTags = this.addToWatchedTags.bind(this); 
        this.addToIgnoredTags = this.addToIgnoredTags.bind(this); 
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

    addToWatchedTags(tagId, userId) {
        this.props.createWatchedTag({
            tag_id: tagId, 
            user_id: userId 
        }).then(() => this.props.fetchWatchedTags())
    }

    addToIgnoredTags(tagId, userId) {
        debugger; 
        this.props.createIgnoredTag({
            tag_id: tagId, 
            user_id: userId
        }).then(() => this.props.fetchIgnoredTags())
    }

    render() {
        let { questions, tagStats, tags, userId, watchedTags, deleteWatchedTag, ignoredTags, deleteIgnoredTag } = this.props; 
        let { fetchQuestion } = this.props; 

        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <WatchedTags tags={tags} 
                            userId={userId} 
                            watchedTags={watchedTags} 
                            addToWatchedTags={this.addToWatchedTags} 
                            handleChange={this.handleChange} 
                            watchedTagQuery={this.state.watchedTagQuery}
                            deleteWatchedTag={deleteWatchedTag} 
                            fetchQuestion={fetchQuestion} />

                <IgnoredTags tags={tags} 
                            userId={userId} 
                            ignoredTags={ignoredTags} 
                            addToIgnoredTags={this.addToIgnoredTags} 
                            handleChange={this.handleChange} 
                            ignoredTagQuery={this.state.ignoredTagQuery}
                            deleteIgnoredTag={deleteIgnoredTag} 
                            fetchQuestion={fetchQuestion} />

                <TagStats tagStats={tagStats} />
                <RandomQuestions questions={questions} />
            </div>
        )
    }
}

export default RightMenu; 