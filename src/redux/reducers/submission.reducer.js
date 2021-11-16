import { combineReducers } from 'redux';

const submission = ( state = [], action ) => {
    switch(action.type){
        case 'ADD_SUBMISSION':
            return [...state, action.payload ];
        case 'CLEAR_INPUTS':
            return '';
        default:
            return state;
    }
}

const approvedSubmissions = ( state = [], action ) => {
    switch( action.type ) {
        case 'SET_APPROVED_SUBMISSIONS':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    submission,
    approvedSubmissions,
});