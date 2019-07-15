import {SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM,SET_ERRORS, DELETE_SCREAM, POST_SCREAM} from '../types';


const jsonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const getScreams = ()=> (dispatch)=>{
    let resStatus = 0
    fetch('/scream',
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

export const unlikeScream = (screamId)=>(dispatch)=>{
    let resStatus = 0
    fetch(`/scream/${screamId}/unlike`,
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
    fetch(`/scream/${screamId}/like`,
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
    fetch(`/scream/${screamId}`,
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
            console.error(err);
        });
}

export const postScream = (scream)=>(dispatch)=>{
    let resStatus = 0
    fetch('/scream',
        {
            headers:{
                ...jsonHeaders,
                'Authorization': localStorage.getItem('FBIdToken')
            },
            method: 'POST'
        })
        .then(res=>{
            resStatus = res.status;   
            return res.json()})
        .then(data=>{
            if (resStatus >= 400){
                throw JSON.stringify(data);
            }
            dispatch({type: POST_SCREAM, payload: data});
        })
        .catch(err=> {
            console.error(err);
        });
}