const setApprovalAwaitingInfo = (state = [], action) => {
    switch(action.type){
        case 'SET_APPROVAL_AWAITING_INFO':
            return action.payload;
        default: 
            return state;
    }
}


export default setApprovalAwaitingInfo;