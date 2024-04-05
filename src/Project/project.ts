import { ProjectInfo } from ".";
import { BranchInfo, BranchSearchOptions } from "../Branch";
import { Branch } from "../Branch/branch";
import { CommitInfo, CommitSearchOptions } from "../Commit";
import { Commit } from "../Commit/commit";
import { File } from "../File/file";
import { Methods } from "../GitlabApiClientBase";
import { GitlabApiClientBase } from "../GitlabApiClientBase/gitlabApiClientBase";
import { Issue } from "../Issue/issue";
import { MergeRequestInfo, MergeRequestSearchOptions } from "../MergeRequest";
import { MergeRequest } from "../MergeRequest/mergeRequest";
import { PipelineInfo, PipelineSearchOptions } from "../Pipeline";
import { Pipeline } from "../Pipeline/pipeline";
import { GitlabOptions } from "../Gitlab";
import { decodeBase64 } from "../utils/base64";
import { IssueCreateOptions, IssueInfo, IssueSearchOptions } from "../Issue";

export interface Project extends ProjectInfo {}

export class Project extends GitlabApiClientBase {
  constructor(projectInfo: ProjectInfo, options: Required<GitlabOptions>) {
    super(options);
    Object.assign(this, projectInfo);
  }
  async findBranches(
    searchOptions: BranchSearchOptions = {}
  ): Promise<Branch[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/repository/branches`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (branch: BranchInfo) => new Branch(branch, this.options, this.id)
    );
  }

  async findMergeRequests(
    searchOptions: MergeRequestSearchOptions = {}
  ): Promise<MergeRequest[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/merge_requests`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (mergeRequest: MergeRequestInfo) =>
        new MergeRequest(mergeRequest, this.options)
    );
  }

  async findCommits(
    searchOptions: CommitSearchOptions = {}
  ): Promise<Commit[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/repository/commits`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (commit: CommitInfo) => new Commit(commit, this.options, this.id)
    );
  }

  async findPipelines(
    searchOptions: PipelineSearchOptions = {}
  ): Promise<Pipeline[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/pipelines`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map(
      (pipeline: PipelineInfo) => new Pipeline(pipeline, this.options)
    );
  }

  async findIssues(searchOptions: IssueSearchOptions = {}): Promise<Issue[]> {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/issues`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: searchOptions,
    });
    return data.map((issue: IssueInfo) => new Issue(issue, this.options));
  }

  async getFile(filePath: string, ref: string) {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/repository/files/${filePath}`,
      method: Methods.GET,
      expectedStatusCode: 200,
      params: { ref },
    });
    return new File(
      { ...data, content: decodeBase64(data.content) },
      this.options,
      this.id,
      ref
    );
  }

  async createBranch(branchName: string, sourceBranchName: string) {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/repository/branches?branch=${branchName}&ref=${sourceBranchName}`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
    return new Branch(data, this.options, this.id);
  }

  async createIssue(issue?: IssueCreateOptions) {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/issues`,
      method: Methods.POST,
      expectedStatusCode: 201,
      data: issue,
    });
    return new Issue(data, this.options);
  }

  async archive() {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/archive`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
    Object.assign(this, data);
  }

  async unArchive() {
    const { data } = await this.CallGitlabApi({
      endpoint: `/projects/${this.id}/unarchive`,
      method: Methods.POST,
      expectedStatusCode: 201,
    });
    Object.assign(this, data);
  }

  async delete() {
    await this.CallGitlabApi({
      endpoint: `/projects/${this.id}`,
      method: Methods.DELETE,
      expectedStatusCode: 202,
    });
  }
}
