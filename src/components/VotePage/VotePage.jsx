import './VotePage.css'
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect } from 'react';

function VotePage() {
    const store = useReduxStore();

   useEffect(() => {
        fetchPanelistDetails
   }, [])

   const fetchPanelistDetails = ( session ) => {
        dispatch({ type: 'FETCH_PANEL_DETAILS', payload: session})
   } 
   

    return(
        <div>
            <h1>Details Page</h1>
             {store.panelistDetailsReducer.map(( details, index ) => (
            <div className='left-bar'>
                <h2>TCSW</h2>
                <p>If you want this speaker! Click Vote!</p>
                <button>VOTE!</button>

                <h5>Track: {details.track_id}</h5>
                <p>Industry: {details.industry_id}</p>
                <p>Format: {details.format_id}</p>
                <p>Theme: </p>
                <p>Level: </p>
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