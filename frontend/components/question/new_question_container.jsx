import { connect } from 'react-redux';
import NewQuestion from './new_question';

import { createQuestion } from '../../actions/question_actions';

const mapStateToProps = state => ({
    authorId: state.session.id
})

const mapDispatchToProps = dispatch => ({
    createQuestion: question => dispatch(createQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)