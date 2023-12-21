export interface FileInfo {
  file_name: string;
  file_path: string;
  size: number;
  encoding: string;
  content_sha256: string;
  ref: string;
  blob_id: string;
  commit_id: string;
  last_commit_id: string;
  execute_filemode: boolean;
  content: string;
}

export interface GitlabCommitInfo {
  commit: {
    id: string;
    parent_ids: string[];
    message: string;
    authored_date: string;
    author_name: string;
    author_email: string;
    committed_date: string;
    committer_name: string;
    committer_email: string;
  };
  lines: string[];
}
