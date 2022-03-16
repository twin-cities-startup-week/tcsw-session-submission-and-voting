import './VotePage.css'
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkdownView from 'react-showdown';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

// Styling
const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px',
    },
    content: {
        paddingTop: '33px',
    },
    item: {
        paddingTop: '33px',
        display: 'flex',
    },
    title: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    previewImage: {
        height: '300px',
        width: '300px',
        objectFit: 'cover',
        padding: 0,
    }
});

function VotePage() {
    const user = useSelector((store) => store.user);
    const store = useReduxStore();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [vote, setVote ] = useState(0);

    const [voteButton, toggleVoteButton ] = useState(false)

   useEffect(() => {
        fetchPanelistDetails
   }, [])

    // Fetches dispatches to server for session information   
   const fetchPanelistDetails = ( session ) => {
        dispatch({ type: 'FETCH_PANEL_DETAILS', payload: session})
   } 

    // function to add a Vote to the session vote count.   
   const addVote = ( sessionId ) => {
       dispatch({ type: 'ADD_VOTE_COUNT', payload: sessionId })
       console.log(' addVote payload', sessionId);
        toggleVoteButton(true);
        alert('Awesome! You Have VOTED!')
   }

   const sessionApprove = ( sessionId ) => {
       dispatch({ type: 'APPROVE_SESSION', payload: sessionId })
       alert('You have APPROVED this session!')
   }

   const sessionDeny = ( sessionId ) => {
       dispatch({ type: 'DENY_SESSION', payload: sessionId })
       alert('You have DENIED this session!')
   }

    return(
        <div className='vote-page-view'>

            {store.panelistDetailsReducer.map(( details, index ) => (

                <div className='left-bar'>

                    <div className='vote-section'>
                        <h2 className='left-header'>TCSW 2022</h2>
                        <p className='vote-suggestion'>Like this Speaker?! Click Vote!</p>
                        {/* <button onClick={() => setVote( vote + 1 )}>VOTE! <span>{vote}</span></button>  */}

                        { voteButton === false && <Button className="vote-button" variant="contained" size="large" onClick={() => addVote( details.id )}>Vote</Button> }
                        
                    </div>

                    <div className='extra-details-section'>
                        <h5>Track: {details.track}</h5>
                        <h5>Industry: {details.industry}</h5>
                        <h5>Format: {details.format}</h5>
                        <h5>Time: {details.time}</h5>
                        <h5>Date: {details.date}</h5>
                    </div>

                </div>

            ))}

            
            {store.panelistDetailsReducer.map(( details ) => (

                <div className= 'right-bar' key={details.id}>

                    <div className={classes.item}>
                        <div style={{ paddingRight: '20px' }}>
                            <img src={details.image} className={classes.previewImage} />
                        </div>
                        <div style={{ flex: 1 }}>
                            {user.admin &&
                                <>
                                    <Button sx={{ float: 'right', marginTop: '8px', marginLeft: '20px' }} className='approve-button' variant="contained" color="success" onClick={() => sessionApprove(details.id)}>Approve</Button>
                                    <Button sx={{ float: 'right', marginTop: '8px' }} className='deny-button' variant="contained" color="error" onClick={() => sessionDeny(details.id)}>Deny</Button>
                                </>
                            }
                            <h2>{details.title}</h2>
                            <MarkdownView
                                markdown={details.description}
                            />
                        </div>
                    </div>

                    <div className='speaker'>
                        <h3>Speakers</h3>
                        <MarkdownView
                            markdown={details.speakers}
                        />
                    </div>

                    <div className='organizers'>
                        <h3>Organizers</h3>
                        <p>{details.first_name} {details.last_name}</p>
                    </div>

                    <div className='related-media'>
                        <h3>Related Media</h3>
                        <p>{details.media}</p>
                    </div>    

                    <div className='approval-buttons'>  



                    </div>

                </div>

            ))}

        </div>
    )
}

export default VotePage;