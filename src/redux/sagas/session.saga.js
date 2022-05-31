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
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
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
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
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
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
            },
        });
    }
}

function* fetchLeaderboard(action) {
    try {
        const submissions = yield axios.get('/api/submission/leaderboard', { params: action.payload });
        yield put({ type: 'SET_LEADERBOARD', payload: submissions.data });
        if (action.onComplete) {
            action.onComplete();
        }
    } catch (error) {
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
            },
        });
    }
}

function* voteForSession(action) {
    try {
        yield axios.put(`/api/submission/vote/${action.payload}`);
        yield put({ type: 'FETCH_SUBMISSION_DETAILS', payload: { id: action.payload } });
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
            yield put({
                type: 'SET_GLOBAL_MODAL',
                payload: {
                    modalOpen: true,
                    title: `You've already voted for this session`,
                    body: 'You are only allowed to vote one time per session.',
                },
            });
        } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            yield put({
                type: 'SET_GLOBAL_MODAL',
                payload: {
                    modalOpen: true,
                    title: `You must be logged in to vote`,
                    body: 'Please click the sign in button to sign in with Google or to register for an account.',
                },
            });
        } else {
            yield put({
                type: 'SET_GLOBAL_MODAL',
                payload: {
                    modalOpen: true,
                    title: 'Oh no! Something went wrong.',
                    body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
                },
            });
        }

    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_SESSIONS_AWAITING_APPROVAL', fetchAwaitingApproval);
    yield takeLatest('FETCH_ADMIN_APPROVED_SESSIONS', fetchAdminApprovedSessions);
    yield takeLatest('FETCH_APPROVED_SESSIONS', fetchApprovedSessions);
    yield takeLatest('FETCH_LEADERBOARD', fetchLeaderboard);
    yield takeLatest('VOTE_FOR_SESSION', voteForSession);
}

export default sessionSaga;