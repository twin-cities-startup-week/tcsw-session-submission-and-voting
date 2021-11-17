import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//admin Saga: will be fired on 'FETCH_SESSION'
function* fetchSession(){
    try{
        const response = yield axios.get('/api/session')
        console.log('ThIS IS FETCHALLSESSION response', response.data)
        yield put({type: 'SET_ALL_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}


function* fetchSessionSaga (){
    yield takeLatest('FETCH_SESSION', fetchSession);
}


export default fetchSessionSaga;