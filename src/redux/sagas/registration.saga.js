import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    if (action.onSuccess) {
      action.onSuccess();
    }
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
  } catch (error) {
    yield put({ type: 'REGISTRATION_FAILED' });
    if (action.onFailure) {
      action.onFailure(error.response.data || 'Please reach out to tcsw@beta.mn so that we can help.');
    }
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
