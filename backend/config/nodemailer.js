import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.ADMIN_AUTH_EMAIL,
    pass: process.env.ADMIN_AUTH_PASSWORD,
  },
});

export default transporter;


