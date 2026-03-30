export interface ContributionDay {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubContributions {
  login: string;
  avatarUrl: string;
  totalContributions: number;
  weeks: ContributionWeek[];
}

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function fetchGitHubContributions(): Promise<GitHubContributions | null> {
  const token = import.meta.env.GITHUB_TOKEN;
  const login = import.meta.env.GITHUB_USER;

  if (!token || !login) {
    console.warn('[github.ts] GITHUB_TOKEN or GITHUB_LOGIN not set, skipping fetch.');
    return null;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
    });

    if (!res.ok) {
      console.error('[github.ts] GitHub API error:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    const user = json?.data?.user;

    if (!user) {
      console.error('[github.ts] No user data in response:', JSON.stringify(json));
      return null;
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    const weeks: ContributionWeek[] = calendar.weeks.map((w: { contributionDays: { date: string; contributionCount: number }[] }) => ({
      days: w.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        level: toLevel(d.contributionCount),
      })),
    }));

    return {
      login: user.login,
      avatarUrl: user.avatarUrl,
      totalContributions: calendar.totalContributions,
      weeks,
    };
  } catch (err) {
    console.error('[github.ts] Failed to fetch GitHub contributions:', err);
    return null;
  }
}
