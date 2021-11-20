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
    const [ formatState, setFormatState ] =useState('');

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

            <form className='filter-buttons'>
                <div>
                    <input 
                        type='text'
                        placeholder='search....'
                        onChange={ event => { setSearchTerm( event.target.value )}}
                    />
                    {/* <h5>Track</h5>
                        <button>Devloper</button>
                        <button>Designer</button>
                        <button>Product</button> */}

                    <h5>Track</h5>
                    <select className='track-selector' onChange={ event => setTrackState( event.target.value )}>
                        {console.log('this is the setTrackState',setTrackState)}
                        {console.log('this is the trackState', trackState)}
                        <option value=''> </option>
                        <option value="Developer">Developer</option>
                        <option value="Founder">Founder</option>
                        <option value="Designer">Designer</option>
                        <option value="Maker">Maker</option>
                        <option value="Product">Product</option>
                        <option value="Growth">Growth</option>
                        <option value="People">People</option>
                        <option value="Spotlight">Spotlight</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    {/* <h5>Format</h5>
                        <button>Presentation</button>
                        <button>Key Note</button>
                        <button>Showcase</button> */}

                    <h5>Format</h5>
                    <select onChange={ event => setFormatState( event.target.value )}>
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
            </form>

            
            <div className='search-list' >
                <table>
                    <thead>
                        <tr>
                            <th>Title </th>
                            <th>Track</th>
                            <th>Format</th>
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
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


                                    
                            {/* panel => panel.track = setTrackState .map */}
    
                    </tbody>
                    }

                </table>
            </div>       

        </div>
    )
}

export default Panelists;