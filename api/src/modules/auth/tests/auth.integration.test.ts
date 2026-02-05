import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../../app";

describe("POST /auth/signup/local", () => {
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

        console.log("Response body:", res.body);

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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('Email is required!');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('First Name is required!');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('Last Name is required!');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('Username must contain alphanumeric characters only!');

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
        expect(res2.body.message).includes('Username must be atleast 5 characters and at max 35 characters!');

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
        expect(res3.body.message).includes('Username must be atleast 5 characters and at max 35 characters!');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('Please provide a password!');

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

        console.log("Response body:", res.body);

        expect(res2.status).toBe(400);
        expect(res2.body.message).includes('Password must be at least 8 characters and include uppercase, lowercase, and a symbol');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(400);
        expect(res.body.message).includes('Please confirm password!');
    });
/*
    it("SUCCESS: should create a user", async () => {
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


        console.log("Response body:", res.body);

        expect(res.status).toBe(200);
        expect(res.body.data.user.email).toBe("kbgarcia1513@gmail.com");
        expect(res.body.data.user.isVerified).toBe(false);
        expect(res.body.message).toBe('User signup successful. Please verify email');
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

        console.log("Response body:", res.body);

        expect(res.status).toBe(500);
        expect(res.body.code).toBe("P2002");
        expect(res.body.message).toBe("Email/username already in use");
    });
    */
});
