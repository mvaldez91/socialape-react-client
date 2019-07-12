import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/monkey_2.png'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

import {themeStyles}  from '../themes';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = (event)=>{
        let resStatus = 0;
        event.preventDefault();
       
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };


    handleChange = (event) =>{
      this.setState({
         [event.target.name]: event.target.value
      });
    };
    render(){
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;

        return(
          <Grid container className={classes.form}>
            <Grid item sm>

            </Grid>
            <Grid item sm>
                <img src={AppIcon} alt="monkey" className={classes.image} />
                <Typography variant="h3" className={classes.pageTitle} >
                    Login
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email"
                               name="email"
                               type="email"
                               label="Email"
                               className={classes.textField}
                               value={this.state.email}
                               helperText={errors.email}
                               error={errors.email ? true: false}
                               onChange={this.handleChange} fullWidth/>
                    <TextField id="password"
                               name="password"
                               type="password"
                               label="Password"
                               className={classes.textField}
                               value={this.state.password}
                               helperText={errors.password}
                               error={errors.password ? true: false}
                               onChange={this.handleChange} fullWidth/>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading} 
                        className={classes.button}>
                        Login
                        {loading && (
                            <CircularProgress className="classes.progress" size={30}></CircularProgress>
                        )}
                        </Button>
                </form>
            </Grid>
            <Grid item sm></Grid>
          </Grid>
        );
    }
}

Login.propTypes = {
   classes: PropTypes.object.isRequired,
   loginUser: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   UI: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps) (withStyles(themeStyles)(Login));