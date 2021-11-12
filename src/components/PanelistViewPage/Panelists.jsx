import Select from 'react-dropdown-select';
import useReduxStore from '../../hooks/useReduxStore';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';



function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const store = useReduxStore();
    console.log('this is the information from the panelistReducer', store.panelistReducer);

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ filteredData, setFilteredData ] = useState(''); 

    useEffect(() => {
            fetchPanelist();
        }, []);

    const fetchPanelist = ( session ) => {
        dispatch({
            type: 'FETCH_PANELIST', payload: session
        })
    }

    const goToPanelDetails = ( session ) => {
        dispatch({ type: 'FETCH_PANELIST', payload: session})

        history.push('/votepage')
    }



    return(
        <div>
            <h1>Panelist</h1>

            {/* search bar with filtering on change */}
            <input 
                type='text'
                placeholder='search....'
                onChange={ event => { setSearchTerm( event.target.value )}}
            />

            {store.panelistReducer.filter((speakers) => {
                if( searchTerm == '') {
                    return speakers
                }else if( speakers.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return speakers
                }
            }).map((speakers, key) => {
                return(
                    <div className='search-list' key={key}>
                        <p onClick={goToPanelDetails}>{speakers.title}</p>
                    </div>
                )
                
            })}

            <form>
                <input
                    type='text'
                    placeholder='search....'
                />

                <button>reset</button>
                <button>search</button>

                <div>
                    <h5>Track</h5>
                    <select>
                        <option value="track1">growth</option>
                        <option value="track2">founder</option>
                        <option value="track3">designer</option>
                    </select>
                </div>

                <div>
                    <h5>Format</h5>
                    <select>
                        <option value="format1">format</option>
                        <option value="format2">format</option>
                        <option value="format3">format</option>
                    </select>
                </div>
                


            </form>

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
                            <td onClick={goToPanelDetails}>{panelist.title}</td>
                            <td>{panelist.location_details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
}

export default Panelists;