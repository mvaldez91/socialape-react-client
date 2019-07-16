import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

import PropTypes from 'prop-types';

import CustomButton from '../util/CustomButton';
import DeleteScream from '../components/DeleteScream';
import ScreamDialog from '../components/ScreamDialog';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = {
    card: {
        position:'relative',
        display: 'flex',
        marginBottom: 20,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    image: {
        minWidth: 200,
    }
};
class Scream extends Component {
    likedScream = () => {
       
        if (this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.scream.screamId
            )) {
            return true;
        }
        else {
            return false;
        }
    }
    likeScream = (e) => {
        e.preventDefault();
        this.props.likeScream(this.props.scream.screamId);
    }

    unlikeScream = (e) => {
        e.preventDefault();
        this.props.unlikeScream(this.props.scream.screamId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes,
            scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            user: {
                authenticated,
                credentials
            }
        } = this.props;
        const likeButton = authenticated ? (
            this.likedScream() ?
                <CustomButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon ></FavoriteIcon>
                </CustomButton>
                :
                <CustomButton tip="Like" onClick={this.likeScream}>
                    <FavoriteIcon color="primary"></FavoriteIcon>
                </CustomButton>
        ) : <span></span>;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}>
                </CardMedia>
                <CardContent className={classes.content}>
                    <Typography variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary">{userHandle}</Typography>
                    {userHandle === credentials.handle && 
                         <DeleteScream screamId={screamId}></DeleteScream>
                    }
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1" >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes </span>
                    <CustomButton tip="comments">
                        <ChatIcon color="primary"></ChatIcon>
                    </CustomButton>
                    <span>{commentCount} comments </span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle}/>
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));