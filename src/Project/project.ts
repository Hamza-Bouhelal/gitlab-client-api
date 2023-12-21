import { ProjectInfo } from ".";
import { BranchInfo } from "../Branch";
import { Branch } from "../Branch/branch";
import { CommitInfo } from "../Commit";
import { Commit } from "../Commit/commit";
import { File } from "../File/file";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Issue } from "../Issue/issue";
import { MergeRequestInfo } from "../MergeRequest";
import { MergeRequest } from "../MergeRequest/mergeRequest";
import { PipelineInfo } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { decodeBase64 } from "../utils/base64";
import { SearchOptions } from "../utils/types";
import { IssueInfo } from "../Issue";

export class Project extends GitlabApiClientBase {
  constructor(
    private projectInfo: ProjectInfo,
    options: Required<GitlabOptions>
  ) {
    super(options);
    this.projectInfo = projectInfo;
  }

  getInfo() {
    return this.projectInfo;
  }

  async findBranches(searchOptions: SearchOptions = {}): Promise<Branch[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/repository/branches`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map(
      (branch: BranchInfo) =>
        new Branch(branch, this.options, this.projectInfo.id)
    );
  }

  async findMergeRequests(
    searchOptions: SearchOptions = {}
  ): Promise<MergeRequest[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/merge_requests`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map(
      (mergeRequest: MergeRequestInfo) =>
        new MergeRequest(mergeRequest, this.options)
    );
  }

  async findCommits(searchOptions: SearchOptions = {}): Promise<Commit[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/repository/commits`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map((commit: CommitInfo) => new Commit(commit, this.options));
  }

  async findPipelines(searchOptions: SearchOptions = {}): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map(
      (pipeline: PipelineInfo) => new Pipeline(pipeline, this.options)
    );
  }

  async findIssues(searchOptions: SearchOptions = {}): Promise<Issue[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/issues`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams(searchOptions),
    });
    return data.map((issue: IssueInfo) => new Issue(issue, this.options));
  }

  async getFile(filePath: string, ref: string) {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.projectInfo.id}/repository/files/${filePath}`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: super.getSearchParams({ ref } as SearchOptions),
    });
    return new File(
      { ...data, content: decodeBase64(data.content) },
      this.options,
      this.projectInfo.id,
      ref
    );
  }
}
