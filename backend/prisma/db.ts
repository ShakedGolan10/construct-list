import { PrismaClient } from '@prisma/client'
import { initSoftDeleteMiddleware } from './middleware.prisma'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db

initSoftDeleteMiddleware(db)
