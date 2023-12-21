import { getOptions } from "../utils/options";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Methods } from "../GitlabApiClientBase";
import { Project } from "../Project/project";
import { SearchOptions } from "../utils/types";
import { GitlabCreateProjectOptions, ProjectInfo } from "../Project";
import { Group } from "../Group/group";
import { GroupInfo } from "../Group";
import { GitlabOptions } from ".";

export class Gitlab extends GitlabApiClientBase {
  constructor(partialOptions: GitlabOptions) {
    if (!partialOptions.privateToken && !process.env.GITLAB_TOKEN)
      throw new Error(
        "Gitlab Token is required. Either provide it in the constructor or set it as an environment variable: GITLAB_TOKEN"
      );

    const options = getOptions<GitlabOptions>(partialOptions, {
      privateToken: process.env.GITLAB_TOKEN || "",
      cache: false,
      gitlabUrl: "https://gitlab.com",
    });
    super(options);
    this.options = options;
  }

  async findProjects(searchOptions: SearchOptions): Promise<Project[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/projects",
      method: Methods.GET,
      params: super.getSearchParams(searchOptions),
      expectedStatusCode: 200,
    });

    return data.map(
      (project: ProjectInfo) => new Project(project, this.options)
    );
  }

  async findGroups(searchOptions: SearchOptions = {}): Promise<Group[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: "/groups",
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map((group: GroupInfo) => new Group(group, this.options));
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
