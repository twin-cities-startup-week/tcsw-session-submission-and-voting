import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function Leaderboard() {
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
            <p>Something text text text</p>
        </Container>
        </>
    )
}

export default Leaderboard;