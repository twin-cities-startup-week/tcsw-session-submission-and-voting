const setApprovedInfo = (state = [], action) => {
    switch(action.type){
        case 'SET_APPROVED_INFO':
            return action.payload;
        default: 
            return state;
    }
}


export default setApprovedInfo;