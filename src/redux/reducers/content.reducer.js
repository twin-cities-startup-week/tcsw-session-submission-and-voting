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
    const result = [ ...state ];
    switch (action.type) {
        case 'SET_FAQS':
            result.length = 0
            for(let item of action.payload) {
                result.push( {
                    id: item.id,
                    question: item.question,
                    answer: item.answer,
                })
            }
            return result;
        case 'SET_FAQ_Q':
            result[action.payload.index] = {
                question: action.payload.question,
            }
            return result;
        case 'SET_FAQ_A':
            result[action.payload.index] = {
                answer: action.payload.answer,
            }
            return result;
            case 'SET_FAQ':
                result[action.payload.index] = {
                    id: action.payload.id,
                    question: action.payload.question,
                    answer: action.payload.answer,
                }
                return result;
        default:
            return state;
    }
    // switch (action.type) {
    //     case 'SET_FAQ':
    //         return action.payload;
    //     default:
    //         return state;
    // }
}

export default combineReducers({
    block,
    faq,
});