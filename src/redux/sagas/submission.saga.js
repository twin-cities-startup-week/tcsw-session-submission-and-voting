import { takeEvery, put } from "@redux-saga/core/effects";
import axios from 'axios';

//root saga for submissions
function* submissionSaga(){
    yield takeEvery('POST_SUBMISSION_TO_SERVER', sendSubmissionToServer);
    yield takeEvery('GET_APPROVED_SUBMISSIONS', getApprovedSubmissions);
    yield takeEvery('GET_USER_SUBMISSIONS', getUserSubmissions);
}

function* sendSubmissionToServer(action){
    try{
        console.log('sendSubmission to server saga firing', action );
        const submissionData = Object.assign({}, action.payload);
        if (action.fileToUpload) {
            const selectedFile = action.fileToUpload;
            const fileName = encodeURIComponent(selectedFile.fileName);
            const fileType = encodeURIComponent(selectedFile.type);
            const fileSize = encodeURIComponent(selectedFile.size);
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile);
            const imageResponse = yield axios.post(`/api/submission/image?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
            console.log('sendSubmissionToServer', imageResponse.data);
            submissionData.image = imageResponse.data.imagePath;
        }
        
        const response = yield axios.post('/api/submission', submissionData );
        console.log('response from db is', response.data );
        yield put({type: 'ADD_SUBMISSION', payload: action.payload });
        action.onComplete();
    } catch (error){
        console.error('error posting submission to DB', error );
        action.onFailure();
    }
}

function* getApprovedSubmissions(){
    try {
        const submissions = yield axios.get('/api/submission/approved');
        yield put({ type: 'SET_APPROVED_SUBMISSIONS', payload: submissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error );
    }
}

function* getUserSubmissions() {
    try {
        const submissions = yield axios.get('/api/submission/user');
        yield put({ type: 'SET_USER_SUBMISSIONS', payload: submissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error);
    }
}


export default submissionSaga;