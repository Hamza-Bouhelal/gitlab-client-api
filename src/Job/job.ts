import { JobInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";
import { Commit } from "../Commit/commit";
import { Pipeline } from "../Pipeline/pipeline";
import { Methods } from "../GitlabApiClientBase";

export interface Job extends Omit<JobInfo, "commit" | "pipeline"> {}

export class Job extends GitlabApiClientBase {
  public commit: Commit;
  public pipeline: Pipeline;
  constructor(
    jobInfo: JobInfo,
    options: Required<GitlabOptions>,
    public projectId: number
  ) {
    super(options);
    this.commit = new Commit(jobInfo.commit, options);
    this.pipeline = new Pipeline(jobInfo.pipeline, options);
    this.projectId = projectId;
    Object.assign(this, jobInfo);
  }

  async downloadArtifacts(): Promise<Buffer> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${this.id}/artifacts`,
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return data;
  }
}
