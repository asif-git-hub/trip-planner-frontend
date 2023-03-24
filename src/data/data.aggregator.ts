import { getEnvVar } from "../utils/common.utils"
import { HttpClient } from "../clients/http.client"

export class DataAggregator {
  private baseUrl = getEnvVar("REACT_APP_ITINERARY_RETRIEVER_API")
  private httpClient = new HttpClient()

  async getItinerary(destination: string, days: string) {
    const url = `${this.baseUrl}?destination=${destination}&days=${days}`

    const response = await this.httpClient.get(url)

    return response.data
  }
}
