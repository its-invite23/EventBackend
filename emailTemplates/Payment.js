
const formatDate = (dateString) => { const options = { year: 'numeric', month: 'short', day: 'numeric' }; const date = new Date(dateString); return date.toLocaleDateString('en-GB', options); };
const moment = require("moment");

module.exports = ({ name, package, payment_id }) => {
  return `
<table align="center" style="max-width: 600px; font-family: arial;" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
  <tr bgcolor="#141414">
    <td style="padding: 20px 2px 0 2px; text-align: center;">
      <p style="margin: 1px;">
        <a href="https://www.its-invite.com/">
          <img style="max-width:150px;" src="https://f003.backblazeb2.com/file/Event-management/logo.png" alt="">
        </a>
      </p>
    </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 40px 2px 10px 2px; text-align: center;">
      <p style="margin: 1px;">
        <img src="https://f003.backblazeb2.com/file/Event-management/emailbanner.png" alt="">
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:40px 20px 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC; text-transform: capitalize;"> Hi ${name}, </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 20px 25px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">Thank you for your payment! We’re thrilled to confirm that your upcoming event is now successfully booked. 🎊 </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 20px 25px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Here are the details of your transaction: </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 0 40px 20px;">
      <table>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Payment Date: </p>
          </td>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
              <strong> ${formatDate(package?.created_at)} </strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Event Name: </p>
          </td>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
              <strong>${package?.booking_id?.package_name?.replaceAll("_", " ")}</strong>

            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Booking Date: </p>
          </td>
         <td style="padding: 0 15px 10px 0;">
  <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #fff;">
    <strong>
      ${moment(package?.booking_id?.bookingDate, "DD-MM-YYYY").format("DD MMM YYYY")}
    </strong>
  </p>
</td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Payment Type: </p>
          </td>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff ; text-transform: capitalize;">
              <strong> ${package?.payment_type} </strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Payment Status: </p>
          </td>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; text-transform: capitalize; font-weight: normal; color:#fff">
              <strong> ${package?.payment_status} </strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Amount Paid: </p>
          </td>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
              <strong> ${package?.amount} </strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 15px 10px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Payment ID: </p>
          </td>
          <td style="padding: 0 15px 15px 0;">
            <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#fff">
              <strong> ${payment_id} </strong>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 20px 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC">Our team will notify the service provider immediately, and you can now sit back and relax knowing your event is in expert hands. 💼✨ </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 20px 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> If you need to modify any details, view your booking, or connect with the service provider, simply contact us—we’re here to help! </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 0 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> For any other questions, don’t hesitate to reach out anytime. </p>
    </td>
  </tr>
  
    <tr>
    <td style="padding: 0 0 30px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Thank you for trusting Invite to make your celebration truly special. We can’t wait to bring your event to life! </p>
    </td>
  </tr>
    <tr>
   
  <tr>
    <td style="padding: 0 0 45px 20px;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC"> Warm regards, <br> The Invite Team 🌟 </p>
    </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 15px 0 15px 0; text-align: center;">
       <table cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td style="padding: 0 5px;">
            <a href="https://www.linkedin.com/company/itsinvite" target="_blank">
              <img src="https://f003.backblazeb2.com/file/Event-management/linkedicon.png" alt="">
            </a>
          </td>
          <td style="padding: 0 5px;">
            <a href="https://www.instagram.com/itsinvite_/" target="_blank">
              <img src="https://f003.backblazeb2.com/file/Event-management/instagram.png" alt="">
            </a>
          </td>
          <td style="padding: 0 5px;">
            <a href="https://www.tiktok.com/(at_the_rate)itsinvite_" target="_blank">
              <img src="https://f003.backblazeb2.com/file/Event-management/ri_tiktok-line.png" alt="">
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 15px 0 10px 0;border-top:1px solid #444444">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color:#CCCCCC; text-align: center;"> Thank you for choosing us to make your event special! </p>
    </td>
  </tr>
</table>
    `;
};