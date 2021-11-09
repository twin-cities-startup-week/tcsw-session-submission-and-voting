import { useHistory } from 'react-router-dom';

function PanelViewPage() {
    const history = useHistory();

    // navigates user to the details page of the speaker on click
    const moveToSelectedPage = () => {
        history.push('/user')
    }

    return(
        <div>
            <div>
                <h1>TCSW Panelists</h1>
                <h5>Community Voting: date-date</h5>

                <br/>

                <h5>page</h5>

                <h5>
                    page
                    <button>back</button>
                    <button>forward</button>
                </h5>

                <table className='panelist-table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Industry</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={moveToSelectedPage}>Rain green</td>
                            <td>TCSW</td>
                            <td>Technology</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Search</h2>
                <form>
                    <input
                        id='track-filter'
                        type='text'
                        name='track'
                        placeholder='search'
                    />

                    <button>RESET</button>
                    <button>SEARCH</button>

                    <h5>Track</h5>
                    <input
                        id='track-filter'
                        type='text'
                        name='track'
                        placeholder='track'
                    />

                    <h5>Format</h5>
                    <input
                        id='format-filter'
                        type='text'
                        name='format'
                        placeholder='format'
                    />
                    
                    <h5>Level</h5>
                    <input
                        id='level-filter'
                        type='text'
                        name='level'
                        placeholder='level'
                    />

                </form>

            </div>
        </div>
    )
}

export default PanelViewPage;