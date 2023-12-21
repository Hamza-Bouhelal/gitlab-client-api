import { JobInfo } from ".";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { GitlabOptions } from "../Gitlab";
import { Commit } from "../Commit/commit";
import { Pipeline } from "../Pipeline/pipeline";

type CustomJobInfo = Omit<Omit<JobInfo, "commit">, "pipeline"> & {
  commit: Commit;
  pipeline: Pipeline;
};

export class Job extends GitlabApiClientBase {
  private jobInfo: CustomJobInfo;
  constructor(jobInfo: JobInfo, options: Required<GitlabOptions>) {
    super(options);
    this.jobInfo = {
      ...jobInfo,
      commit: new Commit(jobInfo.commit, options),
      pipeline: new Pipeline(jobInfo.pipeline, options),
    };
  }

  getInfo() {
    return this.jobInfo;
  }
}
