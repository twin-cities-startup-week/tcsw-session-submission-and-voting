import './Panelists.css';
import useReduxStore from '../../hooks/useReduxStore';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';



function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const store = useReduxStore();
    console.log('this is the information from the panelistReducer', store.panelistReducer);

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ trackState, setTrackState ] = useState(''); 

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

    const votePageGo = () => {
        history.push('/votepage');
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

            
            <div className='search-list' >
            {/* <p onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</p> */}

            {/* <ul>
                <li onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</li>
            </ul> */}
            <table>
                <thead>
                    <tr>
                        <th>Title </th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                        {/* .map((speakers, key) => {
                            return( */}

                                    {store.panelistReducer.filter( panel  => panel.title.toLowerCase().includes(searchTerm.toLowerCase())).map( panel => (
                                        // if( searchTerm == '') {
                                        //     return panel;
                                        // }else if( speakers.title.toLowerCase().includes(searchTerm.toLowerCase())) { 
                                            <tr>
                                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                                <td>{panel.location_details}</td>
                                                <td>{panel.industry_id}</td>
                                            </tr>
                                            ) 
                                    )}
                                    
                                        panel => panel.track = setTrackState .map
                                        
                              
                                    //     {/* <td onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</td>
                                    //     <td>{speakers.location_details}</td>
                                    // </tr> */}
                            </tbody>
                        </table>
                    </div>
                )
                
            {/* })} */}

            {/* <form>
                <div>
                    <h5>Track</h5>
                        <button>Devloper</button>
                        <button>Designer</button>
                        <button>Product</button>
                    <h5>Track</h5>
                    <select className='track-selector'>
                        <option value="growth"><p onClick={votePageGo}>growth</p></option>
                        <option value="founder">founder</option>
                        <option value="designer">designer</option>
                    </select>
                </div>

                <div>
                    <h5>Format</h5>
                        <button>Presentation</button>
                        <button>Key Note</button>
                        <button>Showcase</button>
                    <h5>Format</h5>
                    <select>
                        <option value="format1">format</option>
                        <option value="format2">format</option>
                        <option value="format3">format</option>
                    </select>
                </div> 
            </form>
                 */}
                

        </div>
    )
}

export default Panelists;