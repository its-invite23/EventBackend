const emailTemplate = (name, reply_message) => `
<table style="max-width: 400px; font-family: arial;text-align: left;" align="center" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000">
<tr bgcolor="#141414">
    <td style="padding: 20px 2px 0 2px; text-align: center;">
        <p style="margin: 1px;">
            <a href="#">
                <img src="https://i.ibb.co/yg37Knk/logo.png" alt="">
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
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC">
            Hi ${name},
        </p>
    </td>
</tr>

<tr>
    <td style="padding: 0 10px 30px 10px;">
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC; text-align: center;">
            Thank you for your message. <br> We have received your query and our team will respond to you shortly
           
        </p>
    </td>
</tr>






<tr>
    <td style="padding: 0 0 45px 20px;">
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC">
            ${reply_message}
        </p>
    </td>
</tr>






<tr>
    <td style="padding: 0 0 45px 20px;">
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC">
            Best regards, <br> [Company Name] Support Team
        </p>
    </td>
</tr>

<tr bgcolor="#141414">
    <td style="padding: 15px 0 15px 0; text-align: center;">
        <table cellpadding="0" cellspacing="0" align="center">
            <tr>
                <td style="padding: 0 5px;"><a href="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8 6.80029C14.073 6.80029 15.2939 7.30601 16.1941 8.20618C17.0943 9.10636 17.6 10.3273 17.6 11.6003V17.2003H14.4V11.6003C14.4 11.1759 14.2314 10.769 13.9314 10.4689C13.6313 10.1689 13.2243 10.0003 12.8 10.0003C12.3757 10.0003 11.9687 10.1689 11.6686 10.4689C11.3686 10.769 11.2 11.1759 11.2 11.6003V17.2003H8V11.6003C8 10.3273 8.50571 9.10636 9.40589 8.20618C10.3061 7.30601 11.527 6.80029 12.8 6.80029Z" stroke="#EB3465" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.80059 7.6001H1.60059V17.2001H4.80059V7.6001Z" stroke="#EB3465" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.20059 5.20024C4.08424 5.20024 4.80059 4.4839 4.80059 3.60024C4.80059 2.71659 4.08424 2.00024 3.20059 2.00024C2.31693 2.00024 1.60059 2.71659 1.60059 3.60024C1.60059 4.4839 2.31693 5.20024 3.20059 5.20024Z" stroke="#EB3465" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </a></td>
                <td style="padding: 0 5px;"><a href="#"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.6 18.0002H12.4C16.4 18.0002 18 16.4002 18 12.4002V7.60024C18 3.60024 16.4 2.00024 12.4 2.00024H7.6C3.6 2.00024 2 3.60024 2 7.60024V12.4002C2 16.4002 3.6 18.0002 7.6 18.0002Z" stroke="#EB3465" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.0002 12.8002C10.3679 12.8002 10.732 12.7278 11.0717 12.5871C11.4114 12.4463 11.7201 12.2401 11.9801 11.9801C12.2401 11.7201 12.4463 11.4114 12.5871 11.0717C12.7278 10.732 12.8002 10.3679 12.8002 10.0002C12.8002 9.63249 12.7278 9.26839 12.5871 8.92868C12.4463 8.58897 12.2401 8.2803 11.9801 8.0203C11.7201 7.76029 11.4114 7.55405 11.0717 7.41333C10.732 7.27262 10.3679 7.2002 10.0002 7.2002C9.25759 7.2002 8.5454 7.49519 8.0203 8.0203C7.49519 8.5454 7.2002 9.25759 7.2002 10.0002C7.2002 10.7428 7.49519 11.455 8.0203 11.9801C8.5454 12.5052 9.25759 12.8002 10.0002 12.8002Z" stroke="#EB3465" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.5088 6.00024H14.5184" stroke="#EB3465" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                    </a></td>
                <td style="padding: 0 5px;"><a href="#">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.999 7.8402V10.1602H14.079C14.239 10.1602 14.319 10.3202 14.319 10.4802L13.999 12.0002C13.999 12.0802 13.839 12.1602 13.759 12.1602H11.999V18.0002H9.59902V12.2402H8.23902C8.07902 12.2402 7.99902 12.1602 7.99902 12.0002V10.4802C7.99902 10.3202 8.07902 10.2402 8.23902 10.2402H9.59902V7.6002C9.59902 6.2402 10.639 5.2002 11.999 5.2002H14.159C14.319 5.2002 14.399 5.2802 14.399 5.4402V7.3602C14.399 7.5202 14.319 7.6002 14.159 7.6002H12.239C12.079 7.6002 11.999 7.6802 11.999 7.8402Z" stroke="#EB3465" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"/>
                        <path d="M12.7994 18.0002H7.99941C3.99941 18.0002 2.39941 16.4002 2.39941 12.4002V7.60024C2.39941 3.60024 3.99941 2.00024 7.99941 2.00024H12.7994C16.7994 2.00024 18.3994 3.60024 18.3994 7.60024V12.4002C18.3994 16.4002 16.7994 18.0002 12.7994 18.0002Z" stroke="#EB3465" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                </a></td>
            </tr>
        </table>
    </td>
</tr>


<tr bgcolor="#141414">
    <td style="padding: 15px 0 5px 0;border-top:1px solid #444444">
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC; text-align: center;">
            Copyright (C) 2024 invite. All rights reserved.
        </p>
    </td>
</tr>


<tr bgcolor="#141414">
    <td style="padding: 0 0 5px 0;">
        <p style="margin: 1px; font-size: 12px; font-weight: normal; color:#CCCCCC; text-align: center;">
            <a href="#" style="color:#CCCCCC;">Unsubscribe</a>
        </p>
    </td>
</tr>

</table>

`;

module.exports = emailTemplate;
