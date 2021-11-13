import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function Leaderboard() {
    const dispatch = useDispatch();
    const approvedSubmissions = useSelector(store => store.submission.approvedSubmissions);

    useEffect(() => {
        dispatch({ type: 'GET_APPROVED_SUBMISSIONS' })
    }, [])

    let rows = [];
    rows = approvedSubmissions.map((submission, index) => {
        return (rows = {
            id: index,
            title: submission.title,
            industry: submission.industry_id,
            track: submission.track_id,
            location: submission.location_id,
            date: submission.date_id
        });
    });

    const columns = [
        { field: 'title', headerName: 'Session Title', width: 250 },
        { field: 'industry', headerName: 'Industry', width: 120 },
        { field: 'track', headerName: 'Track', width: 120 },
        { field: 'location', headerName: 'Location', width: 120 },
        { field: 'date', headerName: 'Date', width: 120 },
    ];

    return (
        <>
        <div className="bar">
            Leaderboard
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Container component={Paper} sx={{ mt: 15 }}>
        <div>
            {/* {JSON.stringify(rows)} */}
        </div>
            <DataGrid 
                rows={rows}
                columns={columns}
            />
        </Container>
        </>
    )
}

export default Leaderboard;