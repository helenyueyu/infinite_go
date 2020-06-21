import { connect } from 'react-redux';
import QuestionForm from './question_form'; 

import { createQuestion, fetchFilteredQuestions } from '../../actions/questions_actions';
import { createTag, fetchTags } from '../../actions/tags_actions'; 
import { createTaggable } from '../../actions/taggable_actions';


const mapStateToProps = state => ({
   userId: state.session.id, 
   type: "new", 
   questions: state.entities.questions, 
   search: state.entities.search 
})

const mapDispatchToProps = dispatch => {
    return {
        action: question => dispatch(createQuestion(question)), 
        createTag: tag => dispatch(createTag(tag)), 
        createTaggable: taggable => dispatch(createTaggable(taggable)), 
        fetchTags: () => dispatch(fetchTags()), 
        fetchFilteredQuestions: (pageNumber, pageLimit, query) => dispatch(fetchFilteredQuestions(pageNumber, pageLimit, query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)