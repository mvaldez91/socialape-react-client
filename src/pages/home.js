import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getScreams, unlikeScream} from '../redux/actions/dataActions';

class Home extends Component {
    componentDidMount(){
        this.props.getScreams()
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

Home.propTypes ={
    getScreams: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    data: state.data
})



export default connect(mapStateToProps,{getScreams, unlikeScream})(Home);