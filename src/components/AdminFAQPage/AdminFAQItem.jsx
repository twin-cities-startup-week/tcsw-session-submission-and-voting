import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMde from 'react-mde';
import MarkdownView from 'react-showdown';
import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';

//Material-ui
import {
    Card,
    Button,
    Grid,
    TextField
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
        textAlign: "center",
    },
    feedback: {
        backgroundColor: '#fff',
    },
    preview: {
        maxHeight: 570,
        overflow: 'scroll',
    },
    header: {
        fontSize: 20,
        fontWeight: 500,
        cursor: 'pointer',
      },
});

function AdminFAQItem({ faqItem, index }) {
    const classic = useStylish();
    //set selector
    const { faq } = useSelector((store) => store.content);
    const [selectedTab, setSelectedTab] = useState('write');
    const [changes, setChanges] = useState(false);
    const dispatch = useDispatch();

    const handleMdeQChange = (value) => {
        setChanges(true);
        dispatch({ type: 'SET_FAQ_Q', payload: { index: index, question: value } });
    }

    const handleMdeAChange = (value) => {
        setChanges(true);
        dispatch({ type: 'SET_FAQ', payload: { index: index, id: faqItem.id, question: faqItem.question, answer: value } });
    }

    const handleSave = () => {
        setChanges(false);
        dispatch({ type: 'SEND_FAQ', payload: { id: faqItem.id, 'question': faq[index].question, 'answer': faq[index].answer} });
    }

    return (
        <>
            <Card
                className={classic.rooty}
                //card 2
                variant="outlined"
            >
                <div className={classic.header} onClick={() => setOpenAnswers(!openAnswers)} key={index}>
          {faq[index].question}
          </div>
                <Grid container spacing={2}>
                
                    <Grid item xs={12} sm={6}>
              <ReactMde
                            className={classic.feedback}
                            value={faq[index].answer}
                            onChange={handleMdeAChange}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}
                            minEditorHeight={100}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classic.preview} style={{textAlign: 'left'}}
>
                        <MarkdownView
                            markdown={faq[index].answer}
                            
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

export default AdminFAQItem;
