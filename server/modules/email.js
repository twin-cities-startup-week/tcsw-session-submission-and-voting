const sgMail = require('@sendgrid/mail');

const sendSessionSubmissionEmail = (user, newSubmission) => {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_FROM_ADDRESS,
            subject: 'TCSW Session Submission Confirmation',
            text: `
Hello ${user.first_name},

Thank you for submitting a session for Twin Cities Startup Week 2022! After reviewing your submission, the TCSW team will be in contact to let you know whether or not it has been accepted into the TCSW Session Selector for public voting.  

You can edit your session submission until submissions close on May 15, 2022. The TCSW team will review each change and accept or reject the edited submission for public voting.

https://sessions.twincitiesstartupweek.com/#/user/submission

Title: ${newSubmission.title}
Description: ${newSubmission.description}

Thank you! 

TCSW Team
`,
            html: `
Hello ${user.first_name},
<br />
<br />
Thank you for submitting a session for Twin Cities Startup Week 2022! After reviewing your submission, the TCSW team will be in contact to let you know whether or not it has been accepted into the TCSW Session Selector for public voting.  
<br />
<br />
You can <a href="https://sessions.twincitiesstartupweek.com/#/user/submission">edit your session submission</a> until submissions close on May 15, 2022. The TCSW team will review each change and accept or reject the edited submission for public voting.
<br />
<br />
<strong>Title</strong>
<br />
${newSubmission.title}
<br />
<br />
<strong>Description</strong>
<br />
${newSubmission.description}
<br />
<br />
Thank you! 
<br />
<br />
TCSW Team
`,
        };
        sgMail.send(msg).catch(e => console.log(e));
    } else {
        console.error('Missing SendGrid environment variables.')
    }
}

module.exports = {
    sendSessionSubmissionEmail,
};
