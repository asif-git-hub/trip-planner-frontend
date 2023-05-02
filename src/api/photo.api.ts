import { getEnvVar } from "../utils/common.utils"
import { HttpClient } from "../clients/http.client"

export type PhotoRetrieverResponseType = {
  photo: {
    description: string
    alt: string
    url: string
  }
  photographer: {
    name: string
    profile: string
  }
}[]

export class PhotoApi {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient()
  }

  async getPhoto(searchQuery: string): Promise<PhotoRetrieverResponseType> {
    const baseUrl = getEnvVar("REACT_APP_PHOTO_API")

    const url = `${baseUrl}?search=${searchQuery}`

    const response = await this.httpClient.get(url)

    return response.data
  }
}
