import { SET_SCREAMS, 
         SET_SCREAM, 
         LIKE_SCREAM,
         UNLIKE_SCREAM, 
         LOADING_DATA, 
         DELETE_SCREAM, 
         POST_SCREAM,
         SET_COMMENT } from '../types';

const initialState ={
    screams: [],
    scream:{},
    loading: false
};

export default (state= initialState, action)=>{
    let index = 0;
    switch(action.type)
    {
        case LOADING_DATA:
          return {
            ...state,
            loading:true
          }
        case SET_SCREAMS:
          return {
            ...state,
            screams: action.payload,
            loading: false
          }
        case SET_SCREAM:
          return {
            ...state,
            scream: action.payload
          }
        case POST_SCREAM:
              return {
                ...state,
                screams:[
                  action.payload,
                  ...state.screams
                ]
              }    
        case UNLIKE_SCREAM:
        case LIKE_SCREAM:
          index = state.screams.findIndex(scream=> scream.screamId === action.payload.screamId);
          state.screams[index] = action.payload;
 
          return {
            ...state
          }
        case DELETE_SCREAM:
             index = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(index,1);
            return {
              ...state
            }  
        case SET_COMMENT: 
            return {
              ...state,
              scream: {
                ...state.scream,
                comments: [
                  action.payload,
                  ...state.scream.comments
                ]
              }
            }          
        default:
          return {
            ...state
          }
    }
}
