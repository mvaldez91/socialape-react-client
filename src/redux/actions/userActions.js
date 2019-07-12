import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';

export const loginUser = (userData) => (dispatch) => {
    let resStatus = 0;
    dispatch({ type: LOADING_UI });
    fetch('/login', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
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
            this.props.history.push('/')
        }).catch(err => {
            console.error(err)
            dispatch({
                type: SET_ERRORS,
                payload: JSON.parse(err)
            });
        })
}


export const signupUser = (userData) => (dispatch) => {
    let resStatus = 0;
    dispatch({ type: LOADING_UI });
    fetch('/signup', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
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
            this.props.history.push('/')
        }).catch(err => {
            console.error(err)
            dispatch({
                type: SET_ERRORS,
                payload: JSON.parse(err)
            });
        })
}


export const getUserData = () => (dispatch) => {
    let resStatus = 0;
    fetch('/user', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
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

export const logoutUser = ()=> (dispatch)=>{
    localStorage.removeItem('FBIdToken');
    dispatch({type: SET_UNAUTHENTICATED});
};

// const setAuthorizationHeader = (token)=>{
//     const FBIdToken = `Bearer {$}`
// };