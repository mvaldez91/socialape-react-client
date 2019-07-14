import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED,LOADING_USER } from '../types';

const jsonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const loginUser = (userData, history) => (dispatch) => {
    let resStatus = 0;
    dispatch({ type: LOADING_UI });
    fetch('/login', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(userData)
    })
        .then(res => {
            resStatus = res.status;
            return res.json()
        })
        .then(data => {
            if (resStatus >= 400) {
                throw JSON.stringify(data);
            }
            localStorage.setItem('FBIdToken', `Bearer ${data.token}`);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
           
        }).catch(err => {
            console.error(err)
            dispatch({
                type: SET_ERRORS,
                payload: JSON.parse(err)
            });
        })
}


export const signupUser = (userData,history) => (dispatch) => {
    let resStatus = 0;
    dispatch({ type: LOADING_UI });
    fetch('/signup', {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(userData)
    })
        .then(res => {
            resStatus = res.status;
            return res.json()
        })
        .then(data => {
            if (resStatus >= 400) {
                throw JSON.stringify(data);
            }
            localStorage.setItem('FBIdToken', `Bearer ${data.token}`);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/')
        }).catch(err => {
            console.error(err)
            dispatch({
                type: SET_ERRORS,
                payload: JSON.parse(err)
            });
        })
}


export const getUserData = () => (dispatch) => {
    dispatch({type:LOADING_USER});
    let resStatus = 0;
    fetch('/user', {
        method: 'GET',
        headers: {
          ...jsonHeaders,
            "Authorization": localStorage.FBIdToken
        }
    })
        .then(res => {
            resStatus = res.status;
            return res.json()
        })
        .then(data => {
            if (resStatus >= 400) {
                throw JSON.stringify(data);
            }
            dispatch({
                type: SET_USER,
                payload: data
            })
        }).catch(err => {
            console.error(err)
            dispatch({ type: SET_ERRORS, payload: JSON.parse(err) });
        })
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type:LOADING_USER});
    let resStatus = 0;

    fetch('/user/image', {
        method: 'POST',
        headers: {
            "Authorization": localStorage.FBIdToken
        },
        body: formData
    })
        .then(res => {
            resStatus = res.status;
            return res.json();
        })
        .then(data => {
            if (resStatus >= 400) {
                throw JSON.stringify(data);
            }
            dispatch(getUserData())
        }).catch(err => {
            console.error(err)
            dispatch({ type: SET_ERRORS, payload: JSON.parse(err) });
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    let resStatus = 0;
    dispatch({ type: LOADING_USER });
    fetch('/user', {
        method: 'POST',
        headers: {
            ...jsonHeaders, 
            "Authorization": localStorage.FBIdToken
        },
        body: JSON.stringify(userDetails)
    })
        .then(res => {
            resStatus = res.status;
            return res.json()
        })
        .then(data => {
            if (resStatus >= 400) {
                throw JSON.stringify(data);
            }
            dispatch(getUserData());
        }).catch(err => {
            console.error(err)
            dispatch({
                type: SET_ERRORS,
                payload: JSON.parse(err)
            });
        })
}


export const logoutUser = ()=> (dispatch)=>{
    localStorage.removeItem('FBIdToken');
    dispatch({type: SET_UNAUTHENTICATED});
};

// const setAuthorizationHeader = (token)=>{
//     const FBIdToken = `Bearer {$}`
// };