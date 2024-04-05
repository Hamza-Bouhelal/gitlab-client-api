# Gitlab-client-api

[Gitlab-client-api](https://www.npmjs.com/package/gitlab-client-api) is a client api for the gitlab api (v4). It provides methods for all of the following:

- [x] Projects
- [x] Branches
- [x] Groups
- [x] Users
- [x] Issues
- [x] Merge Requests
- [x] Commits
- [x] Pipelines
- [x] Jobs
- [x] Files

## Installation

### npm

```bash
npm install gitlab-client-api
```

### yarn

```bash
yarn add gitlab-client-api
```

## Diagram

![api-diagram](https://i.ibb.co/qsDb1Yw/src-diagram.png)

## Usage

```typescript
import { Gitlab } from "gitlab-client-api";

// Create a new instance of the gitlab client
// Either set the private token as options of provide env variable GITLAB_TOKEN
// Setting cache to true will cache the results of requests that were made with that instance of the client

const gitlab = new Gitlab({
  privateToken: "your-private-token",
  gitlabUrl: "https://subdomain.gitlab.com", // default is https://gitlab.com
  cache: true, // default is false
});
```

### Cache

```typescript
// Cache can be cleared with
gitlab.resetCache();
```

### Users

Find users search Options: [UserSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/User/index.ts?ref_type=heads#L4)

User Object interface:

- [RestrictedUserInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/User/index.ts?ref_type=heads#L56)
- [UserInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/User/index.ts?ref_type=heads#L66)

```typescript
// find users
const users = await gitlab.findUsers({ username: "Hamza-bouhelal" });

// find user associated with the private token
const user = await gitlab.getUser();
```

### Groups

Find groups search Options: [GroupSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Group/index.ts?ref_type=heads#L4)

Group Object interface: [GroupInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Group/index.ts?ref_type=heads#L67)

Create Group Options: [CreateGroupOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Group/index.ts?ref_type=heads#L98)

```typescript
// gets all groups matching the search term
const groups = await gitlab.findGroups({ search: "gitlab" });
console.log(groups[0]?.name);

// create new group
const newGroup = await gitlab.createGroup({ name: "test", path: "test" });

// delete group
await newGroup.delete();
```

### Projects

Find projects search Options: [ProjectSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Project/index.ts?ref_type=heads#L4)

Project Object interface: [ProjectInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Project/index.ts?ref_type=heads#L162)

Create Project Options: [CreateProjectOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Project/index.ts?ref_type=heads#L240)

```typescript
// gets all projects matching the search term
const projects = await gitlab.findProjects({ search: "gitlab-client-api" });
console.log(projects[0]?.id);

// create new project
const newProject = await gitlab.createProject({ name: "test" });
console.log(newProject.id);

// archive project
await newProject.archive();

// unarchive project
await newProject.unarchive();

// delete project
await newProject.delete();
```

### Issues

Find Issue search Options: [IssueSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Issue/index.ts?ref_type=heads#L6)

Issue Object interface: [IssueInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Issue/index.ts?ref_type=heads#L165)

New Issue Options: [CreateIssueOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Issue/index.ts?ref_type=heads#L229)

```typescript
// find issues in project
const issues = await myProject.findIssues();
console.log(issues[0]?.author);

// create a new issue
const newIssue = await myProject.createIssue({
  title: "New Issue",
  description: "This is a new issue",
});

// delete an issue
await newIssue.delete();
```

### Files

File Object interface: [FileInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/File/index.ts?ref_type=heads#L1)

```typescript
// Get file in project
const file = await myProject.getFile("/test.txt", "master");
console.log(file.content);

// get file blame
const blame = await file.getBlame();
```

### Merge Requests

Find Merge Request search Options: [MergeRequestSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/MergeRequest/index.ts?ref_type=heads#L6)

Merge Request Object interface: [MergeRequestInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/MergeRequest/index.ts?ref_type=heads#L183)

New Merge Request Options: [CreateMergeRequestOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/MergeRequest/index.ts?ref_type=heads#L265)

```typescript
// get all merge requests of a project
const mergeRequests = await project.findMergeRequests({
  search: "my-merge-request-title",
});
console.log(mergeRequests[0]?.author);

// create a new merge request
const newMergeRequest = await someBranch.createMergeRequest({
  target_branch: "master",
  title: "New Merge Request",
});

// accept and merge a merge request
await newMergeRequest.merge();

// delete a merge request
await newMergeRequest.delete();
```

### Branches

Find Branch search Options: [BranchSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Branch/index.ts?ref_type=heads#L4)

Branch Object interface: [BranchInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Branch/index.ts?ref_type=heads#L16)

```typescript
// get all branches of a project
const branches = await project.findBranches();
console.log(branches[0]?.name);

// get branch from a found pipeline
const branchFromPipeline = await pipeline.getBranch();
console.log(branchFromPipeline.name);

// create a new branch
const newBranch = await project.createBranch("new-branch", "master");

// delete a branch
// WARNING: This will delete the branch and all of its commits
await newBranch.delete();
```

### Commits

Find Commit search Options: [CommitSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Commit/index.ts?ref_type=heads#L4)

Commit Object interface: [CommitInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Commit/index.ts?ref_type=heads#L61)

```typescript
// get commits of a project
const projectCommits = await project.findCommits({
  author: "Hamza Bouhelal",
});
console.log(projectCommits[0]?.author_name);

// get commits of a branch
const masterBranchCommits = await masterBranch.findCommits();
console.log(masterBranchCommits[0]?.message);

// Revert a commit
// WARNING: This will create a new commit that reverts the original commit
const revertCommit = await projectCommits[0].revert();
```

### Pipelines

Find Pipeline search Options: [PipelineSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Pipeline/index.ts?ref_type=heads#L4)

Pipeline Object interface: [PipelineInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Pipeline/index.ts?ref_type=heads#L105)

```typescript
// Find all pipelines for the project
const projectsPipelines = await myProject.findPipelines();
console.log(projectsPipelines[0]?.status);

// Find all pipelines for the merge request
const mergeRequestPipelines = await mergeRequest.findPipelines();
console.log(mergeRequestPipelines[0]?.status);

// Find all pipelines for the first commit
const commitPipelines = await projectCommits[0].findPipelines();
console.log(commitPipelines[0]?.status);

// Find all pipelines for the master branch
const masterBranchpipelines = await masterBranch.findPipelines();
console.log(masterBranchpipelines[0]?.status);

// Create a new pipeline for the master branch
const newPipeline = await masterBranch.createPipeline();
console.log(newPipeline.web_url);

// Retry a pipeline
const retriedPipeline = await newPipeline.retry();

// Cancel a pipeline
await retriedPipeline.cancel();

// Delete a pipeline
await retriedPipeline.delete();
```

### Jobs

Find Job search Options: [JobSearchOptions](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Job/index.ts?ref_type=heads#L7)

Job Object interface: [JobInfo](https://gitlab.com/bouhelalhamza/gitlab-client-api/-/blob/master/src/Job/index.ts?ref_type=heads#L19)

```typescript
const jobs = await pipeline.findJobs();
console.log(jobs[0]?.status);

// Download artifacts from a job
const buffer = await jobs[0].downloadArtifacts();

// Retry a job
const retriedJob = await jobs[0].retry();

// Cancel a job
await retriedJob.cancel();

// Erase a job
await retriedJob.erase();

// Start a job
await retriedJob.play();
```

## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) [2024] [Hamza Bouhelal]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
