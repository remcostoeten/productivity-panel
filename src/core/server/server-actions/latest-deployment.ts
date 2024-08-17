"use server";

import { siteConfig } from "@/core/data/site-config";

/**
 * Fetches the latest deployment information from GitHub.
 *
 * This server action retrieves the most recent commit information for the specified repository.
 * It requires a GitHub access token to be set in the environment variables.
 *
 * @returns {Promise<{ commitDate: string }>} An object containing the date of the latest commit.
 *
 * @example
 * // In a server component or another server action:
 * import { getLatestDeploymentInfo } from '@/actions/getLatestDeploymentInfo';
 *
 * async function MyServerComponent() {
 *   const deploymentInfo = await getLatestDeploymentInfo();
 *   return <div>Latest deployment: {deploymentInfo.commitDate}</div>;
 * }
 *
 * @throws {Error} If the GitHub API request fails.
 *
 * @requires process.env.GITHUB_ACCESS_TOKEN to be set with a valid GitHub personal access token.
 */

export async function getLatestDeploymentInfo() {
  const repoOwner = siteConfig.username;
  const repoName = siteConfig.repositoryName;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

  const headers = {
    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }
    const commits = await response.json();
    const latestCommit = commits[0];

    return {
      commitDate: new Date(latestCommit.commit.author.date).toLocaleString(),
    };
  } catch (error) {
    console.error("Error fetching latest commit info:", error);
    return {
      commitDate: "Unknown",
    };
  }
}
