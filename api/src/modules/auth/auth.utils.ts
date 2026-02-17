import "dotenv/config";
import nodemailer from 'nodemailer';
import type { PublicUser, AuthUser } from "./auth.types";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_APP_PASS, // Your email password/API key from .env
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    //const verificationLink = `${process.env.API_BASE_URL}/auth/verify?token=${token}`; //? Your backend verification endpoint
    const verificationLink = `${process.env.CLIENT_BASE_URL}/auth/verify?token=${token}`; //? Your frontend verification endpoint
    
    const mailOptions = {
        from: 'no-reply@ecart.com',
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Please click the link below to verify your email address to use E-cart Platform:<br><a href="${verificationLink}">Verify Email</a></p>`,
        //html can be upgraded into TSX just use renderToStaticMarkup from react-dom-server to convert before supplying here
        //Create tsx in shared same level as api and web
    };

    //await transporter.sendMail(mailOptions);
    console.log('Mock verification email sent');
};

export function mapToAuthUserDTO(user:PublicUser): AuthUser {
    if (!user.profile) {
        throw new Error("Profile is required");
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        created_at: user.created_at.toISOString(),
        updated_at: user.updated_at.toISOString(),
        username: user.profile.username,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
    };
}