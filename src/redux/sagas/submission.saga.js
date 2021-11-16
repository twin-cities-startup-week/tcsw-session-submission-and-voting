import { takeEvery, put } from "@redux-saga/core/effects";
import axios from 'axios';

//root saga for submissions
function* submissionSaga(){
    console.log('submission saga is firing');
    yield takeEvery('POST_SUBMISSION_TO_SERVER', sendSubmissionToServer );
    yield takeEvery('GET_APPROVED_SUBMISSIONS', getApprovedSubmissions);
    yield takeEvery('GET_USER_ID', getUserId )
}

function* sendSubmissionToServer(action){
    try{
        console.log('sendSubmission to server saga firing', action );
        const response = yield axios.post('/api/submission', action.payload );
        console.log('response from db is', response.data );
        yield put({type: 'ADD_SUBMISSION', payload: action.payload });
    } catch (error){
        console.error('error posting submission to DB', error );
    }
}

function* getApprovedSubmissions(){
    try {
        const approvedSubmissions = yield axios.get('/api/submission/approved');
        yield put({ type: 'SET_APPROVED_SUBMISSIONS', payload: approvedSubmissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error );
    }
}

function* getUserId(){
    try{
        const userId = yield axios.get('/api/submission/userId');
        yield put({ type: 'SET_USER_ID', payload: userId.data })
    } catch (error){
        console.error('error retrieving user id from db', error );
    }
}

export default submissionSaga;