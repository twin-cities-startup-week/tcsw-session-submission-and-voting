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
    diversity: false,
    speakers: '',
    covid: false,
    media: '',
    purpose: '',
    image: '',
    success: '',
    excited: '',
    other_hosts: '',
    other_info: '',
}

const getArray = (value) => {
    let result = [];
    if (typeof value === 'string') {
        result = JSON.parse(value);
    } else if (Array.isArray(value)) {
        result = value;
    }
    return result;
}

const editSubmission = (state = blankSubmission, action ) => {
    let result;
    switch (action.type) {
        case 'SET_EDITING_SUBMISSION':
            result = {
                ...action.payload,
                industry: getArray(action.payload.industry),
                time: getArray(action.payload.time),
                date: getArray(action.payload.date),
            }
            return result;
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