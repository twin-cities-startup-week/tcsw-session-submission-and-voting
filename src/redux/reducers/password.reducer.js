const passwordReducer = (state = {}, action) => {
    switch (action.type) {
      case 'RESET_PASSWORD':
        return action.payload;
      default:
        return state;
    }
  };

export default passwordReducer;