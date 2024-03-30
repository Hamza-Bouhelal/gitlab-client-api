/**
 * Represents the options for filtering projects.
 */
export interface ProjectSearchOptions {
  /**
   * Limit by archived status.
   */
  archived?: boolean;

  /**
   * Limit results to projects with IDs greater than the specified ID.
   */
  id_after?: number;

  /**
   * Limit results to projects with IDs less than the specified ID.
   */
  id_before?: number;

  /**
   * Limit results to projects which were imported from external systems by current user.
   */
  imported?: boolean;

  /**
   * Include hidden projects. (administrators only) Premium and Ultimate only.
   */
  include_hidden?: boolean;

  /**
   * Include projects pending deletion. (administrators only)
   */
  include_pending_delete?: boolean;

  /**
   * Limit results to projects with last activity after specified time. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
   */
  last_activity_after?: string;

  /**
   * Limit results to projects with last activity before specified time. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
   */
  last_activity_before?: string;

  /**
   * Limit by projects that the current user is a member of.
   */
  membership?: boolean;

  /**
   * Limit by current user minimal role (access_level).
   */
  min_access_level?: number;

  /**
   * Return projects ordered by id, name, path, created_at, updated_at, last_activity_at,
   * or similarity fields. repository_size, storage_size, packages_size or wiki_size fields
   * are only allowed for administrators. similarity (introduced in GitLab 14.1) is only
   * available when searching and is limited to projects that the current user is a member of.
   * Default is created_at.
   */
  order_by?: string;

  /**
   * Limit by projects explicitly owned by the current user.
   */
  owned?: boolean;

  /**
   * Limit projects where the repository checksum calculation has failed. Premium and Ultimate only.
   */
  repository_checksum_failed?: boolean;

  /**
   * Limit results to projects stored on repository_storage. (administrators only)
   */
  repository_storage?: string;

  /**
   * Include ancestor namespaces when matching search criteria. Default is false.
   */
  search_namespaces?: boolean;

  /**
   * Return list of projects matching the search criteria.
   */
  search?: string;

  /**
   * Return only limited fields for each project. This operation is a no-op without authentication where only simple fields are returned.
   */
  simple?: boolean;

  /**
   * Return projects sorted in asc or desc order. Default is desc.
   */
  sort?: string;

  /**
   * Limit by projects starred by the current user.
   */
  starred?: boolean;

  /**
   * Include project statistics. Available only to users with at least the Reporter role.
   */
  statistics?: boolean;

  /**
   * Limit results to projects with the assigned topic given by the topic ID.
   */
  topic_id?: number;

  /**
   * Comma-separated topic names. Limit results to projects that match all of given topics. See topics attribute.
   */
  topic?: string;

  /**
   * Limit results to projects last updated after the specified time. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).
   * Introduced in GitLab 15.10. For this filter to work, you must also provide updated_at as the order_by attribute.
   */
  updated_after?: string;

  /**
   * Limit results to projects last updated before the specified time. Format: ISO 8601 (YYYY-MM-DDTHH:MM:SSZ).
   * Introduced in GitLab 15.10. For this filter to work, you must also provide updated_at as the order_by attribute.
   */
  updated_before?: string;

  /**
   * Limit by visibility public, internal, or private.
   */
  visibility?: string;

  /**
   * Limit projects where the wiki checksum calculation has failed. Premium and Ultimate only.
   */
  wiki_checksum_failed?: boolean;

  /**
   * Include custom attributes in response. (administrator only)
   */
  with_custom_attributes?: boolean;

  /**
   * Limit by enabled issues feature.
   */
  with_issues_enabled?: boolean;

  /**
   * Limit by enabled merge requests feature.
   */
  with_merge_requests_enabled?: boolean;

  /**
   * Limit by projects which use the given programming language.
   */
  with_programming_language?: string;
}

export interface ProjectInfo {
  id: number;
  description: string | null;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  default_branch: string;
  tag_list: string[];
  topics: string[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  forks_count: number;
  avatar_url: string | null;
  star_count: number;
  last_activity_at: string;
  namespace: {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id: number | null;
    avatar_url: string;
    web_url: string;
  };
  container_registry_image_prefix: string;
  _links: {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
    cluster_agents: string;
  };
  code_suggestions: boolean;
  packages_enabled: boolean;
  empty_repo: boolean;
  archived: boolean;
  visibility: "private" | "public" | "internal";
  owner: {
    id: number;
    username: string;
    name: string;
    state: string;
    locked: boolean;
    avatar_url: string;
    web_url: string;
  };
  resolve_outdated_diff_discussions: boolean;
  container_expiration_policy: {
    cadence: string;
    enabled: boolean;
    keep_n: number;
    older_than: string;
    name_regex: string;
    name_regex_keep: string | null;
    next_run_at: string;
  };
  issues_enabled: boolean;
  merge_requests_enabled: boolean;
  wiki_enabled: boolean;
  jobs_enabled: boolean;
  snippets_enabled: boolean;
  container_registry_enabled: boolean;
  service_desk_enabled: boolean;
  service_desk_address: string;
  can_create_merge_request_in: boolean;
  issues_access_level: "enabled" | "disabled" | "private";
  repository_access_level: "enabled" | "disabled" | "private";
  merge_requests_access_level: "enabled" | "disabled" | "private";
}

export type GitlabCreateProjectOptions =
  | (ProjectOptions & { name: string })
  | (ProjectOptions & { path: string });

/**
 * Options for creating a GitLab project.
 */
interface ProjectOptions {
  /**
   * Set whether or not merge requests can be merged with skipped jobs.
   */
  allow_merge_on_skipped_pipeline?: boolean;

  /**
   * Indicates that merges of merge requests should be blocked unless all status checks have passed.
   */
  only_allow_merge_if_all_status_checks_passed?: boolean;

  /**
   * One of disabled, private, or enabled.
   * @remarks Introduced in GitLab 14.9.
   */
  analytics_access_level?: string;

  /**
   * How many approvers should approve merge requests by default.
   * @deprecated Deprecated in GitLab 16.0.
   */
  approvals_before_merge?: number;

  /**
   * Auto-cancel pending pipelines. This action toggles between an enabled state and a disabled state; it is not a boolean.
   */
  auto_cancel_pending_pipelines?: string;

  /**
   * Auto Deploy strategy (continuous, manual, or timed_incremental).
   */
  auto_devops_deploy_strategy?: string;

  /**
   * Enable Auto DevOps for this project.
   */
  auto_devops_enabled?: boolean;

  /**
   * Set whether auto-closing referenced issues on the default branch.
   */
  autoclose_referenced_issues?: boolean;

  /**
   * Image file for the avatar of the project.
   */
  avatar?: object;

  /**
   * The Git strategy. Defaults to fetch.
   */
  build_git_strategy?: string;

  /**
   * The maximum amount of time, in seconds, that a job can run.
   */
  build_timeout?: number;

  /**
   * One of disabled, private, or enabled.
   */
  builds_access_level?: string;

  /**
   * The path to CI configuration file.
   */
  ci_config_path?: string;

  /**
   * Update the image cleanup policy for this project.
   * @remarks Accepts: cadence (string), keep_n (integer), older_than (string), name_regex (string),
   * name_regex_delete (string), name_regex_keep (string), enabled (boolean). See the container registry
   * documentation for more information on cadence, keep_n, and older_than values.
   */
  container_expiration_policy_attributes?: {
    cadence?: string;
    keep_n?: number;
    older_than?: string;
    name_regex?: string;
    name_regex_delete?: string;
    name_regex_keep?: string;
    enabled?: boolean;
  };

  /**
   * Set visibility of container registry, for this project, to one of disabled, private, or enabled.
   */
  container_registry_access_level?: string;

  /**
   * (Deprecated) Enable container registry for this project. Use container_registry_access_level instead.
   */
  container_registry_enabled?: boolean;

  /**
   * The default branch name. Requires initialize_with_readme to be true.
   */
  default_branch?: string;

  /**
   * Short project description.
   */
  description?: string;

  /**
   * (Deprecated) Disable email notifications. Use emails_enabled instead.
   */
  emails_disabled?: boolean;

  /**
   * Enable email notifications.
   */
  emails_enabled?: boolean;

  /**
   * The classification label for the project.
   * @remarks (Premium) Introduced in GitLab 14.9.
   */
  external_authorization_classification_label?: string;

  /**
   * One of disabled, private, or enabled.
   */
  forking_access_level?: string;

  /**
   * Enable group runners for this project.
   */
  group_runners_enabled?: boolean;

  /**
   * For group-level custom templates, specifies ID of group from which all the custom project templates are sourced.
   * @remarks Leave empty for instance-level templates. Requires use_custom_template to be true.
   */
  group_with_project_templates_id?: number;

  /**
   * URL to import repository from.
   * @remarks When the URL value isn’t empty, you must not set initialize_with_readme to true.
   * Doing so might result in the following error: not a git repository.
   */
  import_url?: string;

  /**
   * Whether to create a Git repository with just a README.md file. Default is false.
   * @remarks When this boolean is true, you must not pass import_url or other attributes of this
   * endpoint which specify alternative contents for the repository. Doing so might result in the
   * following error: not a git repository.
   */
  initialize_with_readme?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  issues_access_level?: string;

  /**
   * (Deprecated) Enable issues for this project. Use issues_access_level instead.
   */
  issues_enabled?: boolean;

  /**
   * (Deprecated) Enable jobs for this project. Use builds_access_level instead.
   */
  jobs_enabled?: boolean;

  /**
   * Enable LFS.
   */
  lfs_enabled?: boolean;

  /**
   * Set the merge method used.
   */
  merge_method?: string;

  /**
   * Enable or disable merge pipelines.
   */
  merge_pipelines_enabled?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  merge_requests_access_level?: string;

  /**
   * (Deprecated) Enable merge requests for this project. Use merge_requests_access_level instead.
   */
  merge_requests_enabled?: boolean;

  /**
   * Enable or disable merge trains.
   */
  merge_trains_enabled?: boolean;

  /**
   * Pull mirroring triggers builds.
   * @remarks (Premium) Introduced in all offerings.
   */
  mirror_trigger_builds?: boolean;

  /**
   * Enables pull mirroring in a project.
   * @remarks (Premium) Introduced in all offerings.
   */
  mirror?: boolean;

  /**
   * Namespace for the new project (defaults to the current user’s namespace).
   */
  namespace_id?: number;

  /**
   * Set whether merge requests can only be merged when all the discussions are resolved.
   */
  only_allow_merge_if_all_discussions_are_resolved?: boolean;

  /**
   * Enable or disable packages repository feature.
   */
  packages_enabled?: boolean;

  /**
   * One of disabled, private, enabled, or public.
   */
  pages_access_level?: string;

  /**
   * Show a link to create/view merge requests when pushing from the command line.
   */
  printing_merge_request_link_enabled?: boolean;

  /**
   * If true, jobs can be viewed by non-project members.
   */
  public_builds?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  releases_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  environments_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  feature_flags_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  infrastructure_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  monitor_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  model_experiments_access_level?: string;

  /**
   * One of disabled, private, or enabled.
   */
  model_registry_access_level?: string;

  /**
   * Enable "Delete source branch" option by default for all new merge requests.
   */
  remove_source_branch_after_merge?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  repository_access_level?: string;

  /**
   * Which storage shard the repository is on. (Administrator only)
   */
  repository_storage?: string;

  /**
   * Allow users to request member access.
   */
  request_access_enabled?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  requirements_access_level?: string;

  /**
   * Automatically resolve merge request diffs discussions on lines changed with a push.
   */
  resolve_outdated_diff_discussions?: boolean;

  /**
   * (GitLab 14.9 and later) Security and compliance access level. One of disabled, private, or enabled.
   */
  security_and_compliance_access_level?: string;

  /**
   * Enable shared runners for this project.
   */
  shared_runners_enabled?: boolean;

  /**
   * Show default emoji reactions.
   */
  show_default_award_emojis?: boolean;

  /**
   * One of disabled, private, or enabled.
   */
  snippets_access_level?: string;

  /**
   * (Deprecated) Enable snippets for this project. Use snippets_access_level instead.
   */
  snippets_enabled?: boolean;

  /**
   * One of never, always, default_on, or default_off.
   */
  squash_option?: string;

  /**
   * (Deprecated in GitLab 14.0) The list of tags for a project; put an array of tags that should be finally assigned to a project.
   * Use topics instead.
   */
  tag_list?: string[];

  /**
   * When used without use_custom_template, the name of a built-in project template.
   * When used with use_custom_template, the name of a custom project template.
   */
  template_name?: string;

  /**
   * (Premium) When used with use_custom_template, the project ID of a custom project template.
   * Using a project ID is preferable to using template_name since template_name may be ambiguous.
   */
  template_project_id?: number;

  /**
   * The list of topics for a project; put an array of topics that should be finally assigned to a project.
   * @remarks (Introduced in GitLab 14.0.)
   */
  topics?: string[];

  /**
   * (Premium) Use either custom instance or group (with group_with_project_templates_id) project template.
   */
  use_custom_template?: boolean;

  /**
   * See project visibility level.
   */
  visibility?: string;

  /**
   * One of disabled, private, or enabled.
   */
  wiki_access_level?: string;

  /**
   * (Deprecated) Enable wiki for this project. Use wiki_access_level instead.
   */
  wiki_enabled?: boolean;
}
