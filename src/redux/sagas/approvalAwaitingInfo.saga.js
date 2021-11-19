import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//admin Saga: will be fired on 'FETCH_AWAITING_APPROVAL'
function* fetchApprovalAwaitingInfo(){

    console.log('LET ME KNOW WHAT THIS SAGA IS. I NEED HELP PLEASE')
    try{
        const response = yield axios.get(`/api/session`)
        console.log('This is FETCH_APPROVAL_AWAITING_INFO response', response.data)
        yield put({type: 'SET_APPROVAL_AWAITING_INFO', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}


function* approvalAwaitingInfoSaga (){
    yield takeLatest('FETCH_APPROVAL_AWAITING_INFO', fetchApprovalAwaitingInfo);

}


export default approvalAwaitingInfoSaga;