import { BranchInfo, PipelineSearchOptions } from ".";
import { CommitInfo } from "../Commit";
import { Commit } from "../Commit/commit";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { MergeRequest } from "../MergeRequest/mergeRequest";
import { PipelineInfo } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { SearchOptions } from "../utils/types";

interface CustomSearchOptions extends SearchOptions {
  source_branch?: string;
  state?: string;
}

interface CustomBranchSearchOptions extends SearchOptions {
  ref_name: string;
}

export class Branch extends GitlabApiClientBase {
  constructor(
    private branchInfo: BranchInfo,
    options: Required<GitlabOptions>,
    private projectId: number
  ) {
    super(options);
    this.branchInfo = branchInfo;
    this.projectId = projectId;
  }

  getInfo() {
    return this.branchInfo;
  }

  async getMergeRequest(): Promise<MergeRequest> {
    const customSearchOptions: CustomSearchOptions = {
      source_branch: this.branchInfo.name,
      state: "opened",
    };
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/merge_requests`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(customSearchOptions),
    });
    return data[0]
      ? new MergeRequest(data[0], this.options)
      : (null as unknown as MergeRequest);
  }

  async findCommits(searchOptions: SearchOptions = {}): Promise<Commit[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/repository/commits`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams({
        ...searchOptions,
        ref_name: this.branchInfo.name,
      } as CustomBranchSearchOptions),
    });
    return data.map(
      (commitInfo: CommitInfo) => new Commit(commitInfo, this.options)
    );
  }

  async findPipelines(
    searchOptions?: PipelineSearchOptions
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams({
        ...searchOptions,
        ref_name: this.branchInfo.name,
      } as CustomBranchSearchOptions),
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }
}
