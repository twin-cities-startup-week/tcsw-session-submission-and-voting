import useReduxStore from '../../hooks/useReduxStore';

function VotePage() {
    const store = useReduxStore();


    return(
        <div>
            <h1>Details Page</h1>
            {/* {store.panelistReducer.map(( details ) => (
                <div key={details.id}>
                    <p>{details.title}</p>
                </div>
            ))} */}
        </div>
    )
}

export default VotePage;