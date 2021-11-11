import { takeEvery, put } from "@redux-saga/core/effects";
import axios from 'axios';

//root saga for submissions
function* submissionSaga(){
    console.log('submission saga is firing');
    yield takeEvery('POST_SUBMISSION_TO_SERVER', sendSubmissionToServer );
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















export default submissionSaga;