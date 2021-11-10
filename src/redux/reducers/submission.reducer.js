import { combineReducers } from 'redux';

const submission = ( state = [], action ) => {
    switch(action.type){
        case 'ADD_SUBMISSION':
            return [...state, action.payload ];
        default:
            return state;
    }
}


export default combineReducers({
    submission,
});