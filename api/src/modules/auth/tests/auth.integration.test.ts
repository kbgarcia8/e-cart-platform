import request from "supertest";
import { describe, it, expect, vi } from "vitest";
import { app } from "../../../app";
import prisma from "lib/prisma";
import * as repo from "modules/auth/auth.repo";

describe("Auth module: Signup", () => {
    describe("Signup user", () => {
        it("ERROR: should not allowed non-existent email", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia@test.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Email not valid/deliverable/existent');
        });

        it("ERROR: email is required", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/Email is required!|Email not valid/);
        });

        it("ERROR: firstname is required", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('First Name is required!');
        });

        it("ERROR: lastname is required", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Last Name is required!');
        });

        it("ERROR: invalid username characters", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "!@#$%^sadfasfjh0901928",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Username must contain alphanumeric characters only!');

            const res2 = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "asd",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res2.status).toBe(400);
            expect(res2.body.message).toContain('Username must be atleast 5 characters and at max 35 characters!');

            const res3 = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "asdasdwqe4233erewfdfst242135134eetertertrewtrewtwertwert24332432432432rewfdsfdfsrewtret",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res3.status).toBe(400);
            expect(res3.body.message).toContain('Username must be atleast 5 characters and at max 35 characters!');
        });

        it("ERROR: password is required, password is invalid", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "",
                confirmpassword: "",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Please provide a password!');

            const res2 = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "asd",
                confirmpassword: "asd",
            });

            expect(res2.status).toBe(400);
            expect(res2.body.message).toContain('Password must be at least 8 characters and include uppercase, lowercase, and a symbol');
        });

        it("ERROR: confirmpassword is required", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "",
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toContain('Please confirm password!');
        });

        it("SUCCESS: should create a user", {timeout: 10_000}, async () => {
            const data = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const res = await request(app)
            .post("/auth/signup/local")
            .send(data);

            expect(res.status).toBe(200);
            expect(res.body.data.user.email).toBe("kbgarcia1513@gmail.com");
            expect(res.body.data.user.isVerified).toBe(false);
            expect(res.body.message).toBe('User signup successful. Please verify email');

            const user = await prisma.user.findUnique({
                where: { email: data.email},
                include: {verificationTokens: true}
            });
        });

        //TODO: Find a way to explicitly determine if email or username is the one being duplicated
        it("ERROR: username must be unique", {timeout: 10_000}, async () => {
            const signupData = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const signup = await request(app)
            .post("/auth/signup/local")
            .send(signupData);

            expect(signup.status).toBe(200);
            expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
            //In the event username becomes same due to same first and last name and no username is provided
            const duplicateSignupData = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const duplicateSignup = await request(app)
                .post("/auth/signup/local")
                .send(duplicateSignupData);

            expect(duplicateSignup.status).toBe(500);
            expect(duplicateSignup.body.code).toBe("P2002");
            //expect(duplicateSignup.body.message).toBe("Email/username already in use");
        })

        it("ERROR: should not allow existing email", async () => {
            const data = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const signup = await request(app)
            .post("/auth/signup/local")
            .send(data);

            expect(signup.status).toBe(200);
            expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
            expect(signup.body.data.user.isVerified).toBe(false);
            expect(signup.body.message).toBe('User signup successful. Please verify email');

            const duplicate_signup = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(duplicate_signup.status).toBe(500);
            expect(duplicate_signup.body.code).toBe("P2002");
            expect(duplicate_signup.body.message).toBe("Email/username already in use");
        });
    });

    describe("Verify after signup", () => {
        it("SUCCESS: Verifies the email", async() => {
            const data = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const signup = await request(app)
            .post("/auth/signup/local")
            .send(data);

            expect(signup.status).toBe(200);
            expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
            expect(signup.body.data.user.isVerified).toBe(false);
            expect(signup.body.message).toBe('User signup successful. Please verify email');

            const user = await prisma.user.findUnique({
                where: { email: data.email},
                include: {verificationTokens: true}
            });

            const token = user?.verificationTokens?.token!;

            const verify = await request(app)
            .get("/auth/verify")
            .query({ token })

            expect(verify.status).toBe(200);
            expect(verify.body.data.isVerified).toBe(true);
        });

        it("ERROR: Token is expired", async() => {
            const data = {
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            }

            const signup = await request(app)
            .post("/auth/signup/local")
            .send(data);

            expect(signup.status).toBe(200);
            expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
            expect(signup.body.data.user.isVerified).toBe(false);
            expect(signup.body.message).toBe('User signup successful. Please verify email');

            const user = await prisma.user.findUnique({
                where: { email: data.email},
                include: {verificationTokens: true}
            });

            const userId = user?.id!;
            const expiredToken = await prisma.verificationToken.update({
                where: { userId: userId },
                data: {
                    expiresAt: new Date(Date.now() - 1000 * 60 * 60),
                }
            });

            const verify = await request(app)
                .get("/auth/verify")
                .query({ token: expiredToken.token });

            expect(verify.status).toBe(401);
            expect(verify.body.message).toContain("Verification email expired. Please try login for a new verification email to be sent");
        });
    });
});

describe("Auth module: Login", () => {
    it("ERROR: Email should be required", async () => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: "",
            password: ""
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch("Email is required");
    });

    it("ERROR: Password should be provided", async () => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: "kbgarcia1513@gmail.com",
            password: ""
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch("provide a password");
    });
    //TODO: Add login here, temporarilty remove it
    it("ERROR: Email must be verified first before logging in and if verification email still exists inform user", { timeout: 10_000 }, async () => {
        const data = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(data);

        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        const loginData = {
            email: data.email,
            password: data.password
        };

        const login = await request(app)
        .post("/auth/login")
        .send(loginData)

        expect(login.status).toBe(409);
        expect(login.body.message).toMatch("Existing verification email, please check and verify")
    });
    
    it("ERROR: If verification token is expired, a new verification token be sent when logging in unverified user", async () => {
        const signupData = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(signupData);
        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        const currentUser = await prisma.user.findUnique({
            where: { email: signupData.email},
            include: {verificationTokens: true}
        });

        const token = currentUser?.verificationTokens?.token!;
        
        //Force current token to expire and check if new token is sent
        const forceExpiration = new Date(Date.now() - 1000 * 60 * 60);

        await prisma.verificationToken.update({
            where: { token: token },
            data: { expiresAt: forceExpiration}
        });

        //Login expecting token is expired
        const loginData = {
            email: signupData.email,
            password: signupData.password
        }

        const login = await request(app)
        .post("/auth/login")
        .send(loginData)

        const oldToken = await prisma.verificationToken.findUnique({where: { token: token }});
        const newToken = await prisma.verificationToken.findFirst({where: {userId: currentUser?.id!}})
        //go to sendVerificationToken
        //expected for old token to be deleted/undefined
        expect(oldToken).toBeNull();
        //expected new token to exist and to be not equal to previous token
        expect(newToken).toBeDefined();
        expect(newToken?.token!).not.toEqual(oldToken?.token)
    });

    it("SUCCESS: findUserByEmail returns created user", async () =>{
        const data = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(data);

        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        const user = await repo.findUserByEmail('kbgarcia1513@gmail.com');
        expect(user?.credentials).toBeDefined;
        expect(user?.profile).toBeDefined;
    });

    it("SUCCESS: access token is granted to returned user", {timeout: 60_000}, async () => {
        const signupData = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(signupData);

        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        //force verify
        await prisma.user.update({
            where: { email: signupData.email },
            data: { isVerified: true }
        })

        const login = await request.agent(app)
        .post("/auth/login")
        .send({
            email: "kbgarcia1513@gmail.com",
            password: "@Thisisatest1234"
        });
        const rawCookies = login.headers['set-cookie'];
        const cookies = Array.isArray(rawCookies) ? rawCookies : rawCookies ? [rawCookies] : [];
        
        expect(login.status).toBe(200);
        expect(cookies).toBeDefined();
        expect(cookies).toHaveLength(2);
        expect(cookies.some(cookie => cookie.includes('access_token'))).toBe(true);
        expect(cookies.some(cookie => cookie.includes('refresh_token'))).toBe(true);
    });

    it("SUCCESS: Refresh token must be linked/saved to logged user", async () => {
        const signupData = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(signupData);
        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        //force verify
        await prisma.user.update({
            where: { email: signupData.email },
            data: { isVerified: true }
        })

        const loginData = {
            email: signupData.email,
            password: signupData.password
        }

        const login = await request.agent(app)
        .post("/auth/login")
        .send(loginData);

        const rawCookies = login.headers['set-cookie'];
        const cookies = Array.isArray(rawCookies) ? rawCookies : rawCookies ? [rawCookies] : [];

        const refreshToken = cookies.find(cookie => cookie.match('refresh')).split(' ')[0].split('=')[1].replace(';','')

        const user = await prisma.user.findUnique({ where: {email: loginData.email}, include:{refreshToken: true}});

        
        expect(login.status).toBe(200);
        expect(cookies).toBeDefined();
        expect(cookies).toHaveLength(2);
        expect(cookies.some(cookie => cookie.includes('refresh_token'))).toBe(true);
        expect(refreshToken).toEqual(user?.refreshToken?.token);
    });
});

describe("Auth module-shared: Dashboard/Protected Route", () => {
    it("SUCCESS: Existing refresh token is renewed and must renew access token after it is expired", {timeout: 10_000}, async () => {
        const agent = request.agent(app);
        const signupData = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(signupData);

        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        //force verify
        await prisma.user.update({
            where: { email: signupData.email },
            data: { isVerified: true }
        })

        const loginData = {
            email: signupData.email,
            password: signupData.password
        }

        const login = await agent
        .post("/auth/login")
        .send(loginData);

        const rawCookies = login.headers['set-cookie'];
        const cookies = Array.isArray(rawCookies) ? rawCookies : rawCookies ? [rawCookies] : [];
        const initialAccessToken = cookies.find(cookie => cookie.match('access')).split(' ')[0].split('=')[1].replace(';','');
        const initialRawRefreshToken = cookies.find(cookie => cookie.match('refresh')).split(' ')[0].split('=')[1].replace(';','');
        const initialrefreshToken = (await repo.findRefreshToken(initialRawRefreshToken)).token;

        expect(login.status).toBe(200);
        expect(cookies).toBeDefined();
        expect(cookies).toHaveLength(2);
        expect(cookies.some(cookie => cookie.includes('access_token'))).toBe(true);

        const dashboard = await agent
        .get("/auth/dashboard")

        const newRawCookies = dashboard.headers['set-cookie'];
        const newCookies = Array.isArray(newRawCookies) ? newRawCookies : newRawCookies ? [newRawCookies] : [];
        const newAccessToken = newCookies.find(cookie => cookie.match('access')).split(' ')[0].split('=')[1].replace(';','');
        const newRawRefreshToken = newCookies.find(cookie => cookie.match('refresh')).split(' ')[0].split('=')[1].replace(';','');
        const newrefreshToken = (await repo.findRefreshToken(newRawRefreshToken)).token;

        expect(dashboard.status).toBe(200);
        expect(newAccessToken).not.toEqual(initialAccessToken);
        expect(newrefreshToken).not.toEqual(initialrefreshToken);
    });

    it("ERROR: Expired refresh token must remind user to login again", {timeout: 12_000}, async () => {
        const agent = request.agent(app);
        const signupData = {
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl Brian",
            lastname: "Garcia",
            username: "notverified",
            password: "@Thisisatest1234",
            confirmpassword: "@Thisisatest1234",
        }

        const signup = await request(app)
        .post("/auth/signup/local")
        .send(signupData);

        expect(signup.status).toBe(200);
        expect(signup.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(signup.body.data.user.isVerified).toBe(false);

        //force verify
        await prisma.user.update({
            where: { email: signupData.email },
            data: { isVerified: true }
        })

        const loginData = {
            email: signupData.email,
            password: signupData.password
        }

        const login = await agent
        .post("/auth/login")
        .send(loginData);

        await new Promise(r => setTimeout(r, 10100));

        const dashboard = await agent
        .get("/auth/dashboard")
        
        expect(dashboard.status).toBe(401);
        expect(dashboard.body.message).toMatch("Session expired");
    })
});