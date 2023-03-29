import { getEnvVar } from "../utils/common.utils"
import { HttpClient } from "../clients/http.client"
import { AxiosHeaders } from "axios"

export class DataAggregator {
  private itineraryBaseUrl = getEnvVar("REACT_APP_ITINERARY_RETRIEVER_API")
  private geocodeBaseUrl = getEnvVar("REACT_APP_GEOCODE_URL")
  private personalEmail = getEnvVar("REACT_APP_EMAIL")
  private httpClient = new HttpClient()

  async getItinerary(destination: string, days: string) {
    const url = `${this.itineraryBaseUrl}?destination=${destination}&days=${days}`
    const headers = new AxiosHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Methods": "OPTIONS,GET",
      "Access-Control-Allow-Headers": "Content-Type",
    })

    const response = await this.httpClient.get(url, headers)

    return response.data
  }

  async getGeocode(destination: string): Promise<NominatimResult[]> {
    const url = `${this.geocodeBaseUrl}?format=json&q=${destination}&accept-language=en&limit=1&email=${this.personalEmail}`
    const response = await this.httpClient.get(url)

    return response.data
  }

  async getItineraryWithGeocode(destination: string, days: string) {}
}
