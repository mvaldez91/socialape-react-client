import React, { Component,Fragment } from 'react';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
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
    commentImage: {
        maxWidth: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    }
});

class Comment extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes,
            comment: { body, createdAt, userImage, userHandle}
        } = this.props;
        return (
            <Fragment>
                    <Grid container >
                        <Grid item sm={3} >
                            <img src={userImage} alt="Profile" className={classes.commentImage} />
                        </Grid>
                        <Grid item sm={9} >
                            <Typography
                                component={Link}
                                color="primary"
                                variant="h5"
                                to={`/users/${userHandle}`}>
                                @{userHandle}
                            </Typography>
                            <hr className={classes.invisibleSeparator} />
                            <Typography variant="body2" color="textSecondary">
                                {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                            </Typography>
                            <hr className={classes.invisibleSeparator} />
                            <Typography variant="body1">
                                {body}
                            </Typography>
                        </Grid>
                    </Grid>
            </Fragment>
        );
    }
}

Comment.propTypes = {
    user: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Comment));