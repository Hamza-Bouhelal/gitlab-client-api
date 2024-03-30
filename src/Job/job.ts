import { JobInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";
import { Commit } from "../Commit/commit";
import { Pipeline } from "../Pipeline/pipeline";
import { Methods } from "../GitlabApiClientBase";
import { appendFileSync } from "fs";

type CustomJobInfo = Omit<Omit<JobInfo, "commit">, "pipeline"> & {
  commit: Commit;
  pipeline: Pipeline;
};

export class Job extends GitlabApiClientBase {
  private jobInfo: CustomJobInfo;
  constructor(
    jobInfo: JobInfo,
    options: Required<GitlabOptions>,
    private projectId: number
  ) {
    super(options);
    this.jobInfo = {
      ...jobInfo,
      commit: new Commit(jobInfo.commit, options),
      pipeline: new Pipeline(jobInfo.pipeline, options),
    };
    this.projectId = projectId;
  }

  getInfo() {
    return this.jobInfo;
  }

  async downloadArtifacts(): Promise<Buffer> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${
        this.getInfo().id
      }/artifacts`,
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return data;
  }
}
