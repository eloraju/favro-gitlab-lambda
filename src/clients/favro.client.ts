import axios, { AxiosInstance } from "axios";
import { FavroClientParams, GitLabClientParams } from "../shared";

export class FavroClient {
  private client: AxiosInstance;
  private params: FavroClientParams;
  private gitlabParams: GitLabClientParams;

  constructor(params: FavroClientParams, gitlabParams: GitLabClientParams) {
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
    this.gitlabParams = gitlabParams;
  }

  async getOrgInfo() {
    try {
      const res = await this.client.get(`/organizations/${this.params.orgId}`);
      return res.data;
    } catch(err) {
      console.log(`Error fetching org info: ${JSON.stringify(err)}`)
      return "Error with favro client";
    }
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
