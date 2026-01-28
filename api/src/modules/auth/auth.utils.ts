import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use an email service like SendGrid, Mailtrap, or Gmail
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email password/API key from .env
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.API_BASE_URL}/api/auth/verify?token=${token}`; // Your frontend verification URL

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Please click the link below to verify your email address:<br><a href="${verificationLink}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
};
