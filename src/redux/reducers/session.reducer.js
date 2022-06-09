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
        case 'SET_VOTE_FOR_SESSION_IN_LIST':
            let sessionListCopy = [...state];
            for(let session of sessionListCopy) {
                console.log('session id', session.id, action.payload);
                if (session.id === action.payload) {
                    // This array just needs to contain something to update
                    // the vote button to be filled in. On the next page load, 
                    // it will contain the user_id and time of vote.
                    session.user_votes = ['voted'];
                }
            }
            return sessionListCopy;
        default:
            return state;
    }
}

const searchTerm = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return action.payload;
        case 'CLEAR_SEARCH_FILTERS':
            return '';
        default:
            return state;
    }
}

const searchTrack = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_TRACK':
            return action.payload;
        case 'CLEAR_SEARCH_FILTERS':
            return [];
        default:
            return state;
    }
}

const searchFormat = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_FORMAT':
            return action.payload;
        case 'CLEAR_SEARCH_FILTERS':
            return [];
        default:
            return state;
    }
}

const leaderboard = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEADERBOARD':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    adminAwaitingApproval,
    adminApprovedSessions,
    approvedSessions,
    leaderboard,
    searchTerm,
    searchTrack,
    searchFormat,
});