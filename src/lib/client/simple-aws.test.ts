import AWSUploadManager from "./AWSFileManager";

describe("AWSUploadManager", () => {
  describe("getUpoadUrl", () => {
    // todo
    it.skip("잘 동작해야 함 (그때마다 다름)", async () => {
      const result = await AWSUploadManager.getUploadUrl();
      expect(result).toMatchInlineSnapshot(`
        Object {
          "headers": Object {
            "Policy": "eyJleHBpcmF0aW9uIjoiMjAyMi0wNS0wOFQxMzozNDozMloiLCJjb25kaXRpb25zIjpbeyJhY2wiOiJwdWJsaWMtcmVhZCJ9LHsiYnVja2V0IjoibW9ubm9tbG9nLXRlc3QifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsInVzZXIvZXJpYy8iXSx7ImFjbCI6InB1YmxpYy1yZWFkIn0seyJidWNrZXQiOiJtb25ub21sb2ctdGVzdCJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUFWWU42TzNIVVFOWjVKUUhPLzIwMjIwNTA4L2FwLW5vcnRoZWFzdC0yL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMjIwNTA4VDEzMjQzMloifSx7ImtleSI6InVzZXIvZXJpYy8xIn1dfQ==",
            "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
            "X-Amz-Credential": "AKIAVYN6O3HUQNZ5JQHO/20220508/ap-northeast-2/s3/aws4_request",
            "X-Amz-Date": "20220508T132432Z",
            "X-Amz-Signature": "834f39e6a07a5344d39722c94c2b0aa3c90d20922674b13ca26c9c5d429e4288",
            "acl": "public-read",
            "bucket": "monnomlog-test",
            "key": "user/eric/1",
          },
          "method": "POST",
          "url": "https://s3.ap-northeast-2.amazonaws.com/monnomlog-test",
        }
      `);
    });
  });
});
