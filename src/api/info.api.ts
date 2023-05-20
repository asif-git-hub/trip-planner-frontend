import { HttpClient } from "../clients/http.client"
import { InfoResponseType } from "../types/response.types"
import { getEnvVar } from "../utils/common.utils"

export class InfoAPI {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient()
  }

  async getInfo(destination: string): Promise<InfoResponseType> {
    const baseUrl = getEnvVar("REACT_APP_INFO_API")

    const url = `${baseUrl}?destination=${destination}`

    const response = await this.httpClient.get(url)

    return response.data
  }
}
