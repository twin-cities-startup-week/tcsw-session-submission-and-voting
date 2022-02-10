import { combineReducers } from 'redux';

const block = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CONTENT_BLOCK':
            return action.payload;
        default:
            return state;
    }
}

const faq = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAQ':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    block,
    faq,
});