import { combineReducers } from 'redux';

const block = (state = {}, action) => {
    const result = { ...state };
    switch (action.type) {
        case 'SET_CONTENT_BLOCKS':
            for(let item of action.payload) {
                result[item.name] = item.content;
            }
            return result;
        case 'SET_CONTENT_BLOCK':
            result[action.payload.name] = action.payload.content;
            return result;
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