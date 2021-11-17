const setSessionList = (state = [], action) => {
    switch(action.type){
        case 'SET_SESSION':
            return action.payload;
        default: 
            return state;
    }
}


export default setSessionList;