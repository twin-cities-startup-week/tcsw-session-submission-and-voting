import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchApprovalAwaitingInfo(){
    try{
        const response = yield axios.get(`/api/session/awaitingApprovalList`)
        yield put({type: 'SET_APPROVAL_AWAITING_INFO', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}

function* fetchAwaitingApproval(action){
    try{
        const response = yield axios.get(`/api/session/awaitingApproval`)
        yield put({type: 'SET_AWAITING_APPROVAL', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}

function* fetchSession(){
    try{
        const response = yield axios.get('/api/session')
        yield put({type: 'SET_ALL_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}

function* fetchHighestVoting(){
    try{
        const response = yield axios.get(`/api/session/sessionsVotes`)
        yield put({type: 'SET_HIGHEST_VOTING', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}


function* sessionSaga (){
    yield takeLatest('FETCH_SESSION', fetchSession);
    yield takeLatest('FETCH_AWAITING_APPROVAL', fetchAwaitingApproval);
    yield takeLatest('FETCH_APPROVAL_AWAITING_INFO', fetchApprovalAwaitingInfo);
    yield takeLatest('FETCH_HIGHEST_VOTING', fetchHighestVoting);
}

export default sessionSaga;