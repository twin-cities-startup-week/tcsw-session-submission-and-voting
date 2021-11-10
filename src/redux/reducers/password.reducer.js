const passwordReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_NEW_PASSWORD':
        return action.payload;
      default:
        return state;
    }
  };

export default passwordReducer;