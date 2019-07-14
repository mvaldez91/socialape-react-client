import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux stuff
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';
//Mui Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import DeleteOutline from '@material-ui/icons/Delete';

import { themeStyles } from '../themes';
import CustomButton from '../util/CustomButton';
const styles = (theme) => ({
  ...themeStyles, 
  deleteButton: {
    position: 'absolute',
    left: '80%'
  }
});

class DeleteScream extends Component {
  state = {
    open: false
  }

  handleOpen = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.setState({ open: false });
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CustomButton tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}>
          <DeleteOutline color="secondary"></DeleteOutline>
        </CustomButton>
        <Dialog open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure want to delete this scream ?
      </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.deleteScream} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

  DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
  }
  const mapStateToProps = (state) => ({
    credentials: state.user.credentials
  });
  export default connect(mapStateToProps, { deleteScream })(withStyles(styles)(DeleteScream));