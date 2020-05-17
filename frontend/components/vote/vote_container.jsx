import { connect } from 'react-redux'; 
import Vote from './vote'; 

import { createVote } from '../../actions/votes_actions'; 

const mapStateToProps = (state, {voteable_id, voteable_type, count}) => ({
    user_id: state.entities.currentUser.id, 
    count: count, 
    voteable_id: voteable_id, 
    voteable_type: voteable_type 
})

const mapDispatchToProps = (dispatch) => ({
    createVote: vote => dispatch(createVote(vote)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)