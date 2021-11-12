import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function Leaderboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_APPROVED_SUBMISSIONS' })
    }, [])

    const rows: GridRowsProp = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
        { id: 4, col1: 'MUI', col2: 'is Amazing' },
    ];

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Session Title', width: 250 },
        { field: 'col2', headerName: 'Industry', width: 120 },
        { field: 'col3', headerName: 'Track', width: 120 },
        { field: 'col4', headerName: 'Location', width: 120 },
        { field: 'col5', headerName: 'Date', width: 120 },
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
            <DataGrid rows={rows} columns={columns}/>
        </Container>
        </>
    )
}

export default Leaderboard;