/* eslint @typescript-eslint/no-explicit-any : 0 */
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
