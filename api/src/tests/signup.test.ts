import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../app";

describe("POST /auth/signup", () => {

    it("should create a user", async () => {
        const res = await request(app)
        .post("/auth/signup")
        .send({
            email: "kbgarcia1513@gmail.com",
            firstname: "Karl",
            lastname: "Garcia",
            username: "",
            password: "@Thisisatest1234"
        });

        expect(res.status).toBe(200);
        expect(res.body.email).toBe("kbgarcia1513@gmail.com");
        expect(res.body.isVerified).toBe(false);
    });
});
