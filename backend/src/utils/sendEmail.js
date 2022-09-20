import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `${process.env.SENDER} < ${process.env.USER} >`,
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