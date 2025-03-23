import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { FechUserCheckInsHistoryUseCase } from '../fetch-user-check-in-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FechUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
