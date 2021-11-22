import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import panelistReducer from './panelist.reducer';
import panelistDetailsReducer from './panelistDetails.reducer';
import addVoteReducer from './addVote.reducer';



import password from './password.reducer';

import submission from './submission.reducer';
import setSessionList from './admin.reducer';
import setAwaitingApproval from './approvedAwaiting.reducer';
import setHighestVoting from './highestVoting.reducer';
import setAllSession from './fetchAllSession.reducer';
import setApprovalAwaitingInfo from './approvalAwaitingInfo.reducer';
import setApprovedInfo from './approvedInfo.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  panelistReducer,
  panelistDetailsReducer,
  password,
  submission,
  setSessionList,
  setAwaitingApproval,
  setHighestVoting,
  setAllSession,
  setApprovalAwaitingInfo,
  setApprovedInfo,
  addVoteReducer,
});

export default rootReducer;
