import axios from "axios";
import { EnvKeys } from "./shared";

export class GitlabClient {
  private client = axios.create({
    baseURL: process.env[EnvKeys.GITLAB_API_URL],
    headers: {
      "PRIVATE-TOKEN": process.env[EnvKeys.GITLAB_TOKEN]
    }
  });
  private projectId = process.env[EnvKeys.GITLAB_PROJECT_ID];

  async createBranch(branch: string) {
    try {
//      const res = await this.client.post(
//        `/v4/projects/${this.projectId}/repository/branches`,
//        {
//          query: {
//            branch,
//            ref: process.env[EnvKeys.GITLAB_ROOT_BRANCH]
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
  private client = axios.create({
    baseURL: "https://favro.com/api/v1",
    auth: {
      username: process.env[EnvKeys.FAVRO_USER],
      password: process.env[EnvKeys.FAVRO_KEY]
    },
    headers: {
      organizationId: process.env[EnvKeys.FAVRO_COMPANY]
    }
  });

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