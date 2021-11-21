import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchPanelists() {
    try{
        const viewPanelist = yield axios.get('/api/panelists')
        // console.log('these are the panelist', viewPanelist);

        yield put({ type: 'PLACE_PANELIST', payload: viewPanelist.data })
    } catch (error) {
        console.log('error in getting Panelists', error );
    }
}

function* fetchPanelDetails( action ) {
    try{
        const detail = action.payload;
        console.log('this is the detail action.payload', action.payload);
        
        const viewDetails = yield axios.get(`/api/panelists/details/${detail.id}`)
        console.log('this is the panelist details', viewDetails);
        

        yield put({ type: 'SET_PANEL_DETAILS', payload: viewDetails.data })
    } catch (error) {
        console.log('error in GET panelist details', error );
        alert('Unable to GET Panel Details')
    }
}

function* addVote( action ){
    try{
        const voteCount = action.payload;
        console.log('this is the voteCount', action.payload);
        
        const addToVote = yield axios.put(`/api/panelist/details/${voteCount.id}`)
        yield put ({ type: 'SET_VOTE_COUNT', payload: addToVote.data })
    }catch ( error ) {
        console.log('error in adding vote to the count', error );
        
    }
}

function* panelistSaga() {
    yield takeLatest( 'FETCH_PANELIST', fetchPanelists )
    yield takeLatest( 'FETCH_PANEL_DETAILS', fetchPanelDetails )
    yield takeLatest( 'ADD_VOTE_COUNT', addVote )
}

export default panelistSaga;