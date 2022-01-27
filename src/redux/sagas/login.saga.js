import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('/api/user/login', action.payload, config);

    // after the user has logged in
    // get the user information from the server
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}


// Change password for a logged in user
function* changePassword(action) {
  try {
    yield put({ type: 'SET_SAVE_MODAL_OPEN', payload: { modalOpen: true } });
    yield axios.put('api/user/password/change', action.payload);
    yield delay(250);
  } catch (error) {
    yield put({ type: 'SET_ERROR', payload: error });
    yield put({ type: 'SET_ERROR_MODAL', payload: { modalOpen: true } });
  } finally {
    // Hide the loading indicator
    yield put({ type: 'SET_SAVE_MODAL_OPEN', payload: { modalOpen: false } });
  }
}

function* requestPasswordReset(action) {
  try {
    yield put({ type: 'SET_SAVE_MODAL_OPEN', payload: { modalOpen: true } });
    yield axios.put('api/user/password/reset', action.payload);
    yield delay(250);
    yield put({
      type: 'SET_GLOBAL_MODAL',
      payload: {
        modalOpen: true,
        title: 'Email Sent',
        body: 'Please check your email for a reset password link.',
      },
    });
  } catch (error) {
    yield put({ type: 'SET_ERROR', payload: error });
    yield put({ type: 'SET_ERROR_MODAL', payload: { modalOpen: true } });
  } finally {
    // Hide the loading indicator
    yield put({ type: 'SET_SAVE_MODAL_OPEN', payload: { modalOpen: false } });
  }
}

// Set new password for a user with a reset token (used when user selected forgot password)
function* setNewPassword(action) {
  try {
    yield axios.put('api/user/password/new', action.payload);
    window.location.href = '/#/login';
  } catch (error) {
    yield put({ type: 'SET_ERROR', payload: error });
    yield put({ type: 'SET_ERROR_MODAL', payload: { modalOpen: true } });
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
  yield takeLatest('REQUEST_PASSWORD_RESET', requestPasswordReset);
  yield takeLatest('SET_NEW_PASSWORD', setNewPassword);
  yield takeLatest('CHANGE_PASSWORD', changePassword);
}

export default loginSaga;
