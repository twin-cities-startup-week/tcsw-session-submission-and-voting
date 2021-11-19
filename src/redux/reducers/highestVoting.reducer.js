const setHighestVoting = (state = [], action) => {
    if (action.type === 'SET_HIGHEST_VOTING'){
        return action.payload;
    }
    return state;
}


export default setHighestVoting;