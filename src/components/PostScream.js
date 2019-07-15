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

import CustomButton from '../util/CustomButton';

//Redux stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

const styles = {};


class PostScream extends Component{
  state ={
    open: false,
    body :'',
    errors: {}
  };
  handleOpen = ()=>{
    this.setState({open:true})
  }
  handleClose = ()=>{
    this.setState({open:false})
  }
  
}

PostScream.propTypes ={
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  UI: state.UI
})