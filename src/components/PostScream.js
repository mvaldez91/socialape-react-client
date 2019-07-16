import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Mui Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';


//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import CustomButton from '../util/CustomButton';

//Redux stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

import { themeStyles } from '../themes';
const styles = (theme) => ({
  ...themeStyles,
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false, errors: {} })
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.postScream( {body:this.state.body});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({body: ''})
      this.handleClose();
    }
  }

  render() {
    const { errors } = this.state;
    const { classes, UI: { loading } } = this.props;
    return (
      <Fragment>
        <CustomButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon color="primary"></AddIcon>
        </CustomButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon></CloseIcon>
          </CustomButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="!SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes!"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                {loading ? <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress> : <span> Submit</span>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

const mapActionsToProps = {
  postScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream))