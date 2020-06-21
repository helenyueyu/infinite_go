import { connect } from 'react-redux';
import QuestionForm from './question_form'; 

import { createQuestion, fetchQuestion } from '../../actions/questions_actions';
import { createTag, searchTags } from '../../actions/tags_actions'; 
import { createTaggable } from '../../actions/taggable_actions';


const mapStateToProps = state => ({
   userId: state.session.id, 
   type: "new", 
   questions: state.entities.questions
})

const mapDispatchToProps = dispatch => {
    return {
        action: question => dispatch(createQuestion(question)), 
        createTag: tag => dispatch(createTag(tag)), 
        createTaggable: taggable => dispatch(createTaggable(taggable)), 
        fetchQuestion: id => dispatch(fetchQuestion(id)), 
        searchTags: query => dispatch(searchTags(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)