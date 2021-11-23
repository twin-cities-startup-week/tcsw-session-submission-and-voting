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
    const sessionId = action.payload;

    try{
        yield axios.put( `/api/panelists/vote/${sessionId}` )
    }catch ( error ) {
        console.log('error in adding vote to the count', error );
        
    }
}

function* approveSession( action ) {
    const sessionId = action.payload;

    try{
        yield axios.put( `/api/panelists/approve/${sessionId}` )
    }catch ( error ) {
        console.log('error in admin approve PUT', error);
        
    }
}

function* denySession( action ) {
    const sessionId = action.payload;

    try{
        yield axios.put( `/api/panelists/deny/${sessionId}` )
    }catch ( error ) {
        console.log('error in admin approve PUT', error);
        
    }
}

function* panelistSaga() {
    yield takeLatest( 'FETCH_PANELIST', fetchPanelists );
    yield takeLatest( 'FETCH_PANEL_DETAILS', fetchPanelDetails );
    yield takeLatest( 'ADD_VOTE_COUNT', addVote );
    yield takeLatest( 'APPROVE_SESSION', approveSession);
    yield takeLatest( 'DENY_SESSION', denySession );
}

export default panelistSaga;