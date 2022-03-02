import React, { useState } from "react";
import MarkdownView from 'react-showdown';

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Styling
const useStyles = makeStyles({
  questions: {
    margin: "15px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    position: "relative",
  },
  header: {
    fontSize: 20,
    fontWeight: 500,
    cursor: 'pointer',
  },
  arrow: {
    float: 'right',
  }
});

function FaqItemPage({ faq, index }) {
  const classes = useStyles();

  const [openAnswers, setOpenAnswers] = useState(false);

  return (
    <div>
      <div className={classes.questions}>
        <div className={classes.header} onClick={() => setOpenAnswers(!openAnswers)} key={index}>
          {faq.question}
          {
            openAnswers ? (
              <ArrowUpwardIcon className={classes.arrow} />
            ) : (
              <ArrowDownwardIcon className={classes.arrow} />
            )
          }
        </div>
        {
          openAnswers
          && (
            // https://github.com/showdownjs/showdown#valid-options
            <MarkdownView
              markdown={faq.answer}
              options={{ tables: true, emoji: true, openLinksInNewWindow: true }}
            />
          )
        }
      </div>

      
      {/* className={answers.answers} */}
    </div>
  );
}

export default FaqItemPage;
