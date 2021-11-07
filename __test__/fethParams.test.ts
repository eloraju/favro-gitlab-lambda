import { getParams } from "../src/shared";

describe("Parameter fetching test", () => {
  test("Should succesfully return parameters from param store", async ()=> {
    // Uses default aws account from ~/.aws/credentials
    const res = await getParams("demo");

  });
});