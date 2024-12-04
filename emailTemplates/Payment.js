module.exports = (name , package) => {
    return `
<table align="center" style="max-width: 600px; font-family: arial;" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
<tr bgcolor="#141414">
    <td style="padding: 20px 2px 0 2px; text-align: center;">
<p style="margin: 1px;">
        <a href="https://user-event.vercel.app/">
          <img style="max-width:150px;" src="https://f003.backblazeb2.com/file/Event-management/logo.png" alt="Event Logo">
        </a>
      </p>
    </td>
</tr>

<tr bgcolor="#141414">
    <td style="padding: 40px 2px 10px 2px; text-align: center;">
        <p style="margin: 1px;">
            <img src="https://i.ibb.co/CV8frHp/emailbanner.png" alt="">
        </p>
    </td>
</tr>

<tr>
    <td style="padding:40px 0 30px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Hi ${name},
        </p>
    </td>
</tr>

<tr>
    <td style="padding: 0 20px 30px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Thank you for your payment! You've successfully booked [Service Provider’s Name] for your upcoming event.
        </p>
    </td>
</tr>

<tr>
    <td style="padding: 0 20px 25px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Here are the details of your transaction:
        </p>
    </td>
</tr>


<tr>
    <td style="padding: 0 0 40px 20px;">
        <table>
            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Service Provider:
                    </p>
                </td>

                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                        Service Provider's Name:
                       </strong>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Service Type:
                    </p>
                </td>

                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                       [Service Type]
                       </strong>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Event Date:
                    </p>
                </td>

                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                        [Event Date]
                       </strong>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Amount Paid:
                    </p>
                </td>

                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                        Payment Amount
                       </strong>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Transaction ID:
                    </p>
                </td>

                <td style="padding: 0 15px 15px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                        [Transaction ID]
                       </strong>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
                        Date of Payment:
                    </p>
                </td>

                <td style="padding: 0 15px 10px 0;">
                    <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
                       <strong>
                        [Date of Payment]
                       </strong>
                    </p>
                </td>
            </tr>
        </table>
    </td>
</tr>


<tr>
    <td style="padding: 0 20px 30px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Our team will notify the service provider, and you can now relax knowing your event is in good hands. If you need to modify any details, view your booking, or get in touch with the service provider, visit your dashboard [Insert link to dashboard]
        </p>
    </td>
</tr>


<tr>
    <td style="padding: 0 20px 30px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            For any further questions, feel free to reach out to us anytime.
        </p>
    </td>
</tr>



<tr>
    <td style="padding: 0 0 30px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Thank you for choosing us to make your event special!
        </p>
    </td>
</tr>



<tr>
    <td style="padding: 0 0 45px 20px;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">
            Best regards,
            <br>[Company Name] Team
        </p>
    </td>
</tr>

<tr bgcolor="#141414">
    <td style="padding: 15px 0 15px 0; text-align: center;">
        <table cellpadding="0" cellspacing="0" align="center">
            <tr>
                <td style="padding: 0 5px;">
                  <a href="#">
                    <img src="https://f003.backblazeb2.com/file/Event-management/linkedicon.png" alt="">
                  </a>
                </td>
                <td style="padding: 0 5px;">
                  <a href="#">
                   <img src="https://f003.backblazeb2.com/file/Event-management/instagram.png" alt="">
                  </a>
                </td>
                <td style="padding: 0 5px;">
                  <a href="#">
                    <img src="https://f003.backblazeb2.com/file/Event-management/facebook.png" alt="">
                  </a>
                </td>
              </tr>
        </table>
    </td>
</tr>


<tr bgcolor="#141414">
    <td style="padding: 15px 0 5px 0;border-top:1px solid #444444">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC; text-align: center;">
            Thank you for choosing us to make your event special!
        </p>
    </td>
</tr>


<tr bgcolor="#141414">
    <td style="padding: 0 0 5px 0;">
        <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC; text-align: center;">
            <a href="#" style="color:#CCCCCC;">Unsubscribe</a>
        </p>
    </td>
</tr>

</table>
    `;
};