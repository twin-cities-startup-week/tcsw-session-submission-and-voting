import { combineReducers } from 'redux';

// Modal that appears when the server returns an error code
const modalOpen = (state = false, action) => {
    switch (action.type) {
        case 'SET_SAVE_MODAL_OPEN':
            return action.payload.modalOpen;
        default:
            return state;
    }
};

const globalModal = (state = { modalOpen: false, title: '', body: '' }, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_MODAL':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    modalOpen,
    globalModal,
});
