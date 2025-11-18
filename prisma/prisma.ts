import { PrismaClient } from "@prisma/client";

/**
 * Initializes a singleton Prisma Client instance for the application.
 *
 * This ensures that during development (with hot-reloading) we do not
 * create multiple PrismaClient instances, which can lead to warnings
 * about too many connections.
 *
 * @module prisma
 * @exports prisma - A singleton PrismaClient instance configured with error and warning logging.
 * @example
 * import { prisma } from "@/prisma/prisma";
 * const users = await prisma.user.findMany();
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["error", "warn"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
