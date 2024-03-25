import { UserInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";

export class User<T = undefined> {
  private userInfo: T extends undefined ? UserInfo : T;
  private clientBase: GitlabApiClientBase;

  constructor(
    userInfo: T extends undefined ? UserInfo : T,
    clientBase: GitlabApiClientBase
  ) {
    this.userInfo = userInfo;
    this.clientBase = clientBase;
  }

  getInfo = () => this.userInfo;
}
