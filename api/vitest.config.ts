import 'dotenv/config';
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ['**/*.test.ts'],
        setupFiles: ["./tests/setup.ts"],
        env: {
            DATABASE_URL: process.env.DATABASE_URL_TEST,
            NODE_ENV: "test"
        }
    },
});
