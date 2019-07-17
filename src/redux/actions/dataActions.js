import {SET_SCREAMS,        
        SET_SCREAM, 
        LIKE_SCREAM,
        UNLIKE_SCREAM,
        SET_ERRORS, 
        DELETE_SCREAM, 
        POST_SCREAM, 
        LOADING_UI, 
        CLEAR_ERRORS, 
        STOP_LOADING_UI,
        SET_COMMENT,
        MARK_NOTIFICATION_AS_READ} from '../types';

import {BASE_API_URL} from '../../util/config';

const jsonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const getScreams = ()=> (dispatch)=>{
    let resStatus = 0
    fetch(`${BASE_API_URL}/scream`,
        {
            headers:{
                ...jsonHeaders,
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
            dispatch({type: SET_SCREAMS, payload: data});
        })
        .catch(err=> {
            console.error(err);
            dispatch({type: SET_ERRORS, payload: err})
            dispatch({type: SET_SCREAMS, payload: []})
        });
};

export const getScream = (screamId)=> (dispatch)=>{
    let resStatus = 0
    dispatch({type: LOADING_UI});
    fetch(`${BASE_API_URL}/scream/${screamId}`,
        {
            headers:{
                ...jsonHeaders,
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
            dispatch({type: SET_SCREAM, payload: data});
            dispatch({type: STOP_LOADING_UI});
        })
        .catch(err=> {
            console.error(err);
            dispatch({type: SET_ERRORS, payload: err})
            dispatch({type: SET_SCREAM, payload: {}})
        });
};

export const unlikeScream = (screamId)=>(dispatch)=>{
    let resStatus = 0
    fetch(`${BASE_API_URL}/scream/${screamId}/unlike`,
        {
            headers:{
                ...jsonHeaders,
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
            dispatch({type: UNLIKE_SCREAM, payload: data});
        })
        .catch(err=> {
            console.error(err);
        });
}


export const likeScream = (screamId)=>(dispatch)=>{
    let resStatus = 0
    fetch(`${BASE_API_URL}/scream/${screamId}/like`,
        {
            headers:{
                ...jsonHeaders,
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
            dispatch({type: LIKE_SCREAM, payload: data});
        })
        .catch(err=> {
            console.error(err);
        });
}


export const deleteScream = (screamId)=>(dispatch)=>{
    let resStatus = 0
    fetch(`${BASE_API_URL}/scream/${screamId}`,
        {
            headers:{
                ...jsonHeaders,
                'Authorization': localStorage.getItem('FBIdToken')
            },
            method: 'DELETE'
        })
        .then(res=>{
            resStatus = res.status;   
            return res.json()})
        .then(data=>{
            if (resStatus >= 400){
                throw JSON.stringify(data);
            }
            dispatch({type: DELETE_SCREAM, payload: data});
        })
        .catch(err=> {
            dispatch({type: SET_ERRORS, payload: err});
            console.error(err);
        });
}

export const postScream = (scream)=>(dispatch)=>{
    let resStatus = 0;
    dispatch({type: LOADING_UI});
    fetch(`${BASE_API_URL}/scream`,
        {
            headers:{
                ...jsonHeaders,
                'Authorization': localStorage.getItem('FBIdToken')
            },
            method: 'POST',
            body: JSON.stringify(scream) 
        })
        .then(res=>{
            resStatus = res.status;   
            return res.json()})
        .then(data=>{
            if (resStatus >= 400){
                throw JSON.stringify(data);
            }
            dispatch({type: CLEAR_ERRORS, payload: data});
            dispatch({type: POST_SCREAM, payload: data});
        })
        .catch(err=> {
            dispatch({type: SET_ERRORS, payload: err})
            console.error(err);
        });
}

export const postComment = (screamId,comment)=> (dispatch)=>{
    let resStatus = 0;
    dispatch({type: LOADING_UI});
    fetch(`${BASE_API_URL}/scream/${screamId}/comment`,
        {
            headers:{
                ...jsonHeaders,
                'Authorization': localStorage.getItem('FBIdToken')
            },
            method: 'POST',
            body: JSON.stringify(comment) 
        })
        .then(res=>{
            resStatus = res.status;   
            return res.json()})
        .then(data=>{
            if (resStatus >= 400){
                throw JSON.stringify(data);
            }
            
            dispatch({type: SET_COMMENT, payload: data});
            dispatch({type: STOP_LOADING_UI});
        })
        .catch(err=> {
            dispatch({type: SET_ERRORS, payload: err})
            console.error(err);
        });
}

export const markNotificationAsRead = (notificationId)=>(dispatch)=>{
    let resStatus = 0;
    dispatch({type: LOADING_UI});
    fetch(`${BASE_API_URL}/notifications`,
        {
            headers:{
                ...jsonHeaders,
                'Authorization': localStorage.getItem('FBIdToken')
            },
            method: 'POST',
            body: JSON.stringify([notificationId]) 
        })
        .then(res=>{
            resStatus = res.status;   
            return res.json()})
        .then(data=>{
            if (resStatus >= 400){
                throw JSON.stringify(data);
            }
            dispatch({type: MARK_NOTIFICATION_AS_READ, payload: notificationId});
        })
        .catch(err=> {
            dispatch({type: SET_ERRORS, payload: err})
            console.error(err);
        });
}
