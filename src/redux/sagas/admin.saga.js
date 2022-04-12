import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllContent() {
    try {
        const response = yield axios.get(`/api/content/block`);
        yield put({ type: 'SET_CONTENT_BLOCKS', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* sendContent(action) {
    try {
        yield axios.post('/api/content/block', action.payload);
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* approveSession(action) {
    const sessionId = action.payload;

    try {
        yield axios.put(`/api/admin/approve/${sessionId}`)
    } catch (error) {
        console.log('error in admin approve PUT', error);

    }
}

function* denySession(action) {
    const sessionId = action.payload;

    try {
        yield axios.put(`/api/admin/deny/${sessionId}`)
    } catch (error) {
        console.log('error in admin approve PUT', error);

    }
}

function* deleteSession(action) {
    const sessionId = action.payload;

    try {
        yield axios.delete(`/api/admin/delete/${sessionId}`)
    } catch (error) {
        console.log('error in admin DELETE', error);

    }
}

function* fetchUserList() {
    try {
        const response = yield axios.get(`/api/admin/user/list`);
        yield put({ type: 'SET_USER_LIST', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_CONTENT_BLOCKS', fetchAllContent);
    yield takeLatest('SEND_CONTENT_BLOCK', sendContent);
    yield takeLatest('APPROVE_SESSION', approveSession);
    yield takeLatest('DENY_SESSION', denySession);
    yield takeLatest('DELETE_SESSION', deleteSession);
    yield takeLatest('FETCH_USER_LIST', fetchUserList);
}


export default sessionSaga;