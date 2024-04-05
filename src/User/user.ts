import { RestrictedUserInfo, UserInfo } from ".";

export interface RestrictedUser extends RestrictedUserInfo {}

export class RestrictedUser {
  constructor(userInfo: RestrictedUserInfo) {
    Object.assign(this, userInfo);
  }
}

export interface User extends UserInfo {}

export class User extends RestrictedUser {
  constructor(userInfo: UserInfo) {
    super(userInfo);
  }
}
