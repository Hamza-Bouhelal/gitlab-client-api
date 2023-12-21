/* eslint @typescript-eslint/no-explicit-any : 0 */

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
