import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'TS Gym',
      description: 'The typescript academy',
      phone: '',
      latitude: 38.72225350690959,
      longitude: -9.139337019894606,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 38.72225350690959,
      userLongitude: -9.139337019894606,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2025, 2, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 38.72225350690959,
      userLongitude: -9.139337019894606,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 38.72225350690959,
        userLongitude: -9.139337019894606,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice a day but in different days', async () => {
    vi.setSystemTime(new Date(2025, 2, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 38.72225350690959,
      userLongitude: -9.139337019894606,
    })

    vi.setSystemTime(new Date(2025, 2, 11, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 38.72225350690959,
      userLongitude: -9.139337019894606,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in far away to the gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS Gym',
      description: 'The javascript academy',
      phone: '',
      latitude: new Decimal(38.75892052754228),
      longitude: new Decimal(-9.329163995412387),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: 38.72225350690959,
        userLongitude: -9.139337019894606,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
