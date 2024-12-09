

function formatDate(dateString) { const options = { day: '2-digit', month: 'short', year: 'numeric' }; const date = new Date(dateString); return date.toLocaleDateString('en-GB', options).replace(/ /g, ' '); }
module.exports = ({name , package}) => {
  console.log("package",package)
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
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;"> Hi ${name}, </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0px 20px 20px 20px">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;"> Thank you for your payment! You've successfully booked your upcoming event. </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0px 20px 20px 20px">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC;"> Here are the details of your transaction: </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px 20px 20px 0px;">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Event Name:</td>
          <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.package_name}</td>
        </tr>
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Your Location:</td>
          <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.location}</td>
        </tr>
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Booking Date:</td>
          <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${formatDate(package.bookingDate)}</td>
        </tr>
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Booking Status:</td>
         <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF; text-transform: capitalize;">
    ${package.status}
</td>

        </tr>
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Number Of Attendees:</td>
          <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.attendees}</td>
        </tr>
        <tr>
          <td style="padding: 5px 20px; font-size: 14px; color: #CCCCCC;">Amount Paid:</td>
          <td style="padding: 5px 10px; font-size: 14px; color: #FFFFFF;">${package.CurrencyCode} ${package.totalPrice}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; font-size: 14px; color: #CCCCCC;"> Our team will notify the service provider, and you can now relax knowing your event is in good hands. If you need to modify any details, view your booking, or get in touch with the service provider, please contact us. </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 20px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;"> Best regards, <br>[Company Name] Team </p>
    </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 10px 0; text-align: center; border-top: 1px solid #444444;">
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;">Thank you for choosing us to make your event special!</p>
      <p style="margin: 1px; font-size: 14px; color: #CCCCCC;">
        <a href="#" style="color: #CCCCCC;">Unsubscribe</a>
      </p>
    </td>
  </tr>
</table>
  `;
};
