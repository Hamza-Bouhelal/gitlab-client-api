import { PipelineInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Job } from "../Job/job";
import { GitlabOptions } from "../Gitlab";
import { SearchOptions } from "../utils/types";
import { JobInfo } from "../Job";

export class Pipeline extends GitlabApiClientBase {
  constructor(
    private pipelineInfo: PipelineInfo,
    options: Required<GitlabOptions>
  ) {
    super(options);
    this.pipelineInfo = pipelineInfo;
  }

  getInfo() {
    return this.pipelineInfo;
  }

  async findJobs(searchOptions: SearchOptions = {}): Promise<Job[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.pipelineInfo.project_id}/pipelines/${this.pipelineInfo.id}/jobs`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map((jobInfo: JobInfo) => new Job(jobInfo, this.options));
  }
}
