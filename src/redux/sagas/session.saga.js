import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAwaitingApproval(action){
    try{
        const response = yield axios.get(`/api/admin/pending/sessions`)
        yield put({ type: 'SET_SESSIONS_AWAITING_APPROVAL', payload: response.data })
    }catch(error){
        console.log('Session get request failed', error );
    }
}

function* fetchAdminApprovedSessions(){
    try{
        const response = yield axios.get('/api/admin/approved/sessions')
        yield put({type: 'SET_ADMIN_APPROVED_SESSIONS', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}

function* fetchApprovedSessions() {
    try {
        const submissions = yield axios.get('/api/submission/approved');
        yield put({ type: 'SET_APPROVED_SESSIONS', payload: submissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error);
    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_SESSIONS_AWAITING_APPROVAL', fetchAwaitingApproval);
    yield takeLatest('FETCH_ADMIN_APPROVED_SESSIONS', fetchAdminApprovedSessions);
    yield takeLatest('FETCH_APPROVED_SUBMISSIONS', fetchApprovedSessions);
}

export default sessionSaga;