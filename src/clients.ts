import axios, {AxiosInstance} from "axios";
import { EnvKeys, FavroClientParams, GitLabClientParams } from "./shared";

export class GitlabClient {
  private client: AxiosInstance;
  private projectId: string
  private rootBranch: string;

  constructor(params: GitLabClientParams) {
    this.client = axios.create({
      baseURL: params.url,
      headers: {
        "PRIVATE-TOKEN": params.token
      }
    });
    this.projectId = params.projectId;
    this.projectId = params.projectId;
  }

  async createBranch(branch: string) {
    try {
//      const res = await this.client.post(
//        `/v4/projects/${this.projectId}/repository/branches`,
//        {
//          query: {
//            branch,
//            ref: this.rootBranch
//          }
//        }
//      );
//      return res.data;
      return Promise.resolve()
    } catch (err) {
      return "Error";
    }
  }
}

export class FavroClient {
  private client: AxiosInstance;

  constructor(params: FavroClientParams) {
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

  async moveCard(cardId: string) {
    //const res = await this.client.post("/");
    return Promise.resolve()
  }

  async updateReleased(cardId: string) {
    //const res = await this.client.post("/");
    return Promise.resolve()
  }
}

export class ChuckClient {
  private client = axios.create({
    baseURL: "https://api.chucknorris.io/jokes",
  });

  async getRandomJoke(): Promise<string> {
    const res = await this.client.get("/random");
    return res.data.value
  }
}