import { PhotoRetrieverResponseType } from "../api/photo.api"

export type DailyActivitiesType = {
  day: number
  city: string
  activities: ActivityType[]
}

export type ActivityType = {
  location: string
  description: string
  geocode?: {
    longitude: number
    latitude: number
  }
  custom?: boolean
}

export type ItineraryResponseType = DailyActivitiesType[]

export type POIDataType = {
  location: string
  description: string
}

export type PopularCitiesResponseType = {
  city: string
  description: string
  imgData?: PhotoRetrieverResponseType
}
