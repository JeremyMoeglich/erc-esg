import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma_client = new PrismaClient().$extends(withAccelerate());
