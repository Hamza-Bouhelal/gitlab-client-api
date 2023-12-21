import { GroupInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { ProjectInfo } from "../Project";
import { Project } from "../Project/project";
import { GitlabOptions } from "../Gitlab";
import { SearchOptions } from "../utils/types";

export class Group extends GitlabApiClientBase {
  constructor(private groupInfo: GroupInfo, options: Required<GitlabOptions>) {
    super(options);
    this.groupInfo = groupInfo;
  }

  getInfo() {
    return this.groupInfo;
  }

  async findProjects(searchOptions: SearchOptions): Promise<Project[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/groups/${this.groupInfo.id}/projects`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map(
      (project: ProjectInfo) => new Project(project, this.options)
    );
  }
}
