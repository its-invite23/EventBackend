const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    console.log(data)
    const {email, username, message, subject, emailTemplate} = data
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.user,
            pass: process.env.password,
        },
    });
    const emailHtml = emailTemplate(username, message); // Assuming emailTemplate is defined elsewhere
    const mailOptions = {
        from: process.env.user,
        to: email,
        subject: subject,
        html: emailHtml,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to be caught in the controller
    }
};

module.exports = sendEmail;
