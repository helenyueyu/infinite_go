import { connect } from 'react-redux';
import Answers from './answers';

import { fetchAnswers } from '../../actions/answers_actions';

const mapStateToProps = (state) => ({
    answers: Object.values(state.entities.answers) 
})

const mapDispatchToProps = dispatch => ({
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Answers)