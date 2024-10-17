module.exports = (resetLink, userName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            h1 { color: #333; }
            p { color: #555; }
            .button { display: inline-block; padding: 10px 20px; background-color: #0367F7; color: #ffffff !important; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .footer { margin-top: 20px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hi <strong>${userName}</strong>,</p>
            <p>We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
            <a href="${resetLink}" class="button  ">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p class="footer">This link will expire in 1 hour. For security reasons, do not share this email.</p>
        </div>
    </body>
    </html>
    `;
};