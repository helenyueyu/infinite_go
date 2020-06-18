import { connect } from 'react-redux'; 
import Vote from './vote'; 

import { createVote } from '../../actions/votes_actions'; 

const mapStateToProps = (state) => ({
    user_id: state.entities.currentUser.id
})

const mapDispatchToProps = (dispatch) => ({
    createVote: vote => dispatch(createVote(vote)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)