import { connect } from 'react-redux';
import QuestionForm from './question_form'; 

import { fetchQuestion, updateQuestion } from '../../actions/questions_actions';
import { createTag, searchTags } from '../../actions/tags_actions'; 
import { createTaggable, deleteTaggable } from '../../actions/taggable_actions';


const mapStateToProps = (state, ownProps) => {
    return {
    userId: state.session.id, 
    question: state.entities.questions[ownProps.match.params.questionId], 
    type: "edit", 
    tags: state.entities.tags
}}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuestion: question => dispatch(fetchQuestion(question)), 
        action: question => dispatch(updateQuestion(question)), 
        createTag: tag => dispatch(createTag(tag)), 
        createTaggable: taggable => dispatch(createTaggable(taggable)), 
        deleteTaggable: id => dispatch(deleteTaggable(id)), 
        searchTags: query => dispatch(searchTags(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)