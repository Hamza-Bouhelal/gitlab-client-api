import { CommitInfo } from "../Commit";
import { PipelineInfo } from "../Pipeline";

/**
 * Represents the options for filtering jobs within a pipeline.
 */
export interface JobSearchOptions {
  /**
   * Include retried jobs in the response. Defaults to false. Introduced in GitLab 13.9.
   */
  include_retried?: boolean;

  /**
   * Scope of jobs to show. Either one of or an array of the following: created, pending, running, failed, success, canceled, skipped, waiting_for_resource, or manual. All jobs are returned if scope is not provided.
   */
  scope?: string | string[];
}

export interface JobInfo {
  id: number;
  status: string;
  stage: string;
  name: string;
  ref: string;
  tag: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverage: null | any;
  allow_failure: boolean;
  created_at: string;
  started_at: string;
  finished_at: string;
  erased_at: null | string;
  duration: number;
  queued_duration: number;
  user: {
    id: number;
    username: string;
    name: string;
    state: string;
    locked: boolean;
    avatar_url: string;
    web_url: string;
    created_at: string;
    bio: string;
    location: string;
    public_email: string;
    skype: string;
    linkedin: string;
    twitter: string;
    discord: string;
    website_url: string;
    organization: string;
    job_title: string;
    pronouns: null;
    bot: boolean;
    work_information: null;
    followers: number;
    following: number;
    local_time: string;
  };
  commit: CommitInfo;
  pipeline: PipelineInfo;
  web_url: string;
  project: {
    ci_job_token_scope_enabled: boolean;
  };
  artifacts: {
    file_type: string;
    size: number;
    filename: string;
    file_format: string | null;
  }[];
  runner: {
    id: number;
    description: string;
    ip_address: string;
    active: boolean;
    paused: boolean;
    is_shared: boolean;
    runner_type: string;
    name: string;
    online: boolean;
    status: string;
  };
  artifacts_expire_at: string;
  tag_list: string[];
}

export interface JobVariableAttribute {
  key: string;
  value: string;
}
