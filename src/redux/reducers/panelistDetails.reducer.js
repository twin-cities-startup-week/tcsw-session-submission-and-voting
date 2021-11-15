
const panelistDetailsReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'SET_PANEL_DETAILS':
            return action.payload
        default:
            return state;
    }
}
            
export default panelistDetailsReducer;