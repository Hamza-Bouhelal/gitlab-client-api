/**
 * Represents the options for filtering branches.
 */
export interface BranchSearchOptions {
  /**
   * Return list of branches containing the search string. You can use ^term to find branches that begin with term, and term$ to find branches that end with term.
   */
  search?: string;

  /**
   * Return list of branches with names matching a re2 regular expression.
   */
  regex?: string;
}

export interface BranchInfo {
  name: string;
  commit: {
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
  };
  merged: boolean;
  protected: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  default: boolean;
  web_url: string;
}
