import { Prisma } from '@prisma/client';
import { db } from './db';

export async function withTransaction<T>(
  operation: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
    return await db.$transaction(
      async (txClient) => {
        return operation(txClient);
      },
      { timeout: 14500 }
    );
 
}
