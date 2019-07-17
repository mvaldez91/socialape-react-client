import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getUserDetails} from '../redux/actions/userActions';

class User extends Component {
    componentDidMount(){
       console.log(this.props)
   
        this.props.getUserDetails(this.props.match.params.handle)
    }

    render(){
        const {screams} = this.props.data;
        let recentScreamMarkup = screams ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream}/>  )
        ) : <p>Loading...</p>

        return(
            <Grid container>

                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

User.propTypes ={
    getUserDetails: PropTypes.func.isRequired,
   
    data: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    data: state.data,
    user: state.user
})



export default connect(mapStateToProps,{getUserDetails})(User);