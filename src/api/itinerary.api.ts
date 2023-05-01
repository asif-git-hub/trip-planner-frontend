import { HttpClient } from "../clients/http.client"
import { getEnvVar } from "../utils/common.utils"

export class ItineraryApi {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient()
  }

  async getPOI(location: string, destination: string) {
    const baseUrl = getEnvVar("REACT_APP_POI_API")
    const url = `${baseUrl}?location=${location}&destination=${destination}`

    const response = await this.httpClient.get(url)

    return JSON.parse(response.data)
  }

  async getPopularCities(country: string) {
    const baseUrl = getEnvVar("REACT_APP_POPCITY_API")
    const url = `${baseUrl}?country=${country}`

    const response = await this.httpClient.get(url)
    return response.data
  }
}
