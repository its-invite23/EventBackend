module.exports = (paymentLink, userName, price, CurrencyCode) => {
  return `
 <table align="center" style="max-width: 600px; font-family: arial; text-align: center; margin: 0 auto;" align="left" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
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
    <td style="padding: 40px 10px 10px 10px; text-align: center;">
      <p style="margin: 1px;">
        <img src="https://f003.backblazeb2.com/file/Event-management/forgetpass.png" alt="Forgot Password">
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 10px 20px 10px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;" ali-> Hi ${userName}, </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 10px 30px 10px; text-align: center;">
      <p style="margin: 1px; font-size: 14px;line-height: 18px; font-weight: normal; color: #CCCCCC;"> 
      Your event is just a step away from being confirmed! To secure your booking, simply click the button below to complete your payment of  <span style="font-weight: bold; font-family: Arial, sans-serif;"> ${price.toFixed(2)} ${CurrencyCode}</span>
 </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0px 0 50px 10px; text-align: center;">
      <a href=${paymentLink} target="_blank" style="padding: 15px 20px; background: #EB3465; font-size: 14px; color: #ffffff; text-decoration: none; border-radius: 60px; display: inline-block;">Pay Now</a>
    </td>
  </tr>
  

<tr>
  <td style="padding: 0 10px 20px 10px; text-align: center;">
    <p style="margin: 1px; font-size: 14px; line-height: 18px; font-weight: bold; color: #CCCCCC;">
      This link will expire in 24 hours, so don’t wait too long to confirm!
    </p>
  </td>
</tr>

  
  
    <tr>
    <td style="padding: 0 10px 20px 10px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; line-height: 18px; font-weight: normal; color: #CCCCCC;">  Once your payment is confirmed, we’ll handle the rest and keep you updated every step of the way. We’re thrilled to help make your event unforgettable!
 </p>
    </td>
  </tr>
  
  <tr>
    <td style="padding: 0 0 30px 20px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">Need assistance or have questions? Just reply to this email—we’re here to help.
</p>
    </td>
  </tr>
  
    <tr>
    <td style="padding: 0 0 30px 20px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;">Let’s make magic happen! ✨
</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0 0 45px 10px; text-align: center;">
      <p style="margin: 1px; font-size: 14px; line-height: 20px; font-weight: normal; color: #CCCCCC;"> Warm regards, <br> The Invite Support Team 🌟 </p>
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
    <td style="padding: 15px 0 5px 0; border-top: 1px solid #444444; text-align: center;">
      <p style="margin: 1px; font-size: 14px; font-weight: normal; color: #CCCCCC;"> Copyright (C) 2024 invite. All rights reserved. </p>
    </td>
  </tr>
  <tr bgcolor="#141414">
    <td style="padding: 0 0 15px 0; text-align: center;">
      <p style="margin: 1px; font-size: 12px; font-weight: normal; color: #CCCCCC;"> You are receiving this email because you initiated a booking and need to complete the payment to confirm it. </p>
    </td>
  </tr>
</table>
    `;
};
