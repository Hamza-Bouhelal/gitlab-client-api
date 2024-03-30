import { FileInfo, GitlabCommitInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";

export class File extends GitlabApiClientBase {
  constructor(
    private fileInfo: FileInfo,
    options: Required<GitlabOptions>,
    private projectId: number,
    private ref: string
  ) {
    super(options);
    this.fileInfo = fileInfo;
    this.projectId = projectId;
    this.ref = ref;
  }

  getInfo() {
    return this.fileInfo;
  }

  async getBlame(): Promise<GitlabCommitInfo[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/repository/files/${this.fileInfo.file_path}/blame`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ref: this.ref,
      },
    });
    return data;
  }
}
