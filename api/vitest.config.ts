import 'dotenv/config';
import { defineConfig } from "vitest/config";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    test: {
        environment: "node",
        include: ["src/modules/**/tests/*.test.ts"],
        setupFiles: ["./src/tests/setup.ts"],
        env: {
            DATABASE_URL: process.env.DATABASE_URL_TEST,
            NODE_ENV: "test"
        }
    },
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'src/lib'),
            modules: path.resolve(__dirname, 'src/modules'),
            prisma: path.resolve(__dirname, 'src/prisma'),
            shared: path.resolve(__dirname, 'src/shared'),
        }
    }
});
