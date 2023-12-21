import { execSync } from "child_process";

enum VersionUpdateType {
  patch = "patch",
  minor = "minor",
  major = "major",
}

const versionUpdateType = (message: string): VersionUpdateType => {
  return message.startsWith("fix")
    ? VersionUpdateType.patch
    : message.startsWith("feat")
    ? VersionUpdateType.minor
    : message.startsWith("perf")
    ? VersionUpdateType.major
    : VersionUpdateType.patch;
};

const commitMessage = process.argv[2];

if (!commitMessage) {
  console.log("Commit message wasn't passed down.");
  process.exit(1);
}

const versionUpdate = versionUpdateType(commitMessage);
const NEW_VERSION = execSync(`npm version ${versionUpdate} --force`, {
  encoding: "utf-8",
});

console.log(`Releasing package gitlab-client-api@${NEW_VERSION}`);

execSync("npm publish --access public --registry https://registry.npmjs.org/");

console.log("Released successfully! \n Pushing to git...");

execSync(
  [
    "git remote remove origin",
    "git remote add origin https://bouhelalhamza:${GITLAB_TOKEN}@gitlab.com/bouhelalhamza/gitlab-client-api.git",
    "git push origin HEAD:master -o ci.skip",
  ].join(" && "),
  { encoding: "utf-8" }
);
