/**
 * Represents the options for filtering commits.
 */
export interface CommitSearchOptions {
  /**
   * The ID or URL-encoded path of the project owned by the authenticated user.
   */
  id?: number | string;

  /**
   * The name of a repository branch, tag, or revision range, or if not given the default branch.
   */
  ref_name?: string;

  /**
   * Only commits after or on this date are returned in ISO 8601 format YYYY-MM-DDTHH:MM:SSZ.
   */
  since?: string;

  /**
   * Only commits before or on this date are returned in ISO 8601 format YYYY-MM-DDTHH:MM:SSZ.
   */
  until?: string;

  /**
   * The file path.
   */
  path?: string;

  /**
   * Search commits by commit author.
   */
  author?: string;

  /**
   * Retrieve every commit from the repository.
   */
  all?: boolean;

  /**
   * Stats about each commit are added to the response.
   */
  with_stats?: boolean;

  /**
   * Follow only the first parent commit upon seeing a merge commit.
   */
  first_parent?: boolean;

  /**
   * List commits in order. Possible values: default, topo. Defaults to default, the commits are shown in reverse chronological order.
   */
  order?: string;

  /**
   * Parse and include Git trailers for every commit.
   */
  trailers?: boolean;
}

export interface CommitInfo {
  id: string;
  short_id: string;
  created_at: string;
  parent_ids: string[];
  title: string;
  message: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  trailers: Record<string, unknown>;
  extended_trailers: Record<string, unknown>;
  web_url: string;
}
