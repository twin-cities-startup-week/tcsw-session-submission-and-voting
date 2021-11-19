import React from "react";
import { useState, useEffect } from "react";

import { Paper,Button, makeStyles } from "@material-ui/core";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

 // Styling
 const useStyles = makeStyles({
  root: {
      width: '100%',
      maxWidth: '768px',
      margin: '0 auto',
      padding: '15px',
      margin: '15px', 
      padding: '15px', 
      // backgroundColor: '#fff', 
      // borderRadius: '8px',
      // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',

  }
});

function AboutPage() {

  const classes = useStyles();

  const [learnMore, setLearnMore] = useState(false);

  const learnMoreInfo = () => {
    setLearnMore(!learnMore);
  };

  return (
      <div className={classes.root}>
        <div>
          <h2>TCSW Session Submission & Voting</h2>
          <h4>2022 Session Submission Dates</h4>
          <p> Session Submission Deadline: April 4, 2022 to May 15, 2022</p>
          <p> Session Voting Deadline: May 23, 2021 to June 5, 2022</p>
      <p>   "Twin Cities Startup Week is a week-long celebration of Minnesota entrepreneurs and innovators, created by and for the community. This year, we’re taking the experience to a whole new level by introducing the TCSW Session Selector, a platform to empower community members to influence the panels, speakers, and sessions that will be showcased on the schedule throughout the week. Thank you for your help highlighting the best of the Startup Capital of the North!”
– Kelly Schultze, Managing Director of Twin Cities Startup Week

The TCSW Session Selector provides a way for the community to be more involved in the sessions, workshops, panels, and events at TCSW. Whether you are hosting an event for TCSW 2022 or just want to have a say in what’s presented, you’re in the right place.

Make an account, submit your session application for TCSW 2022, and vote on content you want to see — all in one platform. 
You can also leave comments on why you think certain sessions are important!</p>

<p>Got questions? Check out our FAQ pag</p>

<p>Got an idea? Start submitting now!</p>

HISTORY:

<p>This is the first year the TCSW team is trying out this process. We heard from the community in 2020 and 2021, and wanted to make sure all ideas and input were considered. 

We worked with Prime Digital Academy to make the platform come to life — you can learn more about them here!

APPLICATION PROCESS:

We encourage anyone in the community with valuable thought leadership to submit an application through the Session Selector between April 4, 2022 - May 15, 2022! 

Once applications close, the TCSW team will be in touch if your session made it to community voting.
Then, it’s time for the community to vote on what they want to see during the week! Sessions are selected based on a combination of community voting and input from the TCSW team. 
Find the full timeline here. </p>


          <Button variant="contained" color="primary" onClick={learnMoreInfo}>
            
            Learn More
          </Button>
        </div>
        {learnMore && (
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
            repellat accusamus velit eaque sint ex, adipisci laborum, porro
            repellendus aspernatur, dignissimos odio. Quasi ex nobis, tempora
            beatae ad hic alias?
          </p>
        )}
      </div>
      
  );
}

export default AboutPage;
