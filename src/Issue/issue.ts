import { IssueInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";

export class Issue extends GitlabApiClientBase {
  constructor(private issueInfo: IssueInfo, options: Required<GitlabOptions>) {
    super(options);
    this.issueInfo = issueInfo;
  }

  getInfo() {
    return this.issueInfo;
  }
}
