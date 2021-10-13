const nodemailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, PASSWORD_EMAIL_ADDRESS } = process.env;

const sendEmail = (to, url, txt) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: SENDER_EMAIL_ADDRESS,
      pass: PASSWORD_EMAIL_ADDRESS,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "Mytoandeptrainhatthegian",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Mytoandeptrainhatthegian.</h2>
            <p>Congratulations! You're almost set to start using my website.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("success");
  });
};

module.exports = sendEmail;
