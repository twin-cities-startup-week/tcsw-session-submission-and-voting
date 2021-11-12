
const panelistReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'PLACE_PANELIST':
            return action.payload;
        case 'SET_PANEL_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default panelistReducer;