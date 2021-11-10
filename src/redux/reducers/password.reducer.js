const passwordReducer = (state = {}, action) => {
    switch (action.type) {
      case 'RESET_PASSWORD':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default passwordReducer;