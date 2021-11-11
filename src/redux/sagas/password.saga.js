import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* resetPassword () {
    try {
        const response = yield axios.put('/api/user/resetpassword', config);
        yield put({ type: 'SET_NEW_PASSWORD', payload: response.data })
    } catch (error) {
        console.log('Error in resetting password.', error)
    }
}

function* passwordSaga () {
    yield takeLatest('RESET_PASSWORD', resetPassword)
}

export default passwordSaga;