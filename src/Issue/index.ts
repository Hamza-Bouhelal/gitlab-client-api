/* eslint @typescript-eslint/no-explicit-any : 0 */

/**
 * Represents the options for filtering issues.
 */
export interface IssueSearchOptions {
  /**
   * Return issues assigned to the given user id. Mutually exclusive with assignee_username. None returns unassigned issues. Any returns issues with an assignee.
   */
  assignee_id?: number;

  /**
   * Return issues assigned to the given username. Similar to assignee_id and mutually exclusive with assignee_id. In GitLab CE, the assignee_username array should only contain a single value. Otherwise, an invalid parameter error is returned.
   */
  assignee_username?: string[];

  /**
   * Return issues created by the given user id. Mutually exclusive with author_username. Combine with scope=all or scope=assigned_to_me.
   */
  author_id?: number;

  /**
   * Return issues created by the given username. Similar to author_id and mutually exclusive with author_id.
   */
  author_username?: string;

  /**
   * Filter confidential or public issues.
   */
  confidential?: boolean;

  /**
   * Return issues created on or after the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  created_after?: string;

  /**
   * Return issues created on or before the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  created_before?: string;

  /**
   * Return issues that have no due date, are overdue, or whose due date is this week, this month, or between two weeks ago and next month. Accepts: 0 (no due date), any, today, tomorrow, overdue, week, month, next_month_and_previous_two_weeks.
   */
  due_date?: string;

  /**
   * Return issues associated with the given epic ID. None returns issues that are not associated with an epic. Any returns issues that are associated with an epic. Premium and Ultimate only.
   */
  epic_id?: number;

  /**
   * Return issues with the specified health_status. (Introduced in GitLab 15.4). In GitLab 15.5 and later, None returns issues with no health status assigned, and Any returns issues with a health status assigned. Ultimate only.
   */
  health_status?: string;

  /**
   * Return only the issues having the given iid.
   */
  iids?: number[];

  /**
   * Modify the scope of the search attribute. title, description, or a string joining them with comma. Default is title,description.
   */
  in?: string;

  /**
   * Filter to a given type of issue. One of issue, incident, test_case or task.
   */
  issue_type?: string;

  /**
   * Return issues assigned to the given iteration ID. None returns issues that do not belong to an iteration. Any returns issues that belong to an iteration. Mutually exclusive with iteration_title. Premium and Ultimate only.
   */
  iteration_id?: number;

  /**
   * Return issues assigned to the iteration with the given title. Similar to iteration_id and mutually exclusive with iteration_id. Premium and Ultimate only.
   */
  iteration_title?: string;

  /**
   * Comma-separated list of label names, issues must have all labels to be returned. None lists all issues with no labels. Any lists all issues with at least one label. No+Label (Deprecated) lists all issues with no labels. Predefined names are case-insensitive.
   */
  labels?: string;

  /**
   * Returns issues assigned to milestones with a given timebox value (None, Any, Upcoming, and Started). None lists all issues with no milestone. Any lists all issues that have an assigned milestone. Upcoming lists all issues assigned to milestones due in the future. Started lists all issues assigned to open, started milestones. milestone and milestone_id are mutually exclusive. (Introduced in GitLab 14.3)
   */
  milestone_id?: string;

  /**
   * The milestone title. None lists all issues with no milestone. Any lists all issues that have an assigned milestone. Using None or Any will be deprecated in the future. Use milestone_id attribute instead. milestone and milestone_id are mutually exclusive.
   */
  milestone?: string;

  /**
   * Return issues reacted by the authenticated user by the given emoji. None returns issues not given a reaction. Any returns issues given at least one reaction.
   */
  my_reaction_emoji?: string;

  /**
   * Return issues only from non-archived projects. If false, the response returns issues from both archived and non-archived projects. Default is true.
   */
  non_archived?: boolean;

  /**
   * Return issues that do not match the parameters supplied. Accepts: assignee_id, assignee_username, author_id, author_username, iids, iteration_id, iteration_title, labels, milestone, milestone_id and weight.
   */
  not?: {
    assignee_id?: number;
    assignee_username?: string[];
    author_id?: number;
    author_username?: string;
    iids?: number[];
    iteration_id?: number;
    iteration_title?: string;
    labels?: string;
    milestone?: string;
    milestone_id?: string;
    weight?: number;
  };

  /**
   * Return issues ordered by created_at, due_date, label_priority, milestone_due, popularity, priority, relative_position, title, updated_at, or weight fields. Default is created_at.
   */
  order_by?: string;

  /**
   * Return issues for the given scope: created_by_me, assigned_to_me or all. Defaults to created_by_me.
   */
  scope?: string;

  /**
   * Search issues against their title and description.
   */
  search?: string;

  /**
   * Return issues sorted in asc or desc order. Default is desc.
   */
  sort?: string;

  /**
   * Return issues updated on or after the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_after?: string;

  /**
   * Return issues updated on or before the given time. Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_before?: string;

  /**
   * Return issues with the specified weight. None returns issues with no weight assigned. Any returns issues with a weight assigned. Premium and Ultimate only.
   */
  weight?: number;

  /**
   * If true, the response returns more details for each label in labels field: :name, :color, :description, :description_html, :text_color. Default is false.
   */
  with_labels_details?: boolean;
}

export interface IssueInfo {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: "opened" | "closed";
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  closed_by: any | null;
  labels: string[];
  milestone: any | null;
  assignees: any[];
  author: {
    id: number;
    username: string;
    name: string;
    state: "active" | "locked";
    locked: boolean;
    avatar_url: string;
    web_url: string;
  };
  type: "ISSUE";
  assignee: any | null;
  user_notes_count: number;
  merge_requests_count: number;
  upvotes: number;
  downvotes: number;
  due_date: string | null;
  confidential: boolean;
  discussion_locked: boolean | null;
  issue_type: "issue";
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: string | null;
    human_total_time_spent: string | null;
  };
  task_completion_status: {
    count: number;
    completed_count: number;
  };
  blocking_issues_count: number;
  has_tasks: boolean;
  task_status: string;
  _links: {
    self: string;
    notes: string;
    award_emoji: string;
    project: string;
    closed_as_duplicate_of: string | null;
  };
  references: {
    short: string;
    relative: string;
    full: string;
  };
  severity: string;
  moved_to_id: number | null;
  service_desk_reply_to: string | null;
}

export interface IssueCreateOptions {
  /**
   * The ID of the user to assign the issue to. Only appears on GitLab Free.
   */
  assignee_id?: number;

  /**
   * The IDs of the users to assign the issue to. Premium and Ultimate only.
   */
  assignee_ids?: number[];

  /**
   * Set an issue to be confidential. Default is false.
   */
  confidential?: boolean;

  /**
   * When the issue was created. Date time string, ISO 8601 formatted.
   */
  created_at?: string;

  /**
   * The description of an issue. Limited to 1,048,576 characters.
   */
  description?: string;

  /**
   * The ID of a discussion to resolve. This fills out the issue with a default description and mark the discussion as resolved. Use in combination with merge_request_to_resolve_discussions_of.
   */
  discussion_to_resolve?: string;

  /**
   * The due date. Date time string in the format YYYY-MM-DD.
   */
  due_date?: string;

  /**
   * ID of the epic to add the issue to. Valid values are greater than or equal to 0. Premium and Ultimate only.
   */
  epic_id?: number;

  /**
   * IID of the epic to add the issue to. Valid values are greater than or equal to 0. (deprecated, scheduled for removal in API version 5). Premium and Ultimate only.
   */
  epic_iid?: number;

  /**
   * The internal ID of the project’s issue (requires administrator or project owner rights).
   */
  iid?: number | string;

  /**
   * The type of issue. One of issue, incident, test_case, or task. Default is issue.
   */
  issue_type?: string;

  /**
   * Comma-separated label names to assign to the new issue. If a label does not already exist, this API request creates a new project label and assigns it to the issue.
   */
  labels?: string;

  /**
   * The IID of a merge request in which to resolve all issues. This fills out the issue with a default description and mark all discussions as resolved. When passing a description or title, these values take precedence over the default values.
   */
  merge_request_to_resolve_discussions_of?: number;

  /**
   * The global ID of a milestone to assign issue. To find the milestone_id associated with a milestone, view an issue with the milestone assigned and use the API to retrieve the issue’s details.
   */
  milestone_id?: number;

  /**
   * The title of an issue.
   */
  title: string;

  /**
   * The weight of the issue. Valid values are greater than or equal to 0. Premium and Ultimate only.
   */
  weight?: number;
}
