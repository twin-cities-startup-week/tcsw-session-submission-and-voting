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
        dispatch({ type: 'FETCH_PANEL_DETAILS', payload: session})

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
                    return speakers;
                }else if( speakers.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return speakers;
                }
            }).map((speakers, key) => {
                return(
                    <div className='search-list' key={key}>
                        {/* <p onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</p> */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Title </th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</td>
                                        <td>{speakers.location_details}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                )
                
            })}

            <form>
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

        </div>
    )
}

export default Panelists;