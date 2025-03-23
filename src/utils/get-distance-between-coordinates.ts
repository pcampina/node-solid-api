export interface Coordinate {
  latitude: number
  longitude: number
}

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 *
 * @param from - The starting coordinate with latitude and longitude.
 * @param to - The destination coordinate with latitude and longitude.
 * @returns The distance between the two coordinates in kilometers.
 *
 * The function first checks if the coordinates are the same, in which case it returns 0.
 * It then converts the latitude and longitude values from degrees to radians.
 * Using the Haversine formula, it calculates the distance between the two points.
 * The result is converted from degrees to kilometers before being returned.
 */
export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate,
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
