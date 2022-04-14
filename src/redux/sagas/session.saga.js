import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* fetchAwaitingApproval(action){
    try{
        const response = yield axios.get(`/api/admin/pending/sessions`)
        yield put({ type: 'SET_SESSIONS_AWAITING_APPROVAL', payload: response.data })
    }catch(error){
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to hello@beta.mn so that we can help.',
            },
        });
    }
}

function* fetchAdminApprovedSessions(){
    try{
        const response = yield axios.get('/api/admin/approved/sessions')
        yield put({type: 'SET_ADMIN_APPROVED_SESSIONS', payload: response.data})
    }catch(error){
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to hello@beta.mn so that we can help.',
            },
        });
    }
}

function* fetchApprovedSessions(action) {
    try {
        const submissions = yield axios.get('/api/submission/approved', { params: action.payload });
        yield delay(300);
        yield put({ type: 'SET_APPROVED_SESSIONS', payload: submissions.data });
        if (action.onComplete) {
            action.onComplete();
        }
    } catch (error) {
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to hello@beta.mn so that we can help.',
            },
        });
    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_SESSIONS_AWAITING_APPROVAL', fetchAwaitingApproval);
    yield takeLatest('FETCH_ADMIN_APPROVED_SESSIONS', fetchAdminApprovedSessions);
    yield takeLatest('FETCH_APPROVED_SESSIONS', fetchApprovedSessions);
}

export default sessionSaga;