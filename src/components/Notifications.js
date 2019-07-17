import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Mui Stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import CustomButton from '../util/CustomButton';



import dayjs from 'dayjs';
//Redux stuff
import { connect } from 'react-redux';
import { markNotificationAsRead } from '../redux/actions/dataActions';

import { themeStyles } from '../themes';
const styles = (theme) => ({
    ...themeStyles,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
});

class Notifications extends Component {
    state = {
        anchorEl: null,
        errors: {}
    };
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }
    handleClose = () => {
        this.setState({ anchorEl: null, errors: {} })
    }
    handleClickItem =(event, notification)=> {
        this.setState({ anchorEl: null, errors: {} })
        this.props.markNotificationAsRead(notification.notificationId);
        //alert(notification.type);
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.handleClose();
        }
    }

    render() {

        const { anchorEl} = this.state;
        const { notifications } = this.props;
        const likedNotification = ({ createdAt, sender }) => (
            <a>
                <FavoriteIcon color="primary"></FavoriteIcon> {'  '}
                {sender} liked your scream {dayjs(createdAt).fromNow()}
            </a>);
        const commentNotification = ({ createdAt, sender }) => (
            <a>
                <ChatIcon color="primary"></ChatIcon>{'  '}
                {sender} comment your scream {dayjs(createdAt).fromNow()}
            </a>);

        return (
            <Fragment>
                <CustomButton tip="Notifications" onClick={this.handleOpen}>
                    <NotificationIcon color="primary"></NotificationIcon>
                </CustomButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    {
                        notifications.map((notification, idx) => {
                            let childrenData = null;
                            if (notification.read){
                                return childrenData;
                            }
                            if (notification.type === 'like') {
                                childrenData = likedNotification(notification);
                            }
                            if (notification.type === 'comment') {
                                childrenData = commentNotification(notification);
                            }

                            return <MenuItem onClick={(event)=>{
                                this.handleClickItem(event, notification);
                            }} key={`${notification.screamId}-not${idx}`}>
                                            {childrenData}
                                </MenuItem>
                        })
                    }
                </Menu>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    UI: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    markNotificationAsRead: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationAsRead
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Notifications))