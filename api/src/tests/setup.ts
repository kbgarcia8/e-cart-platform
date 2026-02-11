import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import prisma from 'lib/prisma';

beforeAll(async () => {
    try {
        await prisma.$connect();
        console.log('Database test connected');

        await prisma.$queryRaw`SELECT 1`;
        console.log('Database query successful');

    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
});

beforeEach(async() => {
    await prisma.user.deleteMany();
});

afterEach(async() => {
    vi.useRealTimers();
})

afterAll(async () => {
    await prisma.$disconnect();
    console.log('Database test disconnected');
});