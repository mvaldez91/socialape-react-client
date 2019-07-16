import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

import CustomButton from '../util/CustomButton';


import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

import { themeStyles } from '../themes';
const styles = (theme) => ({
    ...themeStyles,
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
      },
      invisibleSeparator:{
          border:'none',
          margin: 4
      },
      profileImage: {
          maxWidth: 200,
          height: 200,
          borderRadius: '50%',
          objectFit:'cover'      
      },
      dialogContent: {
          padding:20
      }
});

class ScreamDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({ open: false, errors: {} })
    }

    render() {
        dayjs.extend(relativeTime);
        const { classes,
            scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            UI: {loading}
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200}></CircularProgress>
        ) : 
        <Grid container >
            <Grid item sm={5}>
                <img src={userImage}  alt="Profile" className={classes.profileImage}></img>
            </Grid>
            <Grid item sm={7}>
                <Typography 
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                </Typography> 
                <hr className={classes.invisibleSeparator}/>
                <Typography variant="body1">
                    {body}
                </Typography>
            </Grid>
        </Grid>
        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"></UnfoldMore>
                </CustomButton>
                <Dialog open={this.state.open} fullWidth maxWidth="md">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon></CloseIcon>
                    </CustomButton>

                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));