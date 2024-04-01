import { BranchInfo } from ".";
import { CommitInfo, CommitSearchOptions } from "../Commit";
import { Commit } from "../Commit/commit";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { MergeRequest } from "../MergeRequest/mergeRequest";
import { PipelineInfo, PipelineSearchOptions } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { MergeRequestSearchOptions } from "../MergeRequest";

export interface Branch extends BranchInfo {}

export class Branch extends GitlabApiClientBase {
  constructor(
    branchInfo: BranchInfo,
    options: Required<GitlabOptions>,
    private projectId: number
  ) {
    super(options);
    this.projectId = projectId;
    Object.assign(this, branchInfo);
  }

  async getMergeRequest(): Promise<MergeRequest | null> {
    const customSearchOptions: MergeRequestSearchOptions = {
      source_branch: this.name,
      state: "opened",
    };
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/merge_requests`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: customSearchOptions,
    });
    return data[0] ? new MergeRequest(data[0], this.options) : null;
  }

  async findCommits(
    searchOptions: Omit<CommitSearchOptions, "ref_name"> = {}
  ): Promise<Commit[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/repository/commits`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ...searchOptions,
        ref_name: this.name,
      },
    });
    return data.map(
      (commitInfo: CommitInfo) => new Commit(commitInfo, this.options)
    );
  }

  async findPipelines(
    searchOptions: Omit<PipelineSearchOptions, "ref_name"> = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectId}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: {
        ...searchOptions,
        ref_name: this.name,
      },
    });
    return data.map(
      (pipelineInfo: PipelineInfo) => new Pipeline(pipelineInfo, this.options)
    );
  }
}
