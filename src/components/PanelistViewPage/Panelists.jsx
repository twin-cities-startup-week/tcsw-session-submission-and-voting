import useReduxStore from '../../hooks/useReduxStore';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Panelists() {
    const dispatch = useDispatch();
    const store = useReduxStore();

    useEffect(() => {
            fetchPanelist();
        }, []);

    const fetchPanelist = ( session ) => {
        dispatch({
            type: 'FETCH_PANELIST', payload: session
        })
    }

    console.log('this is the information from the panelistReducer', store.panelistReducer);

    return(
        <div>
            <h1>Panelist</h1>

            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {store.panelistReducer.map((panelist) => (
                        <tr>
                            <td>{panelist.title}</td>
                            <td>{panelist.location_details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
}

export default Panelists;