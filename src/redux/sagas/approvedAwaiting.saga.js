import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//admin Saga: will be fired on 'FETCH_AWAITING_APPROVAL'
function* fetchAwaitingApproval(action){

    console.log('LET ME KNOW WHAT IS THIS PLEASE')
    try{
        const response = yield axios.get(`/api/session/awaitingApproval`)
        console.log('This is FETCH_AWAITING_APPROVAL response', response.data)
        yield put({type: 'SET_AWAITING_APPROVAL', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}


function* approvedAwaitingSaga (){
    yield takeLatest('FETCH_AWAITING_APPROVAL', fetchAwaitingApproval);

}


export default approvedAwaitingSaga;