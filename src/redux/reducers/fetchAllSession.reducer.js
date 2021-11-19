const setAllSession = (state = [], action) => {
    if (action.type === 'SET_ALL_SESSION'){
        return action.payload;
    }
    return state;
}


export default setAllSession;