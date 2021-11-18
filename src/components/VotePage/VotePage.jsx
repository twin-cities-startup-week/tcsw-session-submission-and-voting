import useReduxStore from '../../hooks/useReduxStore';

function VotePage() {
    const store = useReduxStore();

    return(
        <div>
            <h1>Details Page</h1>
             {store.panelistDetailsReducer.map(( details ) => (
            <div>
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
                <div key={details.id}>
                    <h2>{details.title}</h2>
                        <p>{details.description}</p>

                    <h3>Related Media</h3>

                    <h3>Additional Supporting Materials</h3>

                    <h3>Takeaways</h3>

                    <h3>Speakers</h3>
                        <p>{details.speakers}</p>

                    <h3>Orginizer</h3>
                    {/* the name of the panelist who submitted the form */}
                        
                   
                    

                </div>
            ))}
        </div>
    )
}

export default VotePage;