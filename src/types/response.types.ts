export type DailyActivitiesType = {
  day: number
  city?: string
  activities: ActivityType[]
}

export type ActivityType = {
  location: string
  description: string
  geocode: {
    longitude: number
    latitude: number
  }
}

export type ItineraryData = {
  isJson?: boolean | undefined
  itinerary: DailyActivitiesType[]
}

export type POIDataType = {
  location: string
  description: string
}
