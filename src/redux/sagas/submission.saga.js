import { takeEvery, takeLatest, put } from "@redux-saga/core/effects";
import axios from 'axios';

//root saga for submissions
function* submissionSaga(){
    yield takeEvery('POST_SUBMISSION_TO_SERVER', sendSubmissionToServer);
    yield takeEvery('UPDATE_SUBMISSION_TO_SERVER', sendUpdatedSubmissionToServer);
    yield takeEvery('GET_APPROVED_SUBMISSIONS', getApprovedSubmissions);
    yield takeEvery('GET_USER_SUBMISSIONS', getUserSubmissions);
    yield takeEvery('GET_USER_SUBMISSION_DETAIL', getUserSubmissionDetail);
    yield takeLatest('FETCH_SUBMISSION_DETAILS', fetchSubmissionDetails);
}

function* sendSubmissionToServer(action){
    try{
        const submissionData = Object.assign({}, action.payload);
        if (action.fileToUpload) {
            const selectedFile = action.fileToUpload;
            const fileName = encodeURIComponent(selectedFile.fileName);
            const fileType = encodeURIComponent(selectedFile.type);
            const fileSize = encodeURIComponent(selectedFile.size);
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile);
            const imageResponse = yield axios.post(`/api/submission/image?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
            submissionData.image = imageResponse.data.imagePath;
        }
        
        const response = yield axios.post('/api/submission', submissionData );
        yield put({type: 'ADD_SUBMISSION', payload: action.payload });
        action.onComplete();
    } catch (error){
        console.error('error posting submission to DB', error );
        action.onFailure();
    }
}

function* sendUpdatedSubmissionToServer(action) {
    try {
        const submissionData = Object.assign({}, action.payload);
        if (action.fileToUpload) {
            const selectedFile = action.fileToUpload;
            const fileName = encodeURIComponent(selectedFile.fileName);
            const fileType = encodeURIComponent(selectedFile.type);
            const fileSize = encodeURIComponent(selectedFile.size);
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile);
            const imageResponse = yield axios.post(`/api/submission/image?name=${fileName}&type=${fileType}&size=${fileSize}`, formData);
            submissionData.image = imageResponse.data.imagePath;
        }

        const response = yield axios.put('/api/submission', submissionData);
        yield put({ type: 'ADD_SUBMISSION', payload: action.payload });
        action.onComplete();
    } catch (error) {
        console.error('error posting submission to DB', error);
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

function* getUserSubmissionDetail(action) {
    try {
        const submissions = yield axios.get(`/api/submission/user/${action.payload}`);
        yield put({ type: 'SET_EDITING_SUBMISSION', payload: submissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error);
    }
}

function* fetchSubmissionDetails(action) {
    try {
        const detail = action.payload;
        const submissions = yield axios.get(`/api/submission/details/${detail.id}`);
        yield put({ type: 'SET_SUBMISSION_DETAIL', payload: submissions.data })
    } catch (error) {
        console.log('Error posting submission to DB', error);
    }
}


export default submissionSaga;