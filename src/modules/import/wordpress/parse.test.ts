import fs from "fs";
import { parse } from "parse5";

import { getPublishedPost, htmlToSlateFragment, parseXml } from "./parse";
import sanitizeCode from "./sanitize-code";

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

describe("parse5", () => {
  test("전체 HTML 문서가 아니라 부분 HTML 도 잘 동작하는지 확인 (html, head, body 는 무조건 생성됨.)", () => {
    const html = '<div class="test">test<br></div>';
    const result = parse(html);
    const body = result.childNodes.find((node) => node.nodeName === "body");
    expect(body).toMatchInlineSnapshot("undefined");
  });
});

describe("htmlToSlateFragment", () => {
  test("기본 동작", () => {
    const html = parse(`
    <h1>  hello h1</h1>
    <h2>hello   h2</h2>
    <p>hello p   </p>
    <h3>hello <strong>h3</strong> </h3>
    <h4>hell<i>o </i>h4</h4>
    <!-- comment -->
    <p><br></p>
    <p></p>
    <h5>hello h5</h5>
    <h6>hello h6</h6>
    <img src="test-src">
    `);
    const result = htmlToSlateFragment(html);
    expect(result).toMatchSnapshot();
  });

  describe("Wordpress Content", async () => {
    const wpJson = await parseXml(xmlFile);
    const wpItems = getPublishedPost(wpJson);
    wpItems.forEach((post) => {
      it(`실제 워드프레스 포스팅을 잘 변환해야 함: ${post.post_id}`, () => {
        const htmlParsed = parse(sanitizeCode(post.content));
        const result = htmlToSlateFragment(htmlParsed);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
