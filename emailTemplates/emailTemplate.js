const emailTemplate = (name, reply_message) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Reply</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #0367F7;
            padding-bottom: 10px;
        }
        .content {
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for your message. We have received your query and our team will respond to you shortly.</p>
            <p>Your message: <strong>${reply_message}</strong></p>
            <p>Best Regards,</p>
            <p>The Support Team</p>
        </div>
        <div class="footer">
            <p>Contact us: support@example.com | Phone: (123) 456-7890</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate;
