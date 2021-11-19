import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//admin Saga: will be fired on 'FETCH_SESSION'
function* fetchHighestVoting(){
    console.log('Please help me get this voting rank');
    try{
        const response = yield axios.get(`/api/session/sessionsVotes`)
        console.log('HELLO TOU, YOU, JOU, and SOU ThIS IS FETCHHIGHESTVOTING response', response.data)
        yield put({type: 'SET_HIGHEST_VOTING', payload: response.data})
    }catch(error){
        console.log('Session get request failed', error )
    }
}


function* highestVotingSaga (){
    yield takeLatest('FETCH_HIGHEST_VOTING', fetchHighestVoting);
}


export default highestVotingSaga;