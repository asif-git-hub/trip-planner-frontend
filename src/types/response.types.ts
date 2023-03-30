export type DailyActivitiesType = {
  day: number
  city?: string
  activities: ActivityType[]
}

export type ActivityType = {
  location: string
  description: string
}

export type ItineraryData = {
  isJson?: boolean | undefined
  itinerary: DailyActivitiesType[]
}
