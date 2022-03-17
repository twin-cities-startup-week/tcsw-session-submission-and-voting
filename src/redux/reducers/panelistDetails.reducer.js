
const getArray = (value) => {
    let result = [];
    if (typeof value === 'string') {
        result = JSON.parse(value);
    } else if (Array.isArray(value)) {
        result = value;
    }
    return result;
}

const panelistDetailsReducer = ( state = {}, action ) => {
    let result;
    switch( action.type ) {
        case 'SET_PANEL_DETAILS':
            result = {
                ...action.payload,
                industry: getArray(action.payload.industry),
                time: getArray(action.payload.time),
                date: getArray(action.payload.date),
            }
            return result;
        default:
            return state;
    }
}
            
export default panelistDetailsReducer;