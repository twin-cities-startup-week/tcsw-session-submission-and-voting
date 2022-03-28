import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

function Leaderboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const approvedSubmissions = useSelector(store => store.submission.approvedSubmissions);

    /* Grabs approved submissions ordered from highest to lowest votes on page load */
    useEffect(() => {
        dispatch({ type: 'GET_APPROVED_SUBMISSIONS' })
    }, [])

    /* MUI params here provides all details for all rows(sessions)
       To get the clicked row, use params.row */
    const pushToDetailPage = (params) => {
        dispatch({ type: 'FETCH_SUBMISSION_DETAILS', payload: params.row })
        history.push(`/votepage/${params.row.id}`);
    }

        /* Takes in the index provided and adds st, nd, or rd 
        based on the number provided. This is purely for display purposes */
        const placement = (index) => {
            let j = index % 10,
                k = index % 100;
            if (j == 1 && k != 11) {
                return index + "st";
            }
            if (j == 2 && k != 12) {
                return index + "nd";
            }
            if (j == 3 && k != 13) {
                return index + "rd";
            }
            return index + "th";
        }

    /*  Approved submissions are fetched on page load from the redux store.
        Here, they are mapped and each property is listed as a cell of data
        in the DataGrid for each row. If properties shown need to be added 
        or changed, you can change them here. */
    let rows = [];
    rows = approvedSubmissions.map((submission, index) => {
        return (
            rows = {
            placement: placement(index + 1),
            id: submission.id,
            title: submission.title,
            industry: submission.industry,
            track: submission.track,
            location: submission.location,
            date: submission.date
        });
    });

    /*  Datagrid matches the "field" listed in the const "columns" with the property 
        of the row listed above. headerName is what is displayed for the column name.
        To add a new column, just add another object here with a matching field to the
        a property above in the rows. */
    const columns = [
        { field: 'placement', headerName: 'Placement', width: 100 },
        { field: 'title', headerName: 'Session Title', width: 250 },
        { field: 'industry', headerName: 'Industry', width: 180 },
        { field: 'track', headerName: 'Track', width: 160 },
        { field: 'location', headerName: 'Location', width: 160 },
        { field: 'date', headerName: '', width: 280 },
    ];

    return (
        <>
        {/* Leaderboard ribbon CSS is located in App.css */}
        <div className="bar">
            Leaderboard
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Container sx={{ mt: 15 }}>
            <DataGrid 
                rows={rows} 
                columns={columns}
                onRowClick={(params) => {
                    pushToDetailPage(params)
                }}/>
        </Container>
        </>
    )
}

export default Leaderboard;