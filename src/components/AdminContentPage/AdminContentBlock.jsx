import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMde from 'react-mde';
import MarkdownView from 'react-showdown';
import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';

//Material-ui
import {
    Card,
    Button,
    Grid,
} from "@mui/material";

import {
    makeStyles,
} from "@mui/styles";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

// Styling
const useStylish = makeStyles({
    rooty: {
        margin: "0px 10px",
        fontSize: 20,

        // marginLeft: "400px",
        // marginRight: "600px",
        // //marginTop: "-190px",
        // paddingTop: "30px",
        // paddingRight: '80px',
        border: "2px solid",
    },
    feedback: {
        backgroundColor: '#fff',
    },
    preview: {
        maxHeight: 570,
        overflow: 'scroll',
    }
});

function AdminContentBlock({ content, center = false }) {
    const classic = useStylish();
    //set selector
    const { block } = useSelector((store) => store.content);
    const [selectedTab, setSelectedTab] = useState('write');
    const [changes, setChanges] = useState(false);
    // this.state = {
    //     changes: false,
    //     selectedTab,
    //     showCopyRepoUrlConfirmation: false,
    //     isDraft,
    //     // confirmationModalOpen: false,
    // };
    const dispatch = useDispatch();

    const handleMdeChange = (value) => {
        // const { dispatch, selectedCourseWork } = this.props;
        // const updatedCoursework = {
        //     ...selectedCourseWork,
        //     instructor_comment: value,
        // };
        setChanges(true);
        dispatch({ type: 'SET_CONTENT_BLOCK', payload: { name: content, content: value } });
    }

    const handleSave = () => {
        setChanges(false);
        dispatch({ type: 'SEND_CONTENT_BLOCK', payload: { name: content, content: block[content] } });
        dispatch({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: `Changes Saved`,
                body: `Changes saved for ${content} page`,
            },
        });
    }

    return (
        <>
            <Card
                className={classic.rooty}
                //card 2
                variant="outlined"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <ReactMde
                            className={classic.feedback}
                            value={block[content]}
                            onChange={handleMdeChange}
                            toolbarCommands={[
                                ["header", "bold", "italic", "strikethrough"],
                                ["link", "quote"],
                                ["unordered-list", "ordered-list", "checked-list"]
                            ]}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            minEditorHeight={800}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classic.preview} style={center ? { textAlign: 'center' } : { textAlign: 'left' }}>
                        <MarkdownView
                            markdown={block[content]}
                            
                        />
                    </Grid>
                </Grid>
                <br />
                <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={handleSave}
                >Update</Button>
                <br />
                <br />
            </Card>
        </>
    );
}

export default AdminContentBlock;
