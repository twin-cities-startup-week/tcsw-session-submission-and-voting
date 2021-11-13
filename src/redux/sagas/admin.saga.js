import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//admin Saga: will be fired on 'FETCH_SESSION'
function* fetchSession(){
    try{
        const response = yield axios.get('/api/session/total')
        console.log('This is FETCHSESSION response', response.data)
        yield put({type: 'SET_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}



//admin Saga: will be fired on 'FETCH_AWAITING_APPROVAL'
function* fetchAwaitingApproval(){
    try{
        const response = yield axios.get('/api/session/awaitingApproval')
        console.log('This is FETCH_AWAITING_APPROVAL response', response.data)
        yield put({type: 'SET_AWAITING_APPROVAL', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}



function* sessionSaga (){
    yield takeLatest('FETCH_SESSION', fetchSession);
    yield takeLatest('FETCH_AWAITING_APPROVAL', fetchAwaitingApproval);

}


export default sessionSaga;