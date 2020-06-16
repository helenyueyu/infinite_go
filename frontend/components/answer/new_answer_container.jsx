import { connect } from 'react-redux';
import AnswerForm from './answer_form';

import { createAnswer } from '../../actions/answers_actions';
import { fetchUser } from '../../actions/users_actions'; 

const mapStateToProps = state => ({
    userId: state.session.id,
    type: "new"
})

const mapDispatchToProps = dispatch => ({
    action: answer => dispatch(createAnswer(answer))
    // fetchUser: id => dispatch(fetchUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm)