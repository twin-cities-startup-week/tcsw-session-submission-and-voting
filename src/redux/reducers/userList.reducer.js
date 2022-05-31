const userList = (state = [], action) => {
    if (action.type === 'SET_USER_LIST') {
        return action.payload;
    }
    return state;
}

export default userList;