import axios, { AxiosInstance } from "axios";
import { FavroClientParams } from "../shared";

export class FavroClient {
  private client: AxiosInstance;
  private params: FavroClientParams;

  constructor(params: FavroClientParams) {
    this.params = params;
    this.client =  axios.create({
      baseURL: "https://favro.com/api/v1",
      auth: {
        username: params.user,
        password: params.key
      },
      headers: {
        organizationId: params.orgId
      }
    });
  }

  async getOrgInfo() {
    const res = await this.client.get(`/organizations/${this.params.orgId}`);
    return res.data
  }

  async moveCard(cardId: string) {
    //const res = await this.client.post("/");
    return Promise.resolve()
  }

  async updateReleased(cardId: string) {
    //const res = await this.client.post("/");
    return Promise.resolve()
  }
}