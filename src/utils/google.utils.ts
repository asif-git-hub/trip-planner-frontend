import { ActivityType } from "../types/response.types"
import { getEnvVar } from "./common.utils"

export function createMapQuery(
  activities: ActivityType[],
  destination: string
): string {
  const numberOfActivities = activities.length
  const origin = encodeURIComponent(activities[0].location + " " + destination)

  const key = `key=${getEnvVar("REACT_APP_GOOGLE_API_KEY")}`

  let mapQuery = "https://www.google.com/maps/embed/v1/"

  if (numberOfActivities === 1) {
    mapQuery += `place?q=${origin}`
  }

  if (numberOfActivities === 2) {
    mapQuery += `directions?&origin=${origin}&destination=${encodeURIComponent(
      activities[1].location + " " + destination
    )}`
  }

  if (numberOfActivities > 2) {
    mapQuery += `directions?&origin=${origin}&waypoints=`

    for (let i = 1; i < numberOfActivities - 1; i++) {
      const waypoints = encodeURIComponent(
        activities[i].location + " " + destination
      )

      mapQuery += `${waypoints}`
      if (!(i === numberOfActivities - 2)) {
        mapQuery += `|`
      }
    }
    mapQuery += `&destination=${encodeURIComponent(
      activities[numberOfActivities - 1].location + " " + destination
    )}`
  }

  mapQuery += `&${key}`

  return mapQuery
}
