/**
 * Represents the options for filtering users.
 */
export interface UserSearchOptions {
  /**
   * Get a single user with a specific username.
   */
  username?: string;

  /**
   * Search for a username.
   */
  search?: string;

  /**
   * Filters only active users. Default is false.
   */
  active?: boolean;

  /**
   * Filters only external users. Default is false.
   */
  external?: boolean;

  /**
   * Filters only non-external users. Default is false.
   */
  exclude_external?: boolean;

  /**
   * Filters only blocked users. Default is false.
   */
  blocked?: boolean;

  /**
   * Returns users created after specified time.
   */
  created_after?: string; // DateTime format

  /**
   * Returns users created before specified time.
   */
  created_before?: string; // DateTime format

  /**
   * Filters only non-internal users. Default is false.
   */
  exclude_internal?: boolean;

  /**
   * Filters users without project bots. Default is false.
   */
  without_project_bots?: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  state: "active" | "blocked" | "deactivated";
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
  pronouns: string | null;
  bot: boolean;
  work_information: string | null;
  local_time: string;
  last_sign_in_at: string;
  confirmed_at: string;
  last_activity_on: string;
  email: string;
  theme_id: number;
  color_scheme_id: number;
  projects_limit: number;
  current_sign_in_at: string;
  identities: {
    provider: string;
    extern_uid: string;
    saml_provider_id: string | null;
  }[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile: boolean;
  commit_email: string;
  shared_runners_minutes_limit: number | null;
  extra_shared_runners_minutes_limit: number | null;
  scim_identities: unknown[];
}

export interface RestrictedUserInfo {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
}
