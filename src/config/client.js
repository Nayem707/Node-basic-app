import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import prismaPkg from '@prisma/client';

const { PrismaClient } = prismaPkg;

// Singleton pattern
class PrismaClientSingleton {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      });
      this.instance = new PrismaClient({ adapter });
    }
    return this.instance;
  }
}

export const prisma = PrismaClientSingleton.getInstance();
