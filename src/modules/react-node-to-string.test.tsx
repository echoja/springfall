/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-key */
/* eslint-disable sonarjs/no-duplicate-string */

import assert from "assert";
import type React from "react";

import reactNodeToString from "./react-node-to-string";

type Test = [input: React.ReactNode, expectedOutput: string];

describe("react-node-to-string", () => {
  it("extracts correct string", () => {
    const tests: Test[] = [
      ["lorem ipsum", "lorem ipsum"],
      [123, "123"],
      [true, ""],
      [false, ""],
      [null, ""],
      [undefined, ""],
      [["lorem", "ipsum"], "loremipsum"],
      [["lorem", <>ipsum</>], "loremipsum"],
      [<></>, ""],
      [<>lorem ipsum</>, "lorem ipsum"],
      [
        <p>
          <strong>lorem</strong>ipsum
        </p>,
        "loremipsum",
      ],
    ];
    tests.forEach((test, index) => {
      assert.strictEqual(
        reactNodeToString(test[0]),
        test[1],
        `Test ${index} failed`
      );
    });
  });
});
