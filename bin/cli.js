#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx @fullsnacker/create-express-ts-starter my-ex-ts");
  process.exit(1);
}

const repoName = process.argv[2];
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, repoName);

const rm = promisify(fs.rm);

main();

async function main() {
  const runCommand = (command) => {
    try {
      execSync(`${command}`, { stdio: "inherit" });
    } catch (e) {
      console.error(`Failed to execute ${command} \n`, e);
      return false;
    }
    return true;
  };

  const gitCheckoutCommand = `git clone --depth 1 https://github.com/fullsnacker/create-express-ts-starter ${repoName}`;
  const installDepsCommand = `cd ${repoName} && npm install`;
  const newReadmeCommand = `cd ${repoName} && echo README for '${repoName}' > README.md`;
  const gitInitCommand = `cd ${repoName} && git init`;
  const gitAddCommand = `cd ${repoName} && git add .`;
  const gitCommitCommand = `cd ${repoName} && git commit -m "Initial commit"`;

  console.log(`\nCreating your project '${repoName}' \n`);

  const checkedOut = runCommand(gitCheckoutCommand);
  if (!checkedOut) process.exit(-1);

  const projectPackageJson = require(path.join(projectDir, "package.json"));

  projectPackageJson.author = "";
  projectPackageJson.homepage = "";
  projectPackageJson.keywords = {};
  projectPackageJson.name = repoName;
  projectPackageJson.repository = {};
  projectPackageJson.version = "0.0.0";

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(projectPackageJson, null, 2)
  );

  //Deleting unnecesary template files.
  await deleteFiles();

  console.log(`Installing dependencies for ${repoName}`);
  const installedDeps = runCommand(installDepsCommand);
  if (!installedDeps) process.exit(-1);

  console.log(`Creating new project README \n`);
  const createdRedme = runCommand(newReadmeCommand);
  if (!createdRedme) process.exit(-1);

  console.log(`Initializing GIT repository \n`);
  const initializedRepo = runCommand(gitInitCommand);
  if (!initializedRepo) process.exit(-1);

  console.log(`\nAdding files for commit \n`);
  const addedFiles = runCommand(gitAddCommand);
  if (!addedFiles) process.exit(-1);

  console.log(`Commiting files added \n`);
  const commitedFiles = runCommand(gitCommitCommand);
  if (!commitedFiles) process.exit(-1);

  console.log(
    "\nCongratulations! You now have your Node.js project with Express.js, Typescript, Nodemon and Eslint ready!. \n"
  );
  console.log("Follow the following commands to start: \n");
  console.log(`   cd ${repoName} && npm run dev \n`);
}

async function deleteFiles() {
  try {
    console.log("\nDeleting unnecesary template files... \n");
    await Promise.all([
      rm(path.join(projectDir, ".git"), { recursive: true, force: true }),
      rm(path.join(projectDir, "bin"), { recursive: true, force: true }),
    ]);

    console.log("Files deleted succesfully! \n");
  } catch (error) {
    console.error("Error deleting files:", error);
  }
}
