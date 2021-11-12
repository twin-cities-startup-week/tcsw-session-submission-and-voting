const setSessionList = (state = [], action) => {
    if (action.type === 'SET_SESSION'){
        return action.payload;
    }
    return state;
}


export default setSessionList;