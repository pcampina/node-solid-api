import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Neaby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The javascript academy',
      phone: '',
      latitude: 38.761229906083955,
      longitude: -9.243046861913403,
    })

    await gymsRepository.create({
      title: 'Far away Gym',
      description: 'The typescript academy',
      phone: '',
      latitude: 38.76777129749722,
      longitude: -9.097151231637204,
    })

    const { gyms } = await sut.execute({
      userLatitude: 38.75811340479815,
      userLongitude: -9.251766315296589,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
