import fs from "fs";

import { getPublishedPost, parseXml } from "./parse";

const xmlFile = fs.readFileSync(
  "./src/modules/import/wordpress/__mocks__/underthepencil.WordPress.2022-12-17.xml"
);

describe("parseXml", () => {
  test("제대로 동작해야 함", async () => {
    const result = await parseXml(xmlFile);
    expect(result).toMatchSnapshot();
  });
});

describe("getPublishedPost", () => {
  test("제대로 동작해야 함", async () => {
    const result = await parseXml(xmlFile);
    const publishedPost = getPublishedPost(result);
    expect(publishedPost).toMatchSnapshot();
  });
});
