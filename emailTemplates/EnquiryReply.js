const EnquiryReply = (user_name, reply_message, enquire_status, number_of_attendees, event_type_name, event_name) => `
<table style="max-width: 600px; font-family: Arial, sans-serif; text-align: left;" align="center" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
    <tr bgcolor="#141414">
        <td style="padding: 20px; text-align: center;">
            <p style="margin: 1px;">
                <a href="#">
                    <img src="https://i.ibb.co/yg37Knk/logo.png" alt="Logo" style="display: block; margin: 0 auto;">
                </a>
            </p>
        </td>
    </tr>
    <tr bgcolor="#141414">
        <td style="padding: 40px 2px; text-align: center;">
            <p style="margin: 1px;">
                <img src="https://i.ibb.co/CV8frHp/emailbanner.png" alt="Banner" style="display: block; margin: 0 auto;">
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 40px 20px;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">
                Hi ${user_name},
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 20px;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC; text-align: center;">
                Thank you for your message. <br> We have received your query and our team will respond to you shortly.
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 20px;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">
                ${reply_message}
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 20px;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">
                <strong>Status:</strong> ${enquire_status}<br>
                <strong>Number of Attendees:</strong> ${number_of_attendees}<br>
                <strong>Event Type:</strong> ${event_type_name}<br>
                <strong>Event Name:</strong> ${event_name}
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 20px;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">
                Best regards,<br> Event Management Support Team
            </p>
        </td>
    </tr>
</table>
`;

module.exports = { EnquiryReply };
