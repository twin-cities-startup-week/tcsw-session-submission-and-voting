const setAwaitingApproval = (state = [], action) => {
 if (action.type === 'SET_AWAITING_APPROVAL'){
    return action.payload;
}
    return state;
}


export default setAwaitingApproval;
