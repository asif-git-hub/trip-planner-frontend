import { ActivityType } from "../types/response.types"
import { getEnvVar } from "./common.utils"
import { determineDestinationType } from "./destination.utils"

export function createMapQuery(
  activities: ActivityType[],
  city: string,
  destination: string
): string | undefined {

  if (activities && activities.length > 0) {
    
    const region = determineDestinationType(destination).region
    const numberOfActivities = activities.length
  
    const origin = encodeURIComponent(
      `${activities[0].location}, ${city}, ${region}`
    )
  
    const key = `key=${getEnvVar("REACT_APP_GOOGLE_API_KEY")}`
  
    let mapQuery = "https://www.google.com/maps/embed/v1/"
  
    if (numberOfActivities === 1) {
      mapQuery += `place?q=${origin}`
    }
  
    if (numberOfActivities === 2) {
      mapQuery += `directions?&origin=${origin}&destination=${encodeURIComponent(
        `${activities[1].location}, ${city}, ${region}`
      )}`
    }
  
    if (numberOfActivities > 2) {
      mapQuery += `directions?&origin=${origin}&waypoints=`
  
      for (let i = 1; i < numberOfActivities - 1; i++) {
        const waypoints = encodeURIComponent(
          `${activities[i].location}, ${city}, ${region}`
        )
  
        mapQuery += `${waypoints}`
        if (!(i === numberOfActivities - 2)) {
          mapQuery += `|`
        }
      }
      mapQuery += `&destination=${encodeURIComponent(
        `${activities[numberOfActivities - 1].location}, ${city}, ${region}`
      )}`
    }
  
    mapQuery += `&${key}`
  
    return mapQuery

  }
  
}
