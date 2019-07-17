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
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Custom components
import CustomButton from '../util/CustomButton';
import LikeButton from '../components/LikeButton';
import Comments from '../components/Comments';

//Time
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Redux 
import { connect } from 'react-redux';
import { getScream, postComment } from '../redux/actions/dataActions';


import { themeStyles } from '../themes';
const styles = (theme) => ({
    ...themeStyles,
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'
    },
   
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    circularProgress: {
        margin: '0px auto 0px auto'
    },

});

class ScreamDialog extends Component {
    state = {
        open: false,
        errors: {},
        body: ''
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({ open: false, errors: {} })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmitComment = (event) => {
        event.preventDefault();
        this.props.postComment(this.props.scream.screamId, { body: this.state.body });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' })
            //this.handleClose();
        }
    }


    render() {
        dayjs.extend(relativeTime);
        const { errors } = this.state;
        const { classes,
            scream: { body, createdAt, userImage, userHandle,  commentCount },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200} className={classes.circularProgress}></CircularProgress>
        ) :
            <Fragment>

                <Grid container >
                    <Grid item sm={5} >
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7} >
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
                        <LikeButton scream={this.props.scream} />
                        <CustomButton tip="comments">
                            <ChatIcon color="primary"></ChatIcon>
                        </CustomButton>
                        <span>{commentCount} comments </span>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12}>
                        <hr ></hr>
                        <form onSubmit={this.handleSubmitComment}>
                            <TextField
                                name="body"
                                type="text"
                                label="Leave a comment!"
                                multiline
                                rows="2"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            ></TextField>
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                                {loading ? <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress> : <span>Send comment</span>}
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12}>
                        <hr ></hr>
                      
                        <Comments scream={this.props.scream}></Comments>
                    </Grid>
                </Grid>

            </Fragment>
        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"></UnfoldMore>
                </CustomButton>
                <Dialog open={this.state.open}  >
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon></CloseIcon>
                    </CustomButton>

                    <DialogContent className={classes.dialogContent}>
                        <hr className={classes.invisibleSeparator}></hr>
                        <br />
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
    getScream,
    postComment
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));