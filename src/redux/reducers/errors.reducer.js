import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return "Oops! The username and password didn't match. Try again!";
    case 'LOGIN_FAILED_NO_CODE':
      return 'Unable to find an account matching that username and password. If the problem persists, please reach out to tcsw@beta.mn so that we can help.';
    case 'PASSWORD_RESET_FAILED':
      return "Oops! The username and email didn't match. Try again!";
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'REGISTRATION_FAILED':
      return "Oh no! Something went wrong. If the problem persists, please reach out to tcsw@beta.mn so that we can help.";
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});
