const userList = (state = [], action) => {
    if (action.type === 'SET_USER_LIST') {
        return action.payload;
    }
    if (action.type === 'UNSET_USER') {
        return [];
    }
    return state;
}

export default userList;