import { JobInfo, JobVariableAttribute } from ".";
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
    private projectId: number
  ) {
    super(options);
    this.commit = new Commit(jobInfo.commit, options, projectId);
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

  async cancel(): Promise<void> {
    await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${this.id}/cancel`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
  }

  async retry(): Promise<Job> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${this.id}/retry`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
    return new Job(data, this.options, this.projectId);
  }

  async erase(): Promise<void> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${this.id}/erase`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
    Object.assign(this, data);
  }

  async play(jobVariablesAttributes: JobVariableAttribute[]): Promise<void> {
    await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/jobs/${this.id}/play`,
      method: Methods.POST,
      expectedStatusCode: 201,
      data: { job_variables_attributes: jobVariablesAttributes },
    });
  }
}
