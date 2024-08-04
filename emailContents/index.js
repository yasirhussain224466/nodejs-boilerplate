const appConfig = require("../config/appConfig");
module.exports = {
  app_user_welcome: {
    subject: () => "Welcome to XYZ!",
    body: ({ first_name, last_name }) => `
      <span>Dear,</span>
      <br/>
      <span>${first_name}</span> <span>${last_name}</span>,

      <p>Welcome to XYZ! As a valued contractor/subcontractor, you now have access to a powerful application designed to connect you with potential clients and streamline your workflow. With The XYZ, finding the perfect job and managing your projects has never been easier.</p>
  
      <p>We believe that The XYZ will revolutionize the way you connect with clients and manage your projects. We're excited to have you on board as an early user, and we value your feedback in shaping the future of our application.</p>
  
      <p>If you have any questions, concerns, or suggestions, please don't hesitate to reach out to our support team at <a href="mailto:[email protected]">${appConfig.AWS_SES_SENDER}</a>. We're here to assist you every step of the way.</p>
  
      <p>Thank you for choosing The XYZ. Together, let's build a stronger, more connected contracting community.</p>
  
      <p>Best regards,<br>
      The xyz Team</p>`,
  },
  support_user: {
    subject: () => `New Support Ticket - Urgent Attention Needed`,
    body: ({ email_address, subject, message }) => `
      <p>Dear <span>Customer Support Team</span>,</p>

      <p>We have received a new support request from a user. Below are the details for your immediate attention:</p>
  
      <p><span><b>User's Email</b></span>: <span>${email_address}</span></p>
      <p><span><b>Request Subject</b></span>: <span>${subject}</span></p>
      <p><span><b>User's Message</b></span>: <span>${message}</span></p>
      <br/>
      <p>Please look into this matter as soon as possible and reach out to the user to provide the necessary assistance.</p>
      <p>Thank you for your prompt attention to this matter.</p>
  
      <p>Best regards,<br>
      The xyz Team</p>`,
  },
  password_reset: {
    subject: ({ first_name, last_name }) =>
      `${first_name} ${last_name}, your requested password update`,
    body: ({ first_name, last_name }) => `
      <p>${first_name} ${last_name},</p>

      <p>A request has been received to change the password for your XYZ account.</p>`,
  },
  mobile_password_reset: {
    subject: () => `XYZ Password Reset Request`,
    body: ({ first_name, reset_code }) => `
      <p>Hi ${first_name},</p>

      <p>A request has been received to change the password for your xyz account.</p>

      <p>Click below to reset your password. If you did not request a password reset please <span style="color: #E87426;"> </span> <a href="mailto:${appConfig.AWS_SES_SENDER}">contact support</a>.</p>
      <p>${reset_code}</p>
      `,
  },
  password_reset_confirmation_email: {
    subject: ({ first_name, last_name }) =>
      `${first_name} ${last_name}, your password has been updated`,
    body: ({ first_name, last_name }) => `
      <p>${first_name} ${last_name},</p>

      <p>The password for your XYZ account has been recently updated. If you did not request
      this password reset please contact us immediately simply by replying to this message</p>`,
  },
  app_user_appointed_admin: {
    subject: ({ businessName }) =>
      `You’ve been added as an Admin for ${businessName}`,
    body: ({
      firstName,
      lastName,
      businessName,
    }) => `<p>Dear ${firstName} ${lastName},</p>

      <p>We are excited to inform you that you have been appointed to become an Admin User for ${businessName}. Congratulations on your new role! As an Admin User, you now have enhanced privileges and responsibilities within the app to manage and oversee the operations of your business.</p>
  
      <p>As an Admin User, you will have access to a range of features and functionalities that enable you to:</p>
      <ul>
          <li>Manage user accounts, businesses, industries, and permissions.</li>
          <li>Monitor and moderate content within the app.</li>
          <li>Update business information and settings.</li>
          <li>View and respond to user reviews and inquiries.</li>
          <li>Collaborate with other Admin Users to enhance the user experience.</li>
      </ul>
  
      <p>You can access the Admin Portal by following this link: <a href="http://XYZ-admin.com">XYZ-admin.com</a>.</p>
  
      <p>We trust that you will embrace your new role with enthusiasm and professionalism. Your contributions as an Admin User will play a vital role in shaping the success of your business within our app community.</p>
  
      <p>If you have any questions or require assistance regarding the app's features or your new responsibilities, please don't hesitate to reach out to our support team. We are here to provide guidance and support as you navigate your new role.</p>
  
      <p>Once again, congratulations on your appointment as an Admin User for ${businessName}. We look forward to witnessing the positive impact you will make within our app community.</p>
  
      <p>Best regards,<br>
      The XYZ Team</p>`,
  },
  content_flagged: {
    subject: () => "Urgent: Flagged Content Notification",
    body: ({
      firstName,
      lastName,
      dateReported,
      typeReported,
      reasonReported,
    }) => `<p>Dear ${firstName} ${lastName},</p>

    <p>Our content monitoring system has detected content that violates our community guidelines and standards.</p>

    <p>Details of the flagged content:</p>
    <ul>
        <li>Date and time of flagging: ${dateReported}</li>
        <li>Nature of the content: ${typeReported}</li>
        <li>Reason for flagging: ${reasonReported}</li>
    </ul>

    <p>Please log into your XYZ Admin Portal to address this concern. Thank you for your prompt attention and dedication to upholding the standards of XYZ. Your efforts are highly valued and appreciated.</p>

    <p>Best Regards,<br>
    The XYZ Team</p>`,
  },
  confirm_business_information: {
    subject: () => "Annual Business Details Confirmation Required",
    body: ({
      firstName,
      lastName,
      businessName,
      businessAddress,
      businessMobileOrEmail,
      businessType,
      businessDescription,
    }) => `<p>Dear ${firstName} ${lastName},</p>

    <p>We hope this email finds you well. As part of our annual review process, we kindly request your cooperation in confirming the accuracy of your business details on XYZ. Ensuring that we have up-to-date and correct information is crucial for maintaining the quality and reliability of our services.</p>

    <p>To continue providing accurate and reliable information to our users, we kindly ask you to review the following details associated with your business:</p>
    <ul>
        <li>Business Name: ${businessName}</li>
        <li>Business Address: ${businessAddress}</li>
        <li>Contact Information: ${businessMobileOrEmail}</li>
        <li>Business Type: ${businessType}</li>
        <li>Business Description: ${businessDescription}</li>
    </ul>

    <p>If any of the above information has changed or requires updating, please provide us with the correct details by [deadline for submission]. You can simply reply to this email with the updated information, or if you prefer, you can visit our website and follow the instructions provided in your account settings.</p>

    <p>Ensuring the accuracy of your business details will help us maintain the integrity of our platform and enhance the experience for both your business and our users. It will also enable us to promote your services effectively and connect you with potential customers who are seeking your expertise.</p>

    <p>Should you have any questions or require assistance during this process, please do not hesitate to contact our support team. We are here to assist you in any way we can.</p>

    <p>Thank you for your prompt attention to this matter. Your cooperation is greatly appreciated, and we look forward to continuing our partnership for another successful year.</p>

    <p>Best Regards,<br>
    The XYZ Team</p>`,
  },
  notify_business_estimate_request: {
    subject: ({ businessName }) =>
      `New Estimate Request Received: ${businessName}`,
    body: ({
      businessName,
      customerName,
      customerPhoneOrEmail,
      description,
      notes,
    }) => `<p>Dear ${businessName},</p>

    <p>A potential customer has submitted a "Get an Estimate" request through our platform for your business. This presents an exciting opportunity to engage with a prospective client who is interested in your services.</p>

    <p>Here are the details of the request:</p>
    <ul>
        <li>Name: ${customerName}</li>
        <li>Contact Information: ${customerPhoneOrEmail}</li>
        <li>Service Requested: ${description}</li>
        <li>Additional Notes: ${notes}</li>
    </ul>

    <p>We encourage you to reach out to the customer as soon as possible to discuss their needs, provide an estimate, and potentially secure new business. To ensure a positive experience for both parties, we kindly request that you:</p>
    <ul>
        <li>Contact the customer within the next 24-48 hours to acknowledge their request and gather any additional information necessary for an accurate estimate.</li>
        <li>Provide a detailed and transparent estimate based on the customer's requirements.</li>
        <li>Address any questions or concerns the customer may have regarding the estimate or your services.</li>
        <li>Follow up with the customer to gauge their interest and explore the possibility of scheduling an appointment or further discussion.</li>
    </ul>

    <p><em>Please note that the quality of your response and the timeliness of your communication greatly influence customer satisfaction and can impact your chances of securing the business.</em></p>

    <p>We strongly encourage you to prioritize this request and ensure a prompt and professional interaction with the customer.</p>

    <p>If you have any questions or require assistance throughout the estimation process, please do not hesitate to reach out to our support team. We are here to support you and help facilitate a successful outcome.</p>

    <p>Thank you for your attention to this matter. We appreciate your commitment to delivering excellent service to our customers and wish you every success in converting this potential lead into a valued client.</p>

    <p>Best Regards,<br>
    The XYZ Team</p>`,
  },
};
