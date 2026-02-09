import request from "supertest";
import { describe, it, expect, test } from "vitest";
import { app } from "../../../app";
import prisma from "lib/prisma";
import * as repo from "modules/auth/auth.repo";
import cookie from 'cookie-parser';

describe("Auth module: Signup", () => {
    let token: string;
    let userId: string;

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

            token = user?.verificationTokens[0]?.token!;
            userId = user?.id!;
        });

        it("ERROR: should not allow used email", async () => {
            const res = await request(app)
            .post("/auth/signup/local")
            .send({
                email: "kbgarcia1513@gmail.com",
                firstname: "Karl",
                lastname: "Garcia",
                username: "",
                password: "@Thisisatest1234",
                confirmpassword: "@Thisisatest1234",
            });

            expect(res.status).toBe(500);
            expect(res.body.code).toBe("P2002");
            expect(res.body.message).toBe("Email/username already in use");
        });
    });

    describe("Verify after signup", () => {
        it("SUCCESS: Verifies the email", async() => {
            const res = await request(app)
            .get("/auth/verify")
            .query({ token })

            expect(res.status).toBe(200);
            expect(res.body.data.isVerified).toBe(true);
        });

        it("ERROR: Token is expired", async() => {
            const expiredToken = await prisma.verificationToken.create({
                data: {
                    token: "expired-token-123",
                    expiresAt: new Date(Date.now() - 1000 * 60 * 60),
                    userId: userId
                }
            });

            const res = await request(app)
                .get("/auth/verify")
                .query({ token: expiredToken.token });

            expect(res.status).toBe(401);
            expect(res.body.message).toContain("Token is expired");
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

    it("ERROR: Email must be verified first before logging in", async () => {});

    it("SUCCESS: findUserByEmail returns created user", async () =>{
        const user = await repo.findUserByEmail('kbgarcia1513@gmail.com');
        expect(user?.credentials).toBeDefined;
        expect(user?.profile).toBeDefined;
    });

    it("SUCCESS: access token is granted to returned user", {timeout: 60_000}, async () => {
        const res = await request.agent(app)
        .post("/auth/login")
        .send({
            email: "kbgarcia1513@gmail.com",
            password: "@Thisisatest1234"
        });
        const rawCookies = res.headers['set-cookie'];
        const cookies = Array.isArray(rawCookies) ? rawCookies : rawCookies ? [rawCookies] : [];

        console.log(cookies);
        
        expect(res.status).toBe(200);
        expect(cookies).toBeDefined();
        expect(cookies).toHaveLength(2);
        expect(cookies.some(cookie => cookie.includes('access_token'))).toBe(true);
        expect(cookies.some(cookie => cookie.includes('refresh_token'))).toBe(true);
    });

    it("SUCCESS: Refresh token must be linked/saved to logged user", async () => {});

    it("SUCCESS: Refresh token must renew access token after it is expired", async () => {});


});