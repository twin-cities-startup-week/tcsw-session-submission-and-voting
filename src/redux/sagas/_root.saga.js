import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import panelistSaga from './panelist.saga';
import submissionSaga from './submission.saga';
import sessionSaga from './admin.saga';
import approvedAwaitingSaga from './approvedAwaiting.saga';
import highestVotingSaga from './highestVoting.saga';
import fetchSessionSaga from './fetchAllSession.saga';
import approvalAwaitingInfoSaga from './approvalAwaitingInfo.saga';
import approvedInfoSaga from './approvedInfo.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    panelistSaga(),
    submissionSaga(),
    sessionSaga(),
    approvedAwaitingSaga(),
    highestVotingSaga(),
    fetchSessionSaga(),
    approvalAwaitingInfoSaga(),
    approvedInfoSaga(),
  ]);
}
