import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

const styles ={
    form: {
        textAlign: 'center'
    }
};
class Login extends Component {
    render(){
        const {classes} = this.props;

        return(
          <Grid container className={classes.form}>
            <Grid item sm>

            </Grid>
            <Grid item sm></Grid>
            <Grid item sm></Grid>
          </Grid>
        );
    }
}

Login.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);