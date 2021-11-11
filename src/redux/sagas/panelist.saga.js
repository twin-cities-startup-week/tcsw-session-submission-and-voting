import axios from 'axios'
import { put, takeLatest } from 'redux-saga/effects'

function* fetchPanelists() {
    try{
        const viewPanelist = yield axios.get('/api/location')
        console.log('panelist', viewPanelist);

        yield put({ type: 'PLACE_LOCATION', payload: viewPanelist.data })
    } catch (error) {
        console.log('error in getting Panelists', error );
    }
}

function* panelistSaga() {
    yield takeLatest( 'FETCH_PANELIST', fetchPanelists )
}

export default panelistSaga;