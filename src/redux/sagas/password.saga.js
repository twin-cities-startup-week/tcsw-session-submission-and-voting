import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* resetPassword (action) {
    try {
        const userInfo = action.payload;

        yield axios.put('/api/user/reset', userInfo);
        yield put({ type: 'SET_USER' })
    } catch (error) {
        console.log('Error in resetting password.', error)
    }
}

function* passwordSaga () {
    yield takeLatest('RESET_PASSWORD', resetPassword)
}

export default passwordSaga;