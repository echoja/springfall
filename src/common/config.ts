export function getGithubCredentials() {
  return {
    clientId: process.env.GITHUB_ID ?? "default-github-id",
    clientSecret: process.env.GITHUB_SECRET ?? "default-github-secret",
  };
}

export function getNextauthSecret() {
  return process.env.NEXTAUTH_SESSION_SECRET || "default-nextauth-secret";
}

export function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getS3Credentials() {
  return {
    accessKeyId: process.env.MONNOMLOG_S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.MONNOMLOG_S3_PRIVATE_ACCESS_KEY ?? "",
  };
}

export function getS3BucketName() {
  return process.env.MONNOMLOG_S3_BUCKET ?? "monnomlog-test";
}

export function getS3Region() {
  return process.env.MONNOMLOG_S3_REGION ?? "ap-northeast-2";
}

export function getBaseUrl() {
  return (
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "https://springfall.cc"
  );
}

export const getQStashConfig = () => ({
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || undefined,
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || undefined,
  token: process.env.QSTASH_TOKEN || undefined,
});

export const DEFAULT_UTTERANCES_REPO = "owner/repo";

export function getUtterancesRepo() {
  return process.env.NEXT_PUBLIC_UTTERANCES_REPO || DEFAULT_UTTERANCES_REPO;
}

export const POSTS_PER_PAGE = 10;
