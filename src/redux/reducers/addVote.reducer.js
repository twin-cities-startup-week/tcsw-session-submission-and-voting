const addVoteReducer = ( state = 0, action ) => {
    switch( action.type ) {
        case 'SET_VOTE_COUNT':
            return state + 1;
        default:
            return state;
    }
}

export default addVoteReducer;