import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  console.log(process.env.HOST);
  console.log(process.env.USERNAME);
  console.log(process.env.PASS);
  console.log(process.env.SENDER);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASS,
      }
    });

    let info = await transporter.sendMail({
      from: `${process.env.SENDER} < ${process.env.USERNAME} >`,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
    console.log(info.messageId);

  } catch (error) {
    console.log(error, "email not sent");
  }
}

export default sendEmail;