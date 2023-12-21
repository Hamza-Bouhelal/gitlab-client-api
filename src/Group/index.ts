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
