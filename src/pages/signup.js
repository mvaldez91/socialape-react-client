import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/monkey_2.png'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import {Link} from 'react-router-dom';

import {themeStyles}  from '../themes';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        let resStatus = 0;
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        fetch('/signup', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => {
                resStatus = res.status;
                return res.json()
            })
            .then(data => {
                if (resStatus >= 400) {
                    throw JSON.stringify(data);
                }
                localStorage.setItem('FBIdToken', `Bearer ${data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/')
            }).catch(err => {
                console.log(err)
                this.setState({
                    errors: JSON.parse(err),
                    loading: false
                })
            })
    };


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm>

                </Grid>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant="h3" className={classes.pageTitle} >
                        Signup
                </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange} fullWidth />
                        <TextField id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange} fullWidth />
                        <TextField id="confirmPassword"
                            name="confirmPassword"
                            type="confirmPassword"
                            label="Confirm Password"
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange} fullWidth />
                        <TextField id="handle"
                            name="handle"
                            type="handle"
                            label="Handle"
                            className={classes.textField}
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            onChange={this.handleChange} fullWidth />
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
                        <br/>
                        <small>Already have an account? Login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(themeStyles)(Signup);