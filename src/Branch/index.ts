import { SearchOptions } from "../utils/types";

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

/**
 * Represents the options for querying project pipelines.
 */
export interface PipelineSearchOptions extends SearchOptions {
  /**
   * The ID or URL-encoded path of the project.
   */
  id?: number | string;

  /**
   * Return pipelines with the specified name.
   * Introduced in GitLab 15.11, not available by default.
   */
  name?: string;

  /**
   * Order pipelines by id, status, ref, updated_at, or user_id (default: id).
   */
  order_by?: string;

  /**
   * The ref of pipelines.
   */
  ref?: string;

  /**
   * The scope of pipelines, one of: running, pending, finished, branches, tags.
   */
  scope?: "running" | "pending" | "finished" | "branches" | "tags";

  /**
   * The SHA of pipelines.
   */
  sha?: string;

  /**
   * Sort pipelines in asc or desc order (default: desc).
   */
  sort?: "asc" | "desc";

  /**
   * In GitLab 14.3 and later, how the pipeline was triggered,
   * one of: api, chat, external, external_pull_request_event, merge_request_event,
   * ondemand_dast_scan, ondemand_dast_validation, parent_pipeline, pipeline, push, schedule,
   * security_orchestration_policy, trigger, web, or webide.
   */
  source?:
    | "api"
    | "chat"
    | "external"
    | "external_pull_request_event"
    | "merge_request_event"
    | "ondemand_dast_scan"
    | "ondemand_dast_validation"
    | "parent_pipeline"
    | "pipeline"
    | "push"
    | "schedule"
    | "security_orchestration_policy"
    | "trigger"
    | "web"
    | "webide";

  /**
   * The status of pipelines,
   * one of: created, waiting_for_resource, preparing, pending, running, success, failed,
   * canceled, skipped, manual, scheduled.
   */
  status?:
    | "created"
    | "waiting_for_resource"
    | "preparing"
    | "pending"
    | "running"
    | "success"
    | "failed"
    | "canceled"
    | "skipped"
    | "manual"
    | "scheduled";

  /**
   * Return pipelines updated after the specified date.
   * Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_after?: string;

  /**
   * Return pipelines updated before the specified date.
   * Expected in ISO 8601 format (2019-03-15T08:00:00Z).
   */
  updated_before?: string;

  /**
   * The username of the user who triggered pipelines.
   */
  username?: string;

  /**
   * Returns pipelines with invalid configurations.
   */
  yaml_errors?: boolean;
}
