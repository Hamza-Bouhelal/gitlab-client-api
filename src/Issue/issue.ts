import { IssueInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";

export interface Issue extends IssueInfo {}

export class Issue extends GitlabApiClientBase {
  constructor(issueInfo: IssueInfo, options: Required<GitlabOptions>) {
    super(options);
    Object.assign(this, issueInfo);
  }
}
