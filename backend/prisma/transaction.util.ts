import { Prisma } from '@prisma/client';
import { db } from './db';

export async function withTransaction<T>(
  operation: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  try {
    return await db.$transaction(
      async (txClient) => {
        return operation(txClient);
      },
      { timeout: 14500 }
    );
  } catch (error) {
    throw new Error(`Database transaction failed: ${error}`);
  }
}
