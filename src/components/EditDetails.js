import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles  from '@material-ui/core/styles/withStyles';

//Redux stuff
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';
//Mui Stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import EditIcon from '@material-ui/icons/Edit';

import { themeStyles } from '../themes';
const styles = (theme) => ({ 
  ...themeStyles,button: {
    float: 'right'
  } });

class EditDetails extends Component {
  state ={
    bio:'',
    website:'',
    location: '',
    open: false
  }
  mapUserDetailsToState = (credentials)=>{
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    })
  }
  componentDidMount(){
    const {credentials}= this.props;
    this.mapUserDetailsToState(credentials);
  }
  
  handleOpen = (e)=>{
    e.preventDefault();
    this.setState({open:true});
    this.mapUserDetailsToState(this.props.credentials);
  }
  handleClose = ()=>{
    this.setState({open:false});
  }
  handleChange = (event) =>{
    this.setState({
       [event.target.name]: event.target.value
    });
  };
  handleSubmit = (event)=>{
    const userDetails ={
      bio: this.state.bio,
      website : this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }
  render() { 
    const {classes}= this.props;

    return ( 
        <Fragment>
          <Tooltip title="Edit details" placement="top">
              <IconButton onClick={this.handleOpen} className={classes.button}>
                <EditIcon color="primary"></EditIcon>
              </IconButton>
          </Tooltip>
          <Dialog open={this.state.open}>
              <DialogTitle>Edit your details</DialogTitle>
              <DialogContent>
                <form>
                  <TextField name="bio"
                             type="text"
                             label="Bio"
                             multiline
                             rows="3"
                             placeholder="A short bio about yourself"
                             className={classes.textField}
                             value={this.state.bio}
                             onChange={this.handleChange}/>
                  <TextField name="website"
                             type="text"
                             label="Website"
                             placeholder="Your personal/professional website"
                             className={classes.textField}
                             value={this.state.website}
                             onChange={this.handleChange}/>
                  <TextField name="location"
                             type="text"
                             label="Location"
                             placeholder="Where you live"
                             className={classes.textField}
                             value={this.state.location}
                             onChange={this.handleChange}/>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">Cancel</Button>
                <Button onClick={this.handleSubmit} color="primary">Save</Button>
              </DialogActions>
          </Dialog>
        </Fragment>
      );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  credentials: state.user.credentials
});
export default connect(mapStateToProps, {editUserDetails})( withStyles(styles)(EditDetails));