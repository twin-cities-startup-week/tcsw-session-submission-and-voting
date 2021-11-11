import useReduxStore from '../../hooks/useReduxStore';

function VotePage() {
    const store = useReduxStore();


    return(
        <div>
            <h1>Details Page</h1>
            {store.panelistReducer.map((panelist) => (
                <h2>{panelist.title}</h2>
            ))}
        </div>
    )
}

export default VotePage;