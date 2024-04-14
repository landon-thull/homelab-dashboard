import { expect, test } from "vitest";

import * as fetcher from "../../src/lib/fetcher";

test("returns error if file not present", async () => {
  const INVALID_DATA_FILE = "invalid_data_file";
  const data = await fetcher.fetchFile(INVALID_DATA_FILE);
  expect(data.error).toContain("no such file");
});

test("correctly reads config values", async () => {
  const data = await fetcher.fetchProps();
  const configResponse = data.configData.response;
  expect(configResponse).toBeDefined();
  expect(configResponse?.title).toBe("HomeLab Dashboard");
});
