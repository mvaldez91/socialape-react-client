import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Comment from '../components/Comment';
//Time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Redux 
import { connect } from 'react-redux';

import { themeStyles } from '../themes';
const styles = (theme) => ({
    ...themeStyles,
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    circularProgress: {
        margin: '0px auto 0px auto'
    }
});

class Comments extends Component {
    render() {
        console.log(this.props);
        dayjs.extend(relativeTime);
        const { scream: { comments,screamId },
            UI: { loading }
        } = this.props;
        return (
            <Fragment>
                {!loading &&
                    comments.map((comment,idx) =>( <Comment comment={comment} key={`${screamId}-${idx}`}></Comment>)
                    )
                }
            </Fragment>
        );
    }
}

Comments.propTypes = {
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});


export default connect(mapStateToProps)(withStyles(styles)(Comments));