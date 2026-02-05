import { beforeAll, afterAll } from 'vitest';
import prisma from 'lib/prisma';

beforeAll(async () => {
    try {
        await prisma.$connect();
        console.log('Database test connected');

        // test query
        await prisma.$queryRaw`SELECT 1`;
        console.log('Database query successful');

        // clean up tables
        await prisma.user.deleteMany();
        await prisma.verificationToken.deleteMany();
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err; // fail the test immediately
    }
});

afterAll(async () => {
    await prisma.$disconnect();
    console.log('Database test disconnected');
});