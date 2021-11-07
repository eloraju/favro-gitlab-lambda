import axios from "axios";

export class ChuckClient {
  private client = axios.create({
    baseURL: "https://api.chucknorris.io/jokes",
  });

  async getRandomJoke(): Promise<string> {
    const res = await this.client.get("/random");
    return res.data.value
  }
}
