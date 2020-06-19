import { connect } from 'react-redux';
import AnswerForm from './answer_form';

import { createAnswer } from '../../actions/answers_actions';

const mapStateToProps = state => ({
    userId: state.session.id,
    type: "new"
})

const mapDispatchToProps = dispatch => ({
    action: answer => dispatch(createAnswer(answer))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm)