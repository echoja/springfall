import { getPublishedPost, parseXml } from "@modules/import/wordpress/parse";
import fs from "fs";
import { parse, parseFragment, serialize, serializeOuter } from "parse5";

import htmlToSlateNode from "./html-to-slate-node";
import sanitize from "./sanitize";

const xmlFile = fs.readFileSync(
  "./src/modules/import/wordpress/__mocks__/underthepencil.WordPress.2022-12-17.xml"
);

vi.mock("nanoid", () => {
  const nanoid = vi.fn(() => {
    return `mocked-nanoid-random-id`;
  });

  return { nanoid };
});

describe("parse5", () => {
  test("전체 HTML 문서가 아니라 부분 HTML 도 잘 동작하는지 확인 (html, head, body 는 무조건 생성됨.)", () => {
    const html = '<div class="test">test<br></div>';
    const result = parse(html);
    const body = result.childNodes.find((node) => node.nodeName === "body");
    expect(body).toMatchInlineSnapshot("undefined");
  });

  describe("serialize", () => {
    test("iframe", () => {
      const fragment = parseFragment(
        '<iframe src="test" width="200"></iframe>'
      );
      expect(serialize(fragment)).toEqual(
        '<iframe src="test" width="200"></iframe>'
      );
    });
    test("복잡한 iframe", () => {
      const fragment = parseFragment(
        '<iframe id="cp_embed_oNzRdJX" src="//codepen.io/anon/embed/oNzRdJX?height=500&theme-id=1&slug-hash=oNzRdJX&default-tab=result" height="500" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest name="CodePen Embed oNzRdJX" title="CodePen Embed oNzRdJX" class="cp_embed_iframe" style="width:100%;overflow:hidden">CodePen Embed Fallback</iframe>'
      );

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        serializeOuter(fragment.childNodes[0] as any)
      ).toMatchInlineSnapshot(
        '"<iframe id=\\"cp_embed_oNzRdJX\\" src=\\"//codepen.io/anon/embed/oNzRdJX?height=500&amp;theme-id=1&amp;slug-hash=oNzRdJX&amp;default-tab=result\\" height=\\"500\\" scrolling=\\"no\\" frameborder=\\"0\\" allowfullscreen=\\"\\" allowpaymentrequest=\\"\\" name=\\"CodePen Embed oNzRdJX\\" title=\\"CodePen Embed oNzRdJX\\" class=\\"cp_embed_iframe\\" style=\\"width:100%;overflow:hidden\\">CodePen Embed Fallback</iframe>"'
      );
    });
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
    const result = htmlToSlateNode(html);
    expect(result).toMatchSnapshot();
  });

  test("Text 끼리 중첩되었을 때 잘 동작해야 함", () => {
    const html = parse(`
    <p>123<em>h<strong>e<s>l</s>l</strong>o</em>h1</p>
    `);
    const result = htmlToSlateNode(html);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "text": "123",
              "type": "TEXT",
            },
            {
              "italic": true,
              "text": "h",
              "type": "TEXT",
            },
            {
              "bold": true,
              "italic": true,
              "text": "e",
              "type": "TEXT",
            },
            {
              "bold": true,
              "italic": true,
              "strikethrough": true,
              "text": "l",
              "type": "TEXT",
            },
            {
              "bold": true,
              "italic": true,
              "text": "l",
              "type": "TEXT",
            },
            {
              "italic": true,
              "text": "o",
              "type": "TEXT",
            },
            {
              "text": "h1",
              "type": "TEXT",
            },
          ],
          "type": "PARAGRAPH",
        },
      ]
    `);
  });

  test("텍스트 노드 안에 링크 있을 떄 처리", () => {
    const html = parse(`
    <p>123h<strong>easdf <a href="http://naver.com">adf</a> asdf</strong>asdf asdf</p>
    `);
    const result = htmlToSlateNode(html);
    expect(result).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "text": "123h",
              "type": "TEXT",
            },
            {
              "bold": true,
              "text": "easdf ",
              "type": "TEXT",
            },
            {
              "children": [
                {
                  "bold": true,
                  "text": "adf",
                  "type": "TEXT",
                },
              ],
              "type": "LINK",
              "url": "http://naver.com",
            },
            {
              "bold": true,
              "text": " asdf",
              "type": "TEXT",
            },
            {
              "text": "asdf asdf",
              "type": "TEXT",
            },
          ],
          "type": "PARAGRAPH",
        },
      ]
    `);
  });

  describe("Wordpress Content", async () => {
    const wpJson = await parseXml(xmlFile);
    const wpItems = getPublishedPost(wpJson);
    wpItems.forEach((post) => {
      it(`실제 워드프레스 포스팅을 잘 변환해야 함: ${post.post_id}`, () => {
        const htmlParsed = parse(sanitize(post.content));
        const result = htmlToSlateNode(htmlParsed);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
