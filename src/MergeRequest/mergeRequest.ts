import { MergeRequestInfo } from ".";
import { Branch } from "../Branch/branch";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { PipelineInfo } from "../Pipeline";
import { PipelineSearchOptions } from "../Branch";

export interface MergeRequest extends MergeRequestInfo {}

export class MergeRequest extends GitlabApiClientBase {
  constructor(
    mergeRequestInfo: MergeRequestInfo,
    options: Required<GitlabOptions>
  ) {
    super(options);
    Object.assign(this, mergeRequestInfo);
  }

  async getBranch(): Promise<Branch> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.project_id}/repository/branches/${this.source_branch}`,
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return new Branch(data, this.options, this.project_id);
  }

  async findPipelines(
    searchOptions: Omit<PipelineSearchOptions, "ref_name"> = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.project_id}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ...searchOptions,
        ref_name: this.source_branch,
      },
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }
}
