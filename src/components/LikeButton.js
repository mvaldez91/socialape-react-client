import React, { Component, Fragment } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

import PropTypes from 'prop-types';

import CustomButton from '../util/CustomButton';
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import { themeStyles } from '../themes';
const styles = {
    ...themeStyles
};

class LikeButton extends Component {

    likedScream = () => {
        
        if (this.props.user.likes && 
            this.props.user.likes.find((like) => like.screamId === this.props.scream.screamId)) {
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
        const {
           scream: {likeCount }
        } = this.props;
        return (
            <Fragment>
                {this.likedScream() ?
                    <CustomButton tip="Undo like" onClick={this.unlikeScream}>
                        <FavoriteIcon></FavoriteIcon>
                    </CustomButton>
                    :
                    <CustomButton tip="Like" onClick={this.likeScream}>
                        <FavoriteIcon color="primary"></FavoriteIcon>
                    </CustomButton>}
                <span>{likeCount} Likes </span>
            </Fragment>
        )
    }
}

LikeButton.propTypes = {
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
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));