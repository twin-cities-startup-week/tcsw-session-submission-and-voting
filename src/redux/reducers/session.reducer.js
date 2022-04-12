import { combineReducers } from 'redux';

const adminAwaitingApproval = (state = [], action) => {
    switch (action.type) {
        case 'SET_SESSIONS_AWAITING_APPROVAL':
            return action.payload;
        default:
            return state;
    }
}

// Admins see more session details than regular users, store that
// data in a separate array.
const adminApprovedSessions = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_APPROVED_SESSIONS':
            return action.payload;
        default:
            return state;
    }
}

// Users see less detail than admins, store in a seprate array
const approvedSessions = (state = [], action) => {
    switch (action.type) {
        case 'SET_APPROVED_SESSIONS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    adminAwaitingApproval,
    adminApprovedSessions,
    approvedSessions,
});