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

export interface GroupCreateOptions {
  /**
   * The name of the group.
   */
  name: string;

  /**
   * The path of the group.
   */
  path: string;

  /**
   * Default to Auto DevOps pipeline for all projects within this group.
   */
  auto_devops_enabled?: boolean;

  /**
   * Image file for avatar of the group. Introduced in GitLab 12.9
   */
  avatar?: string;

  /**
   * The default branch name for group’s projects. Introduced in GitLab 16.11.
   */
  default_branch?: string;

  /**
   * See Options for default_branch_protection. Default to the global level default branch protection setting.
   */
  default_branch_protection?: number;

  /**
   * See Options for default_branch_protection_defaults.
   */
  default_branch_protection_defaults?: Record<string, unknown>;

  /**
   * The group’s description.
   */
  description?: string;

  /**
   * Enabled protocols for Git access. Allowed values are: ssh, http, and all to allow both protocols. Introduced in GitLab 16.9.
   */
  enabled_git_access_protocol?: string;

  /**
   * (Deprecated in GitLab 16.5.) Disable email notifications. Use emails_enabled instead.
   */
  emails_disabled?: boolean;

  /**
   * Enable email notifications.
   */
  emails_enabled?: boolean;

  /**
   * Enable/disable Large File Storage (LFS) for the projects in this group.
   */
  lfs_enabled?: boolean;

  /**
   * Disable the capability of a group from getting mentioned.
   */
  mentions_disabled?: boolean;

  /**
   * The organization ID for the group.
   */
  organization_id?: number;

  /**
   * The parent group ID for creating nested group.
   */
  parent_id?: number;

  /**
   * Determine if developers can create projects in the group. Can be noone (No one), maintainer (users with the Maintainer role), or developer (users with the Developer or Maintainer role).
   */
  project_creation_level?: string;

  /**
   * Allow users to request member access.
   */
  request_access_enabled?: boolean;

  /**
   * Require all users in this group to set up two-factor authentication.
   */
  require_two_factor_authentication?: boolean;

  /**
   * Prevent sharing a project with another group within this group.
   */
  share_with_group_lock?: boolean;

  /**
   * Allowed to create subgroups. Can be owner (Owners), or maintainer (users with the Maintainer role).
   */
  subgroup_creation_level?: string;

  /**
   * Time before Two-factor authentication is enforced (in hours).
   */
  two_factor_grace_period?: number;

  /**
   * The group’s visibility. Can be private, internal, or public.
   */
  visibility?: string;

  /**
   * Users cannot be added to projects in this group. Premium and Ultimate only.
   */
  membership_lock?: boolean;

  /**
   * Can be set by administrators only. Additional compute minutes for this group. Self-managed, Premium and Ultimate only.
   */
  extra_shared_runners_minutes_limit?: number;

  /**
   * Can be set by administrators only. Maximum number of monthly compute minutes for this group. Can be nil (default; inherit system default), 0 (unlimited), or > 0. Self-managed, Premium and Ultimate only.
   */
  shared_runners_minutes_limit?: number;

  /**
   * The wiki access level. Can be disabled, private, or enabled. Premium and Ultimate only.
   */
  wiki_access_level?: string;
}
