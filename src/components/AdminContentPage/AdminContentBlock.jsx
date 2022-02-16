import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';

//Material-ui
import {
    Card,
    makeStyles,
    Button,
} from "@material-ui/core";

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
        fontSize: "20px",

        // marginLeft: "400px",
        // marginRight: "600px",
        // //marginTop: "-190px",
        // paddingTop: "30px",
        // paddingRight: '80px',
        border: "2px solid",
        textAlign: "center",
    },
    feedback: {
        backgroundColor: '#fff',
    },
});

function AdminContentBlock({ content }) {
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
    }

    return (
        <>
            <Card
                className={classic.rooty}
                //card 2
                variant="outlined"
            >
                {/* {JSON.stringify(block[content])} */}
                <ReactMde
                    className={classic.feedback}
                    value={block[content]}
                    onChange={handleMdeChange}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                />
                <Button
                    variant="contained" type="submit" name="submit" value="save"
                    sx={{
                        mt: 1, p: 2, width: 200, height: 40, bgcolor: '#0C495A',
                        color: '#FBBD19', m: 1, float: 'right'
                    }}
                    onClick={handleSave}
                >Update</Button>
            </Card>
        </>
    );
}

export default AdminContentBlock;
