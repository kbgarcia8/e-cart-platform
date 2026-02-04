import { beforeAll, afterAll } from 'vitest';
import prisma from 'lib/prisma';

beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.deleteMany();
    await prisma.verificationToken.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});