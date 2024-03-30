import { getOptions } from "../utils/options";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Methods } from "../GitlabApiClientBase";
import { Project } from "../Project/project";
import {
  GitlabCreateProjectOptions,
  ProjectInfo,
  ProjectSearchOptions,
} from "../Project";
import { Group } from "../Group/group";
import { GroupInfo, GroupSeatchOptions } from "../Group";
import { GitlabOptions } from ".";
import { User } from "../User/user";
import { RestrictedUserInfo, UserInfo, UserSearchOptions } from "../User";

const defaultOptions: Required<GitlabOptions> = {
  privateToken: process.env.GITLAB_TOKEN || "",
  cache: false,
  gitlabUrl: "https://gitlab.com",
};

export class Gitlab extends GitlabApiClientBase {
  constructor(partialOptions?: GitlabOptions) {
    const options = partialOptions
      ? getOptions<GitlabOptions>(partialOptions, defaultOptions)
      : defaultOptions;
    if (!options.privateToken)
      throw new Error(
        "Gitlab Token is required. Either provide it in the constructor or set it as an environment variable: GITLAB_TOKEN"
      );

    super(options);
    this.options = options;
  }

  public resetCache(): void {
    if (!this.options.cache) return console.warn("Cache is not enabled.");
    super.resetCacheInternal();
  }

  async findProjects(
    searchOptions: ProjectSearchOptions = {}
  ): Promise<Project[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/projects",
      method: Methods.GET,
      params: searchOptions,
      expectedStatusCode: 200,
    });

    return data.map(
      (project: ProjectInfo) => new Project(project, this.options)
    );
  }

  async findGroups(searchOptions: GroupSeatchOptions = {}): Promise<Group[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/groups",
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map((group: GroupInfo) => new Group(group, this.options));
  }

  async findUsers(
    searchOptions: UserSearchOptions = {}
  ): Promise<User<RestrictedUserInfo>[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/users",
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (userInfo: UserInfo) => new User<RestrictedUserInfo>(userInfo, this)
    );
  }

  createProject = async (projectOptions: GitlabCreateProjectOptions) => {
    const { data } = await this.CallGitlabApi({
      endpoint: "/projects",
      method: Methods.POST,
      expectedStatusCode: 201,
      params: projectOptions,
    });
    return new Project(data, this.options);
  };
}
