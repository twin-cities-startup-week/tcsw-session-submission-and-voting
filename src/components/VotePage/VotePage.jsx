import './VotePage.css'
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function VotePage() {
    const store = useReduxStore();
    const dispatch = useDispatch();
    
    const [vote, setVote ] = useState(0);

    const [voteButton, toggleVoteButton ] = useState(false)

   useEffect(() => {
        fetchPanelistDetails
   }, [])

    // Fetches dispatches to server for session information   
   const fetchPanelistDetails = ( session ) => {
        dispatch({ type: 'FETCH_PANEL_DETAILS', payload: session})
   } 

    // function to set Vote Button state to true.   
   const addVote = ( session ) => {
    //    dispatch({ type: 'ADD_VOTE_COUNT', payload: store })
    //    console.log(' addVote payload', session);
        toggleVoteButton(true);
        alert('Awesome! You Have VOTED!')
   }

    return(
        <div>
            <h1>Details Page</h1>
             {store.panelistDetailsReducer.map(( details, index ) => (
            <div className='left-bar'>
                <h2>TCSW</h2>
                <p>If you want this speaker! Click Vote!</p>
                {/* <button onClick={() => setVote( vote + 1 )}>VOTE! <span>{vote}</span></button>  */}

                { voteButton === false && <button onClick={( event ) => addVote( event.target.value )}>VOTE!</button> }
                
                <h5>Track: {details.track}</h5>
                <p>Industry: {details.industry}</p>
                <p>Format: {details.format}</p>
                <p>Time: {details.time}</p>
                <p>Date: {details.date}</p>
                <p></p>
            </div>
             ))}

            
            {store.panelistDetailsReducer.map(( details ) => (
                <div className= 'right-bar' key={details.id}>
                    <h2>{details.title}</h2>
                        <p>{details.description}</p>

                    <h3>Speakers</h3>
                        <p>{details.speakers}</p>

                    <h3>Organizers</h3>
                        <p>{details.first_name} {details.last_name}</p>

                    <h3>Related Media</h3>
                    {/* the name of the panelist who submitted the form */}
                        
                   
                    

                </div>
            ))}
        </div>
    )
}

export default VotePage;