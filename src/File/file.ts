import { FileInfo, GitlabCommitInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";

export interface File extends FileInfo {}

export class File extends GitlabApiClientBase {
  constructor(
    fileInfo: FileInfo,
    options: Required<GitlabOptions>,
    private projectId: number,
    public ref: string
  ) {
    super(options);
    this.projectId = projectId;
    this.ref = ref;
    Object.assign(this, fileInfo);
  }

  async getBlame(): Promise<GitlabCommitInfo[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/repository/files/${this.file_path}/blame`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ref: this.ref,
      },
    });
    return data;
  }
}
