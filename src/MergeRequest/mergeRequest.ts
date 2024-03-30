import { MergeRequestInfo } from ".";
import { Branch } from "../Branch/branch";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { PipelineInfo } from "../Pipeline";
import { PipelineSearchOptions } from "../Branch";

export class MergeRequest extends GitlabApiClientBase {
  constructor(
    private mergeRequestInfo: MergeRequestInfo,
    options: Required<GitlabOptions>
  ) {
    super(options);
    this.mergeRequestInfo = mergeRequestInfo;
  }

  getInfo() {
    return this.mergeRequestInfo;
  }

  async getBranch(): Promise<Branch> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.mergeRequestInfo.project_id}/repository/branches/${this.mergeRequestInfo.source_branch}`,
      method: Methods.GET,
      expectedStatusCode: 200,
    });
    return new Branch(data, this.options, this.mergeRequestInfo.project_id);
  }

  async findPipelines(
    searchOptions: Omit<PipelineSearchOptions, "ref_name"> = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.getInfo().project_id}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ...searchOptions,
        ref_name: this.mergeRequestInfo.source_branch,
      },
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }
}
