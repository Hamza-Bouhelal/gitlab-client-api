import { IssueInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";
import { Methods } from "../GitlabApiClientBase";

export interface Issue extends IssueInfo {}

export class Issue extends GitlabApiClientBase {
  constructor(issueInfo: IssueInfo, options: Required<GitlabOptions>) {
    super(options);
    Object.assign(this, issueInfo);
  }

  async delete() {
    await this.CallGitlabApi({
      endpoint: `/projects/${this.project_id}/issues/${this.iid}`,
      method: Methods.DELETE,
      expectedStatusCode: 204,
    });
  }
}
