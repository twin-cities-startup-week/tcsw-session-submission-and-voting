const addVoteReducer = ( state = [], action ) => {
    switch( action.type ) {
        case 'SET_VOTE_COUNT':
            return action.payload;
        default:
            return state;
    }
}

export default addVoteReducer;