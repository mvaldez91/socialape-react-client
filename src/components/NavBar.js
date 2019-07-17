import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';

import CustomButtom from '../util/CustomButton';
import PostScream from '../components/PostScream';
import Notifications from '../components/Notifications';

class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar >
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream></PostScream>
                          
                            <Link to="/">
                                <CustomButtom tip="Home">
                                    <HomeIcon color="primary"></HomeIcon>
                                </CustomButtom>
                            </Link>
                            {/* <CustomButtom tip="Notifications">
                                <NotificationIcon color="primary"></NotificationIcon>
                            </CustomButtom> */}
                              <Notifications></Notifications>
                        </Fragment>

                    ) :
                        <Fragment>
                            <Button color="inherit" component={Link} to='/login'>Login</Button>
                            <Button color="inherit" component={Link} to='/'>Home</Button>
                            <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                        </Fragment>
                    }

                </Toolbar>
            </AppBar>
        );
    }
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);