import { getEnvVar } from "../utils/common.utils"
import { HttpClient } from "../clients/http.client"
import { AxiosHeaders } from "axios"

export class DataAggregator {
  private itineraryBaseUrl = getEnvVar("REACT_APP_ITINERARY_RETRIEVER_API")

  private httpClient = new HttpClient()

  async getItinerary(destination: string) {
    const url = `${this.itineraryBaseUrl}?destination=${destination}`
    const headers = new AxiosHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Methods": "OPTIONS,GET",
      "Access-Control-Allow-Headers": "Content-Type",
    })

    const response = await this.httpClient.get(url, headers)

    return response.data
  }
}
