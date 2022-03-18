import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTheme, useMediaQuery } from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    feedbackContainer: {
        padding: '0px 20px',
    },
    textField: {
        width: '100%',
    },
});

const GlobalAlertModal = (props) => {
    const {
        open,
        title,
        body,
        dispatch,
        closeActionType,
    } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    return (
        <Dialog fullScreen={fullScreen} open={open}>
            <DialogTitle id="responsive-dialog-title">
                {`${title}`}
            </DialogTitle>
            <DialogContent align="left" className={classes.feedbackContainer}>
                {body}
            </DialogContent>
            <br />
            <DialogActions>
                <Button
                    onClick={() => dispatch({
                        type: closeActionType,
                        payload: {
                            modalOpen: false,
                            title: '',
                            body: '',
                        },
                    })}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

GlobalAlertModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    closeActionType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    open: state.modal.globalModal.modalOpen,
    title: state.modal.globalModal.title,
    body: state.modal.globalModal.body,
});

export default connect(mapStateToProps)(GlobalAlertModal);
