const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    const { email, name, message, package, payment_id, subject, emailTemplate } = data;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const emailHtml = emailTemplate({ name, message, package, payment_id });
    const mailOptions = {
        from: process.env.EMAIL_USER,
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
