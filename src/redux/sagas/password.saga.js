import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* resetPassword (action) {
    try {
        const userInfo = action.payload;
        console.log('userInfo - ', userInfo );

        yield axios.put('/api/user/reset', userInfo);
    } catch (error) {
        console.log('Error in resetting password.', error)
    }
}

function* passwordSaga () {
    yield takeLatest('RESET_PASSWORD', resetPassword)
}

export default passwordSaga;