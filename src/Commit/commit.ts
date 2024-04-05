import { CommitInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { PipelineInfo, PipelineSearchOptions } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";

export interface Commit extends CommitInfo {}

export class Commit extends GitlabApiClientBase {
  constructor(
    commitInfo: CommitInfo,
    options: Required<GitlabOptions>,
    private projectId: number,
    private branchName?: string
  ) {
    super(options);
    this.projectId = projectId;
    this.branchName = branchName;
    Object.assign(this, commitInfo);
  }

  async findPipelines(
    searchOptions: PipelineSearchOptions = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/repository/commits/${this.short_id}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }

  async revert(): Promise<Commit> {
    if (!this.branchName)
      throw new Error("Cannot revert commit not initiated from a branch");
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/repository/commits/${this.short_id}/revert`,
      method: Methods.FORM_POST,
      expectedStatusCode: 201,
      data: { branch: this.branchName },
    });
    return new Commit(data, this.options, this.projectId);
  }
}
