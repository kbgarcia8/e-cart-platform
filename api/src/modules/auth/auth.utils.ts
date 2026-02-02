import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use an email service like SendGrid, Mailtrap, or Gmail
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_APP_PASS, // Your email password/API key from .env
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    //const verificationLink = `${process.env.API_BASE_URL}/auth/verify?token=${token}`; //? Your backend verification endpoint
    const verificationLink = `${process.env.CLIENT_BASE_URL}/auth/verify?token=${token}`; //? Your backend verification endpoint

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Please click the link below to verify your email address to use E-cart Platform:<br><a href="${verificationLink}">Verify Email</a></p>`,
        //html can be upgraded into TSX just use renderToStaticMarkup from react-dom-server to convert before supplying here
        //Create tsx in shared same level as api and web
    };

    await transporter.sendMail(mailOptions);
};
