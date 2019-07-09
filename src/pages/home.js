import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';

class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount(){
        fetch('/scream',
            {
                headers:{
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0MWRlNGY0NTMzNzg5YmRiMjUxYjdhNTgwNTZjNTZmY2VkMjE0MWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3Qtc29jaWFsLW5ldHdvcmstMmU3YWEiLCJhdWQiOiJyZWFjdC1zb2NpYWwtbmV0d29yay0yZTdhYSIsImF1dGhfdGltZSI6MTU2MjY0MDc3OSwidXNlcl9pZCI6Ik1BeVA3UzNNa0RoSWc2T09sZmhyUXpHQzZyazIiLCJzdWIiOiJNQXlQN1MzTWtEaElnNk9PbGZoclF6R0M2cmsyIiwiaWF0IjoxNTYyNjQwNzc5LCJleHAiOjE1NjI2NDQzNzksImVtYWlsIjoibXR1bGlvMTk5MUBsaXZlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtdHVsaW8xOTkxQGxpdmUuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Im2FoYN1zsXyayoJWprvB9VVMlD4JCmAvvUFVob-0Nj6jpIOiNZAtmsDXqCzZQ0sxkWzYsGrfsAdVgY6vWhXwpt3LqEd5hBTJYhgyuOcNqAFCiSwqxAHorD_7VjsLM81gUEO0ZHHPDClvkYkhCxarvefwwGR_SgQJSGAg23DO3LxvSgDoWMrd53c_fBW6cVbsEbYYsfzg4Y9EUtRG2VIKGmnNDwSvWn6aoEL9TMto8iCpbU3NABAugayB7ypJfk8ldzDKoj3sv61Qy5721rIvmfasCzBlcRGsgu5h5itmHdW-9WflTWSwuC55ZoRBj2Bx3alt_w4zZJUzkt_9oqRsA'
                }
            })
            .then(res=>res.json())
            .then(data=>{

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