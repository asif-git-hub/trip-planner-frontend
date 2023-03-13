import { AxiosResponse } from 'axios';
import axios from 'axios';

export class HttpClient {

    async get(url: string): Promise<AxiosResponse> {

        const response = await axios({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Request-Methods': 'OPTIONS,GET',
                "Access-Control-Allow-Headers" : "Content-Type",
            }
        });

        return response

    }
}