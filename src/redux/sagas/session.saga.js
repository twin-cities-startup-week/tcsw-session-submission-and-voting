import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchApprovalAwaitingInfo(){
    try{
        const response = yield axios.get(`/api/admin/awaitingApprovalList`)
        yield put({type: 'SET_APPROVAL_AWAITING_INFO', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}

function* fetchAwaitingApproval(action){
    try{
        const response = yield axios.get(`/api/admin/awaitingApproval`)
        yield put({type: 'SET_AWAITING_APPROVAL', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}

function* fetchSession(){
    try{
        const response = yield axios.get('/api/admin')
        yield put({type: 'SET_ALL_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_SESSION', fetchSession);
    yield takeLatest('FETCH_AWAITING_APPROVAL', fetchAwaitingApproval);
    yield takeLatest('FETCH_APPROVAL_AWAITING_INFO', fetchApprovalAwaitingInfo);
}

export default sessionSaga;