import { connect } from 'react-redux';

import BadgesIndex from './badges_index';
import { fetchBadges } from '../../actions/badges_actions';

const mapStateToProps = (state) => ({
    badges: state.entities.badges
});

const mapDispatchToProps = dispatch => ({
    fetchBadges: () => dispatch(fetchBadges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgesIndex); 