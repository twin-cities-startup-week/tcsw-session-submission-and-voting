import { takeLatest, put } from "@redux-saga/core/effects";
import axios from 'axios';

//root saga for submissions
function* submissionSaga(){
    yield takeLatest('POST_SUBMISSION_TO_SERVER', sendSubmissionToServer);
    yield takeLatest('UPDATE_SUBMISSION_TO_SERVER', sendUpdatedSubmissionToServer);
    yield takeLatest('GET_USER_SUBMISSIONS', getUserSubmissions);
    yield takeLatest('GET_USER_SUBMISSION_DETAIL', getUserSubmissionDetail);
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

        yield axios.put('/api/submission', submissionData);
        yield put({ type: 'ADD_SUBMISSION', payload: action.payload });
        action.onComplete();
    } catch (error) {
        console.error('error posting submission to DB', error);
        action.onFailure();
    }
}

function* getUserSubmissions() {
    try {
        const submissions = yield axios.get('/api/submission/user');
        yield put({ type: 'SET_USER_SUBMISSIONS', payload: submissions.data })
    } catch (error) {
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
            },
        });
    }
}

function* getUserSubmissionDetail(action) {
    try {
        const submissions = yield axios.get(`/api/submission/user/${action.payload}`);
        yield put({ type: 'SET_EDITING_SUBMISSION', payload: submissions.data })
    } catch (error) {
        yield put({ type: 'CLEAR_EDITING_SUBMISSION' })
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
            },
        });
    }
}

function* fetchSubmissionDetails(action) {
    try {
        const detail = action.payload;
        const submissions = yield axios.get(`/api/submission/details/${detail.id}`);
        yield put({ type: 'SET_SUBMISSION_DETAIL', payload: submissions.data })
    } catch (error) {
        yield put({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Oh no! Something went wrong.',
                body: 'If the problem persists, please reach out to tcsw@beta.mn so that we can help.',
            },
        });
    }
}


export default submissionSaga;