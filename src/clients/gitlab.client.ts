import axios, { AxiosInstance } from "axios";
import { GitLabClientParams } from "../shared";

export class GitlabClient {
  private client: AxiosInstance;
  private projectId: string
  private rootBranch: string;
  private params: GitLabClientParams;

  constructor(params: GitLabClientParams) {
    this.params = params;
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
