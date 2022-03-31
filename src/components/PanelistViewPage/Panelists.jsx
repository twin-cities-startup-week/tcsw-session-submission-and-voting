import './Panelists.css';
import useReduxStore from '../../hooks/useReduxStore';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Button } from '@mui/material';

function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const store = useReduxStore();
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ trackState, setTrackState ] = useState('');
    const [ formatState, setFormatState ] = useState('');

    // useEffect(() => {
    //         fetchPanelist();
    //     }, []);

    // const fetchPanelist = ( session ) => {
    //     dispatch({
    //         type: 'FETCH_PANELIST', payload: session
    //     })
    // }

    const goToPanelDetails = ( session ) => {
        dispatch({ type: 'FETCH_SUBMISSION_DETAILS', payload: session})

        history.push(`/votepage/${session.id}`)
    }

    const restFilters = () => {
        setTrackState('');
        setFormatState('');
    }

    const goToLeaderBoard = () => {
        history.push('/leaderboard')
    }
    
    return(
        <div className='panel-view-page'>
            <div className='filter-section'>
                <h2 className='filter-heading'>SEARCH</h2>
                <p className='filter-suggestion'>Search by Title</p>
                    <div>
                        <input 
                            className='search-bar'
                            type='text'
                            placeholder='search....'
                            onChange={ event => { setSearchTerm( event.target.value )}}
                        />
                    </div>

                    <div className='filter-dropdown-selectors'>

                        <h5 className='track-filter-header'>Track</h5>
                        <select className='track-selector' onChange={ event => setTrackState( event.target.value )}>
                            <option value=''> </option>
                            <option value="Growth">Growth</option>
                            <option value="Culture">Culture</option>
                            <option value="Funding">Funding</option>
                            <option value="Product">Product</option>
                            <option value="Spotlight">Spotlight</option>
                        </select>
                    
                        <h5 className='format-filter-header'>Format</h5>
                        <select className='format-selector' onChange={ event => setFormatState( event.target.value )}>
                            <option value=''> </option>
                            <option value="Presentation">Presentation</option>
                            <option value="Panel">Panel</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Keynote">Keynote</option>
                            <option value="Roundtable">Roundtable</option>
                            <option value="Fireside Chat">Fireside Chat</option>
                            <option value="Showcase">Showcase</option>
                            <option value="Demo">Demo</option>
                            <option value="Meetup">Meetup</option>
                            <option value="Pitch">Pitch</option>
                            <option value="Other">Other</option>
                        </select>
                    </div> 

                    <br/>

                    <div className='reset-location'>
                        <Button className='filter-reset-button' variant="contained" onClick={restFilters}>Reset</Button>
                    </div>
                    
                    <div className='leader-board-button-div'>
                        <p>Want to see who is leading the Vote race?</p>
                        <Button className='leader-board-button' variant="contained" onClick={goToLeaderBoard}>Leader Board</Button>
                    </div>
              </div>

            {/* This is where the panel list table starts */}

            <div className='search-list' >
                <h2 className='search-list-header'>SESSION TOPICS</h2>
                <p className='voting-notice'>Community Voting Starts: </p>
    
                <div className='search-list-table'> 
                
                    <table>
                        <thead>
                            <tr>
                                <th className="title-header">Title </th>
                                <th className='track-header'>Track</th>
                                <th className='format-header'>Format</th>
                            </tr>
                        </thead>

                        {(trackState === '' && formatState === '') && 
                        <tbody>

                            {store.panelistReducer.filter( panel  => panel.title.toLowerCase().includes(searchTerm.toLowerCase())).map( panel => (
                                        
                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>
                                                
                            ))}
                        </tbody>
                        }
                        
                        
                        {trackState === 'Developer' &&
                        
                        <tbody>
                            
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Founder' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Designer' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Maker' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Product' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Growth' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'People' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Spotlight' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {trackState === 'Other' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.track.includes(trackState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

            {/* Format filtering starts here */}


                        {formatState === 'Presentation' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Panel' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Workshop' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Keynote' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Roundtable' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }


                        {formatState === 'Fireside Chat' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }
                        
                        {formatState === 'Showcase' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Demo' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Meetup' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Pitch' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                        {formatState === 'Other' &&
                        <tbody>
                            {store.panelistReducer.filter( panel  => panel.format.includes(formatState)).map( panel => (

                            <tr>
                                <td onClick={() => goToPanelDetails( panel )}>{panel.title}</td>
                                <td>{panel.track}</td>
                                <td>{panel.format}</td>
                            </tr>

                            ))}

                        </tbody>
                        }

                    </table>
                </div>
            </div>       

        </div>
    )
}

export default Panelists;