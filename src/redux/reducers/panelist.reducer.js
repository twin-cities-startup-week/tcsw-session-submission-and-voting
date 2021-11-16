
const panelistReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'PLACE_PANELIST':
            return action.payload;
        default:
            return state;
    }
}

export default panelistReducer;