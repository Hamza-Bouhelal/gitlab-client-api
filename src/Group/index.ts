/**
 * Represents the options for filtering groups.
 */
export interface GroupSeatchOptions {
  /**
   * Skip the group IDs passed.
   */
  skip_groups?: number[];

  /**
   * Show all the groups you have access to (defaults to false for authenticated users, true for administrators); Attributes owned and min_access_level have precedence.
   */
  all_available?: boolean;

  /**
   * Return the list of authorized groups matching the search criteria.
   */
  search?: string;

  /**
   * Order groups by name, path, id, or similarity (if searching, introduced in GitLab 14.1). Default is name.
   */
  order_by?: string;

  /**
   * Order groups in asc or desc order. Default is asc.
   */
  sort?: string;

  /**
   * Include group statistics (administrators only).
   * Note: The REST API response does not provide the full RootStorageStatistics data that is shown in the UI. To match the data in the UI, use GraphQL instead of REST. For more information, see the Group GraphQL API resources.
   */
  statistics?: boolean;

  /**
   * Limit to groups with public, internal, or private visibility.
   */
  visibility?: string;

  /**
   * Include custom attributes in response (administrators only).
   */
  with_custom_attributes?: boolean;

  /**
   * Limit to groups explicitly owned by the current user.
   */
  owned?: boolean;

  /**
   * Limit to groups where current user has at least this role (access_level).
   */
  min_access_level?: number;

  /**
   * Limit to top level groups, excluding all subgroups.
   */
  top_level_only?: boolean;

  /**
   * Filter by repository storage used by the group (administrators only). Introduced in GitLab 16.3. Premium and Ultimate only.
   */
  repository_storage?: string;
}

export interface GroupInfo {
  id: number;
  web_url: string;
  name: string;
  path: string;
  description: string;
  visibility: "public" | "private" | "internal";
  share_with_group_lock: boolean;
  require_two_factor_authentication: boolean;
  two_factor_grace_period: number;
  project_creation_level: "noone" | "developer" | "maintainer" | "admin";
  auto_devops_enabled: boolean | null;
  subgroup_creation_level: "noone" | "developer" | "maintainer" | "admin";
  emails_disabled: boolean;
  emails_enabled: boolean;
  mentions_disabled: boolean | null;
  lfs_enabled: boolean;
  default_branch_protection: 0 | 1 | 2; // 0: Off, 1: Protect default branch, 2: Protect all branches
  default_branch_protection_defaults: Record<string, unknown>;
  avatar_url: string | null;
  request_access_enabled: boolean;
  full_name: string;
  full_path: string;
  created_at: string;
  parent_id: number | null;
  shared_runners_setting: "disabled" | "enabled";
  ldap_cn: string | null;
  ldap_access: string | null;
  wiki_access_level: "noone" | "developer" | "maintainer" | "admin";
}
