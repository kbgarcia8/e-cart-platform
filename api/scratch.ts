import "dotenv/config";
import { PrismaClient } from "./src/prisma/schema/generated/prisma/index.js";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false }, //for access denied error due to SSL/TSL
});

const prisma = new PrismaClient({ adapter });

async function getAllUsers() {
    const users = await prisma.user.findMany();
    console.log(users);
}

getAllUsers();