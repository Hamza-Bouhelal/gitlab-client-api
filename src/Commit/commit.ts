import { CommitInfo } from ".";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { PipelineInfo } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { SearchOptions } from "../utils/types";
import { PipelineSearchOptions } from "../Branch";

export class Commit extends GitlabApiClientBase {
  constructor(
    private commitInfo: CommitInfo,
    options: Required<GitlabOptions>
  ) {
    super(options);
    this.commitInfo = commitInfo;
  }

  getInfo() {
    return this.commitInfo;
  }

  async findPipelines(
    searchOptions: PipelineSearchOptions = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.getInfo().id}/repository/commits/${
        this.commitInfo.short_id
      }/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }
}
