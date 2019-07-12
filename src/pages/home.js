import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';

class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount(){
        let resStatus = 0
        fetch('/scream',
            {
                headers:{
                    'Authorization': localStorage.getItem('FBIdToken')
                }
            })
            .then(res=>{
                resStatus = res.status;   
                return res.json()})
            .then(data=>{
                if (resStatus >= 400){
                    throw JSON.stringify(data);
                }
                this.setState({
                    screams: data
                });
            })
            .catch(err=> {
                console.error(err);
            });
    }


    render(){
        let recentScreamMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>  )
        ) : <p>Loading...</p>

        return(
            <Grid container>

                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        );
    }
}

export default Home;