const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user:'rajanthakur1890@gmail.com', // Gmail address from which the mail will go to the admin
    pass:'sjwvqeyfcfjcomdl', // Gmail app password
  },
});

const sendEmail = async (ip, failureCount, ipAnalytics) => {
  try {
    const mailOptions = {
      from:'rajanthakur1890@gmail.com',
      to:'"prafullpandey2801@gmail.com"', // here write the admin mail address to which the alerting mail should go
      subject: "Alert: Excessive Failed Requests Detected",
      text: `
        Alert: The IP address ${ip} has triggered an excessive number of failed requests (${failureCount}) in the last 10 minutes.

        IP Analytics:
        - Total Failure Count: ${ipAnalytics.failureCount || 0}
        - Last Failure Time: ${ipAnalytics.lastFailureTime || "N/A"}

        Please check the database for more details.
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Alert email sent to admin for IP: ${ip}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendEmail;
