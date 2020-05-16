import { connect } from 'react-redux'; 
import Vote from './vote'; 

import { createVote, deleteVote } from '../../actions/votes_actions'; 

const mapStateToProps = (state, {question_id, count}) => ({
    user_id: state.entities.currentUser.id, 
    count: count, 
    voteable_id: question_id, 
    voteable_type: 'Question'
})

const mapDispatchToProps = (dispatch) => ({
    createVote: vote => dispatch(createVote(vote)), 
    deleteVote: vote => dispatch(deleteVote(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)