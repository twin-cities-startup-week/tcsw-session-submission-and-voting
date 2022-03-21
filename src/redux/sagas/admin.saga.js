import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTotalSession(){
    try{
        const response = yield axios.get(`/api/session/sessionsApproved`)
        yield put({type: 'SET_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}

function* fetchAllContent() {
    try {
        const response = yield axios.get(`/api/content/block`);
        yield put({ type: 'SET_CONTENT_BLOCKS', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* fetchAllFAQ() {
    try {
        const response = yield axios.get(`/api/content/faq`);
        yield put({ type: 'SET_FAQS', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* sendContent(action) {
    try {
        const response = yield axios.post('/api/content/block', action.payload);
        // yield put({ type: 'SET_CONTENT_BLOCK', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* sendFAQ(action) {
    try {
        const response = yield axios.post('/api/content/faq', action.payload);
        // yield put({ type: 'SET_CONTENT_BLOCK', payload: response.data });
    } catch (error) {
        console.log('Session get request failed', error);
    }
}

function* sessionSaga (){
    yield takeLatest('FETCH_TOTAL_SESSION', fetchTotalSession);
    yield takeLatest('FETCH_CONTENT_BLOCKS', fetchAllContent);
    yield takeLatest('FETCH_FAQ', fetchAllFAQ);
    yield takeLatest('SEND_CONTENT_BLOCK', sendContent);
    yield takeLatest('SEND_FAQ', sendFAQ);
}


export default sessionSaga;