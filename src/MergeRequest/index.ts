/* eslint @typescript-eslint/no-explicit-any : 0 */

/**
 * Represents the options for filtering merge requests.
 */
export interface MergeRequestSearchOptions {
  /**
   * Returns merge requests which have been approved by all the users with the given id. Maximum of 5. None returns merge requests with no approvals. Any returns merge requests with an approval. Premium and Ultimate only.
   */
  approved_by_ids?: number[];

  /**
   * Returns merge requests which have specified all the users with the given id as individual approvers. None returns merge requests without approvers. Any returns merge requests with an approver. Premium and Ultimate only.
   */
  approver_ids?: number[];

  /**
   * Filters merge requests by their approved status. yes returns only approved merge requests. no returns only non-approved merge requests. Introduced in GitLab 15.11 with the flag mr_approved_filter. Disabled by default.
   */
  approved?: "yes" | "no";

  /**
   * Returns merge requests assigned to the given user id. None returns unassigned merge requests. Any returns merge requests with an assignee.
   */
  assignee_id?: number;

  /**
   * Returns merge requests created by the given user id. Mutually exclusive with author_username. Combine with scope=all or scope=assigned_to_me.
   */
  author_id?: number;

  /**
   * Returns merge requests created by the given username. Mutually exclusive with author_id.
   */
  author_username?: string;

  /**
   * Returns merge requests created on or after the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  created_after?: string;

  /**
   * Returns merge requests created on or before the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  created_before?: string;

  /**
   * Returns merge requests deployed after the given date/time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  deployed_after?: string;

  /**
   * Returns merge requests deployed before the given date/time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  deployed_before?: string;

  /**
   * Returns merge requests deployed to the given environment.
   */
  environment?: string;

  /**
   * Modify the scope of the search attribute. title, description, or a string joining them with comma. Default is title,description.
   */
  in?: string;

  /**
   * Returns merge requests matching a comma-separated list of labels. None lists all merge requests with no labels. Any lists all merge requests with at least one label. Predefined names are case-insensitive.
   */
  labels?: string;

  /**
   * Returns merge requests which have been merged by the user with the given user id. Mutually exclusive with merge_user_username. Introduced in GitLab 16.9. Available only when the feature flag mr_merge_user_filter is enabled.
   */
  merge_user_id?: number;

  /**
   * Returns merge requests which have been merged by the user with the given username. Mutually exclusive with merge_user_id. Introduced in GitLab 16.9. Available only when the feature flag mr_merge_user_filter is enabled.
   */
  merge_user_username?: string;

  /**
   * Returns merge requests for a specific milestone. None returns merge requests with no milestone. Any returns merge requests that have an assigned milestone.
   */
  milestone?: string;

  /**
   * Returns merge requests reacted by the authenticated user by the given emoji. None returns issues not given a reaction. Any returns issues given at least one reaction.
   */
  my_reaction_emoji?: string;

  /**
   * Returns merge requests that do not match the parameters supplied. Accepts: labels, milestone, author_id, author_username, assignee_id, assignee_username, reviewer_id, reviewer_username, my_reaction_emoji.
   */
  not?: {
    labels?: string;
    milestone?: string;
    author_id?: number;
    author_username?: string;
    assignee_id?: number;
    assignee_username?: string;
    reviewer_id?: number;
    reviewer_username?: string;
    my_reaction_emoji?: string;
  };

  /**
   * Returns requests ordered by created_at, title, or updated_at fields. Default is created_at. Introduced in GitLab 14.8.
   */
  order_by?: "created_at" | "title" | "updated_at";

  /**
   * Returns merge requests which have the user as a reviewer with the given user id. None returns merge requests with no reviewers. Any returns merge requests with any reviewer. Mutually exclusive with reviewer_username.
   */
  reviewer_id?: number;

  /**
   * Returns merge requests which have the user as a reviewer with the given username. None returns merge requests with no reviewers. Any returns merge requests with any reviewer. Mutually exclusive with reviewer_id.
   */
  reviewer_username?: string;

  /**
   * Returns merge requests for the given scope: created_by_me, assigned_to_me or all. Defaults to created_by_me.
   */
  scope?: "created_by_me" | "assigned_to_me" | "all";

  /**
   * Search merge requests against their title and description.
   */
  search?: string;

  /**
   * Returns requests sorted in asc or desc order. Default is desc.
   */
  sort?: "asc" | "desc";

  /**
   * Returns merge requests with the given source branch.
   */
  source_branch?: string;

  /**
   * Returns all merge requests or just those that are opened, closed, locked, or merged.
   */
  state?: "opened" | "closed" | "locked" | "merged";

  /**
   * Returns merge requests with the given target branch.
   */
  target_branch?: string;

  /**
   * Returns merge requests updated on or after the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_after?: string;

  /**
   * Returns merge requests updated on or before the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_before?: string;

  /**
   * If simple, returns the iid, URL, title, description, and basic state of merge request.
   */
  view?: "simple";

  /**
   * If true, response returns more details for each label in labels field: :name, :color, :description, :description_html, :text_color. Default is false.
   */
  with_labels_details?: boolean;

  /**
   * If true, this projection requests (but does not guarantee) that the merge_status field be recalculated asynchronously. Default is false. In GitLab 15.11 and later, enable the restrict_merge_status_recheck feature flag for this attribute to be ignored when requested by users without at least the Developer role.
   */
  with_merge_status_recheck?: boolean;

  /**
   * Filter merge requests against their wip status. yes to return only draft merge requests, no to return non-draft merge requests.
   */
  wip?: "yes" | "no";
}

export interface MergeRequestInfo {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: "opened" | "closed" | "merged";
  created_at: string;
  updated_at: string;
  merged_by: {
    id: number;
    username: string;
    name: string;
    state: "active" | "blocked" | "deactivated";
    locked: boolean;
    avatar_url: string;
    web_url: string;
  } | null;
  merge_user: null;
  merged_at: string | null;
  closed_by: null;
  closed_at: string | null;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: {
    id: number;
    username: string;
    name: string;
    state: "active" | "blocked" | "deactivated";
    locked: boolean;
    avatar_url: string;
    web_url: string;
  };
  assignees: any[]; // You may want to define a more specific type based on your needs
  assignee: null;
  reviewers: any[]; // You may want to define a more specific type based on your needs
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  draft: boolean;
  work_in_progress: boolean;
  milestone: null;
  merge_when_pipeline_succeeds: boolean;
  merge_status: "unchecked" | "can_be_merged" | "cannot_be_merged";
  detailed_merge_status: "unchecked" | "can_be_merged" | "cannot_be_merged";
  sha: string;
  merge_commit_sha: string | null;
  squash_commit_sha: string | null;
  discussion_locked: null;
  should_remove_source_branch: null;
  force_remove_source_branch: boolean;
  prepared_at: string;
  reference: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: null;
    human_total_time_spent: null;
  };
  squash: boolean;
  squash_on_merge: boolean;
  task_completion_status: {
    count: number;
    completed_count: number;
  };
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  approvals_before_merge: boolean;
}
