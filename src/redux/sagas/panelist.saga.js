import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchPanelists() {
    try{
        const viewPanelist = yield axios.get('/api/panelists')
        console.log('these are the panelist', viewPanelist);

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

function* panelistSaga() {
    yield takeLatest( 'FETCH_PANELIST', fetchPanelists )
    yield takeLatest( 'FETCH_PANEL_DETAILS', fetchPanelDetails )
}

export default panelistSaga;