module.exports = (name, package) => {
  return `
<table align="center" style="max-width: 600px; font-family: Arial;" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
  <tr bgcolor="#141414">
    <td style="padding: 20px 2px 0 2px; text-align: center;">
      <p style="margin: 1px;">
        <a href="https://user-event.vercel.app/">
          <img style="max-width:150px;" src="https://f003.backblazeb2.com/file/Event-management/logo.png" alt="">
        </a>
      </p>
    </td>
  </tr>

  <tr bgcolor="#141414">
    <td style="padding: 40px 2px 10px 2px; text-align: center;">
      <p style="margin: 1px;">
        <img src="https://i.ibb.co/CV8frHp/emailbanner.png" alt="Email Banner">
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:40px 20px 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;">
        Hi ${name},
      </p>
${package?.package?.map((service) => `
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;">
        Thank you for your payment! You've successfully booked ${service?.services_provider_name} for your upcoming event.
      </p>
`)}
      
    </td>
  </tr>

  <tr>
    <td style="padding: 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;">
        Here are the details of your transaction:
      </p>
    </td>
  </tr>

            <tr>
              <td style="padding: 20px 20px 20px 0;">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Package Name:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.package_name}</td>
                  </tr>
                   <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Location:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.location}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Booking Date:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.bookingDate}</td>
                  </tr>
                    <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Booking Status:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.status}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Attendees:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.attendees}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 10px; font-size: 14px; color: #CCCCCC;">Amount Paid:</td>
                    <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.totalPrice}</td>
                  </tr>
                
                 
                </table>
              </td>
            </tr>

  <tr>
    <td style="padding: 20px; font-size: 14px; color: #CCCCCC;">
      Our team will notify the service provider, and you can now relax knowing your event is in good hands. If you need to modify any details, view your booking, or get in touch with the service provider, visit your dashboard [Insert link to dashboard].
    </td>
  </tr>

  <tr bgcolor="#141414">
    <td style="padding: 20px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;">
        Best regards,<br>[Company Name] Team
      </p>
    </td>
  </tr>

  <tr bgcolor="#141414">
    <td style="padding: 10px 0; text-align: center; border-top: 1px solid #444444;">
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;">Thank you for choosing us to make your event special!</p>
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;"><a href="#" style="color: #CCCCCC;">Unsubscribe</a></p>
    </td>
  </tr>
</table>
  `;
};
