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

export const POSTS_PER_PAGE = 10;
