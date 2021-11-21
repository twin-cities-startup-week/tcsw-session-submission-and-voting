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
            <div>
                <form className='filter-buttons'>
                    <div>
                        <input 
                            type='text'
                            placeholder='search....'
                            onChange={ event => { setSearchTerm( event.target.value )}}
                        />
                    </div>

                    <div>
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
            </div>

            
            <div className='search-list' >
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
    )
}

export default Panelists;