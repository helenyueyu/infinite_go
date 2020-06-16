import { connect } from 'react-redux';

import BadgesIndex from './badges_index';
import { fetchBadges, createBadge, deleteBadge } from '../../actions/badges_actions';

const mapStateToProps = (state) => ({
    badges: state.entities.badges
});

const mapDispatchToProps = dispatch => ({
    fetchBadges: () => dispatch(fetchBadges()),
    createBadge: badge => dispatch(createBadge(badge)), 
    deleteBadge: id => dispatch(deleteBadge(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgesIndex); 