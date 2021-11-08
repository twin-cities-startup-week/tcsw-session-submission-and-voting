import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'


function SubmissionPage() {


    return (
        <>
        <Box p={2}>
            <Typography variant="h5" align="left">
                TCSW Session Submission 2022
            </Typography>
            </Box>

            <Box p={3}>
            <Container component={Paper}>
            <FormControl>
            <Box p={2}>
            <Typography variant="body2" gutterBottom> Email Address:</Typography>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth />
            </Box>

            </FormControl>
            </Container>
            </Box>
        </>
    )
}

export default SubmissionPage;