import axios, { AxiosInstance } from "axios";
import { FavroClientParams, GitLabClientParams } from "../shared";

export class GitlabClient {
  private client: AxiosInstance;
  private projectId: string
  private rootBranch: string;
  private params: GitLabClientParams;
  private favroParams: FavroClientParams;

  constructor(params: GitLabClientParams, favroParams: FavroClientParams) {
    this.params = params;
    this.client = axios.create({
      baseURL: params.url,
      headers: {
        "PRIVATE-TOKEN": params.token
      }
    });
    this.projectId = params.projectId;
    this.rootBranch = params.rootBranch;
    this.favroParams = favroParams;
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

  async getProjectName(): Promise<string> {
    const res = await this.client.get(`/projects/${this.projectId}`);
    return res.data.name;
  }

  async branchWithIdExists(favroSeqId: string): Promise<boolean> {
    const res = await this.client.get(`/projects/${this.projectId}/repository/branches`, {
      params: {
        search: `^${favroSeqId}`
      }
    });
    return res.data && res.data.length != 0;
  }

  async mrFromBranchToRootExists(branchName: string): Promise<boolean> {
    const res = await this.client.get(`/projects/${this.projectId}/merge_requestes`, {
      params: {
        state: "opened",
        source_branch: branchName
      }
    });
    return res.data && res.data.length != 0;
  }

  async createBranchWithSeqId(favroSeqId: string): Promise<boolean> {
    if(await this.branchWithIdExists(favroSeqId)) {
      console.log(`Branch ${favroSeqId} already exists`);
      return false;
    }
    try {
      const data = {
        branch: favroSeqId,
        ref: this.rootBranch
      }
      await this.client.post(`v4/projects/${this.projectId}/repository/branches`,data
      )
    } catch(err) {
      console.error(err);
    }
  }
}
