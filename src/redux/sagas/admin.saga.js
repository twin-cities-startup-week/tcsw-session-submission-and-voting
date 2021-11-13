import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//admin Saga: will be fired on 'FETCH_SESSION'
function* fetchSession(){
    try{
        const response = yield axios.get('/api/session/total')
        console.log('This is FETCHSESSION response', response.data)
        yield put({type: 'SET_SESSION', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}




function* sessionSaga (){
    yield takeLatest('FETCH_SESSION', fetchSession);
}


export default sessionSaga;