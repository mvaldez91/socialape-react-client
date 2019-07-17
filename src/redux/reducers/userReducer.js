import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    UNLIKE_SCREAM,
    LIKE_SCREAM,
    SET_USER_DETAILS,
    MARK_NOTIFICATION_AS_READ
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    loading: false,
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            let userLikeIdx = 0;
            userLikeIdx = state.likes.findIndex(like => like.screamId === action.payload.screamId);
            state.likes.splice(userLikeIdx, 1);
            return {
                ...state
            }
        case SET_USER_DETAILS:
            return {
                ...state
            }
        case MARK_NOTIFICATION_AS_READ:
            let notificationIdx = state.notifications.findIndex(notification => notification.notificationId === action.payload)
            state.notifications[notificationIdx].read = true;
            return {
                ...state
            }
        default:
            return state;
    }
}