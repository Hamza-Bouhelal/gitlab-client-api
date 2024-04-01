/**
 * Represents the options for querying project pipelines.
 */
export interface PipelineSearchOptions {
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

export interface PipelineInfo {
  id: number;
  iid: number;
  project_id: number;
  sha: string;
  ref: string;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  name: string | null;
}
