import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//admin Saga: will be fired on 'FETCH_AWAITING_APPROVAL'
function* fetchApprovedInfo(){

    console.log('LET ME KNOW HOW TO SOLVE THIS PLEASE')
    try{
        const response = yield axios.get(`/api/session/approvedList`)
        console.log('This is FETCH_APPROVED_INFO response', response.data)
        yield put({type: 'SET_APPROVED_INFO', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error );
    }
}


function* approvedInfoSaga (){
    yield takeLatest('FETCH_APPROVED_INFO', fetchApprovedInfo);

}


export default approvedInfoSaga;