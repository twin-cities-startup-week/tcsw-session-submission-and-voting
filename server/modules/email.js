const sgMail = require('@sendgrid/mail');
const { logError } = require('./logger');

const sendSessionSubmissionEmail = (email, firstName, newSubmission) => {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_ADDRESS,
            subject: 'TCSW Session Submission Confirmation',
            text: `
Hello ${firstName},

Thank you for submitting a session for Twin Cities Startup Week 2022! After reviewing your submission, the TCSW team will be in contact to let you know whether or not it has been accepted into the TCSW Session Selector for public voting.  

You can edit your session submission until submissions close on May 15, 2022. The TCSW team will review each change and accept or reject the edited submission for public voting.

https://sessions.twincitiesstartupweek.com/#/user/submission

Title: ${newSubmission.title}
Description: ${newSubmission.description}

Thank you! 

TCSW Team
`,
            html: `
Hello ${firstName},
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
        sgMail.send(msg).catch(e => logError(e));
    } else {
        console.error('Missing SendGrid environment variables.')
    }
}

const sendSessionApprovalEmail = (email, firstName) => {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_ADDRESS,
            subject: 'TCSW Session Submission Status',
            text: `
Hi ${firstName},

Thank you for submitting a session for Twin Cities Startup Week 2022! We are excited to share that your submission has been accepted onto the TCSW Session Selector for public voting. Here's some helpful information about the next steps.

SUBMISSION CHANGES
Please feel free to edit your submission until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector.

https://sessions.twincitiesstartupweek.com/#/user/submission

PUBLIC VOTING
Being accepted onto the TCSW Session Selector does not guarantee your event will be accepted onto the TCSW Schedule. The TCSW team will use community and votes and feedback to determine the final TCSW event lineup. Public voting will be open from May 25, 2022 to June 8, 2022.

PROMOTING YOUR EVENT
Make sure you are ready to promote your event and encourage your community to vote from May 25, 2022 to June 8, 2022. The TCSW Team will be in touch with a media kit to help you spread the word. 

If you have any questions about around TCSW or the voting process, contact us at tcsw@beta.mn.

Thank you! 

TCSW Team
`,
            html: `
Hi ${firstName},
<br />
<br />
Thank you for submitting a session for Twin Cities Startup Week 2022! We are excited to share that your submission has been accepted onto the TCSW Session Selector for public voting. Here's some helpful information about the next steps.
<br />
<br />
<strong>SUBMISSION CHANGES</strong>
<br />
Please feel free to <a href="https://sessions.twincitiesstartupweek.com/#/user/submission">edit your submission</a> until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector.
<br />
<br />
<strong>PUBLIC VOTING</strong>
<br />
Being accepted onto the TCSW Session Selector does not guarantee your event will be accepted onto the TCSW Schedule. The TCSW team will use community and votes and feedback to determine the final TCSW event lineup. Public voting will be open from June 16-29, 2022.
<br />
<br />
<strong>PROMOTING YOUR EVENT</strong>
<br />
Make sure you are ready to promote your event and encourage your community to vote from June 16-29, 2022. The TCSW Team will be in touch with a media kit to help you spread the word. 
<br />
<br />
If you have any questions about around TCSW or the voting process, contact us at tcsw@beta.mn.
<br />
<br />
Thank you! 
<br />
<br />
TCSW Team
`,
        };
        sgMail.send(msg).catch(e => logError(e));
    } else {
        console.error('Missing SendGrid environment variables.')
    }
}

const sendSessionRejectionEmail = (email, firstName) => {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== '') {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_ADDRESS,
            subject: 'TCSW Session Submission Status',
            text: `
Hi ${firstName},

Thank you for submitting a session for Twin Cities Startup Week 2022. Your submission does not align with our session criteria and is not accepted into the TCSW Session Selector for public voting. 

Please feel free to edit your submission until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector.

https://sessions.twincitiesstartupweek.com/#/user/submission

If you have any questions about around TCSW or the voting process, contact us at tcsw@beta.mn.

Thank you! 

TCSW Team
`,
            html: `
Hi ${firstName},
<br />
<br />
Thank you for submitting a session for Twin Cities Startup Week 2022. Your submission does not align with our session criteria and is not accepted into the TCSW Session Selector for public voting. 
<br />
<br />
Please feel free to <a href="https://sessions.twincitiesstartupweek.com/#/user/submission">edit your submission</a> until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector.
<br />
<br />
If you have any questions about around TCSW or the voting process, contact us at tcsw@beta.mn.
<br />
<br />
Thank you! 
<br />
<br />
TCSW Team
`,
        };
        sgMail.send(msg).catch(e => logError(e));
    } else {
        console.error('Missing SendGrid environment variables.')
    }
}

module.exports = {
    sendSessionSubmissionEmail,
    sendSessionApprovalEmail,
    sendSessionRejectionEmail,
};
