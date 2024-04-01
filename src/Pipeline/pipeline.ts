import { PipelineInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Job } from "../Job/job";
import { GitlabOptions } from "../Gitlab";
import { JobInfo, JobSearchOptions } from "../Job";

export interface Pipeline extends PipelineInfo {}

export class Pipeline extends GitlabApiClientBase {
  constructor(pipelineInfo: PipelineInfo, options: Required<GitlabOptions>) {
    super(options);
    Object.assign(this, pipelineInfo);
  }

  async findJobs(searchOptions: JobSearchOptions = {}): Promise<Job[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.project_id}/pipelines/${this.id}/jobs`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (jobInfo: JobInfo) => new Job(jobInfo, this.options, this.project_id)
    );
  }
}
