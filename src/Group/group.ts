import { GroupInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { ProjectInfo, ProjectSearchOptions } from "../Project";
import { Project } from "../Project/project";
import { GitlabOptions } from "../Gitlab";

export interface Group extends GroupInfo {}

export class Group extends GitlabApiClientBase {
  constructor(groupInfo: GroupInfo, options: Required<GitlabOptions>) {
    super(options);
    Object.assign(this, groupInfo);
  }

  async findProjects(
    searchOptions: ProjectSearchOptions = {}
  ): Promise<Project[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/groups/${this.id}/projects`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (project: ProjectInfo) => new Project(project, this.options)
    );
  }
}
