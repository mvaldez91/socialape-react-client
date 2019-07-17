import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import EditDetails from '../components/EditDetails';

import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import {logoutUser, uploadImage} from '../redux/actions/userActions';


import { themeStyles } from '../themes';
const styles = { 
  ...themeStyles 
};

class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }
  handleEditPicture = () => {
    document.getElementById('imageInput').click();
  }
  handleLogout = ()=>{
    this.props.logoutUser();
  }
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let notAuthMarkup = (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again !
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
        </div>
      </Paper>
    );

    let authMarkup = (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper ">
            <img src={imageUrl} alt="Profile" className="profile-image"></img>
            <input type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange} />
            <Tooltip title="Change profile picture" placement="top">
              <IconButton onClick={this.handleEditPicture} className="button" >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <hr  className={classes.invisibleSeparator} />
        <div className={classes.profile_details}>
          <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr  className={classes.invisibleSeparator} />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr   className={classes.invisibleSeparator} />
          {location && (
            <Fragment>
              <LocationOn color="primary"></LocationOn><span>{location}</span>
              <hr  className={classes.invisibleSeparator} />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary"></LinkIcon>
              <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
              <hr className={classes.invisibleSeparator} />
            </Fragment>
          )}
          <CalendarToday color="primary" /> {' '}<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        <Tooltip title="Logout" placement="top">
            <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary"></KeyboardReturn>
            </IconButton>
        </Tooltip>
        <EditDetails/>
      </Paper>
    );

    let profileMarkup =
      authenticated ? (
        !loading ? authMarkup : (<p>Loading...</p>)
      ) : notAuthMarkup;

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile)); 