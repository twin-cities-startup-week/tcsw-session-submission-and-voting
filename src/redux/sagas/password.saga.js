import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* resetPassword (action) {
    try {
        const userInfo = action.payload;
        console.log('userInfo - ', userInfo );

        yield axios.put('/api/user/reset', userInfo);
        yield put({ type: 'FETCH_USER' })
    } catch (error) {
        console.log('Error in resetting password.', error)
        if ( error.response.status === 401 ) {
            yield put({ type: 'PASSWORD_RESET_FAILED' });
        }
    }
}

function* passwordSaga () {
    yield takeLatest('RESET_PASSWORD', resetPassword)
}

export default passwordSaga;