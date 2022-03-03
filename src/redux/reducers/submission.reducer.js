import { combineReducers } from 'redux';

const blankSubmission = {
    user_id: '',
    email: '',
    phone: '',
    host: '',
    title: '',
    description: '',
    attendees: '',
    location: '',
    location_details: '',
    date: [],
    votes: 0,
    length: '',
    time: [],
    format: '',
    industry: [],
    track: '',
    area_of_interest: '',
    diversity: '',
    speakers: '',
    covid: '',
    media: '',
    purpose: '',
    image: '',
    success: '',
    excited: '',
    other_hosts: '',
    other_info: '',
}

const editSubmission = (state = blankSubmission, action ) => {
    switch (action.type) {
        case 'SET_EDITING_SUBMISSION':
            return action.payload;
        case 'CLEAR_EDITING_SUBMISSION':
            return blankSubmission;
        default:
            return state;
    }
}

const submission = ( state = [], action ) => {
    switch(action.type){
        case 'ADD_SUBMISSION':
            return [...state, action.payload ];
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

const userSubmissions = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_SUBMISSIONS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    submission,
    approvedSubmissions,
    userSubmissions,
    editSubmission,
});