import { getParams } from "../src/shared";

describe("Parameter fetching test", () => {
  test("Should succesfully return parameters from param store", async ()=> {
    const res = await getParams("demo");
    console.log(res);
    expect(res).toBeTruthy();
  });
});