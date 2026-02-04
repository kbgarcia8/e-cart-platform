import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "prisma/schema/generated/prisma/index";

if (process.env.NODE_ENV === "test") {
    if (!process.env.DATABASE_URL?.includes("test")) {
        throw new Error("❌ Tests are not allowed to use the main database");
    }
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: process.env.NODE_ENV === "dev" ? { rejectUnauthorized: false } : false, //for access denied error due to SSL/TSL
});

const prisma = new PrismaClient({ adapter });

export default prisma;