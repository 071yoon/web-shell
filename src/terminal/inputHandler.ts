import TerminalLocation from "./terminalLocation";

const terminalLocation = new TerminalLocation();

export const inputHandler = ({
  inputData,
  inputCallback,
  result,
}: {
  inputData: string;
  inputCallback: (input: string) => void;
  result: string;
}) => {
  const inputParams = inputData.split(" ");
  const command = inputParams[0];
  const commandBefore = preCommand(result, inputData);
  if (command === "") {
    inputCallback(commandBefore);
  } else if (command === "help") {
    helpHandler(result, inputData, inputCallback);
  } else if (command === "clear") {
    inputCallback("");
  } else if (command === "echo") {
    inputCallback(inputParams.slice(1).join(" "));
  } else if (command === "cd") {
    if (inputParams.length === 1) {
      inputCallback(commandBefore + "cd: missing operand");
    } else {
      if (cdHandler(inputParams)) {
        inputCallback(commandBefore);
      } else {
        inputCallback(commandBefore + "cd: no such file or directory");
      }
    }
  } else if (command === "pwd") {
    inputCallback(commandBefore + terminalLocation.getPath());
  } else if (command === "ls") {
    lsHandler(commandBefore, inputCallback);
  } else if (command === "cat") {
    catHandler(inputParams, commandBefore, inputCallback);
  } else {
    inputCallback(commandBefore + `Command not found: ${command}`);
  }
};

const preCommand = (result: string, input: string) => {
  return addResultLineBreak(result) + addInputLineBreak(input);
};

const addResultLineBreak = (result: string) => {
  return result + "\n";
};

const addInputLineBreak = (input: string) => {
  return "> " + input + "\n";
};

const helpHandler = (
  result: string,
  inputString: string,
  inputCallback: (input: string) => void
) => {
  return inputCallback(
    preCommand(result, inputString) +
      `Available commands:
    - help: list all commands
    - clear: clear the screen
    - echo: repeat the input
    - ls: list all files
    - cat: show the content of a file
    - cd: change directory
    - pwd: show the current directory
    - mkdir: create a new directory
    - touch: create a new file
    - rm: remove a file or directory
    - mv: move a file or directory
    - cp: copy a file or directory
    - whoami: show the current user
    - date: show the current date
    - exit: close the terminal`
  );
};

const cdHandler = (inputParams: Array<string>) => {
  // ex. cd /home/yeonggi -> ["cd", "/home/yeonggi"]
  // ex. cd .. -> ["cd", ".."]
  // ex. cd ../../home/yeonggi -> ["cd", "..", "..", "home", "yeonggi"]
  const newPath = inputParams[1];
  const targetPath = newPath.split("/");
  const originalPath = terminalLocation.getBackupPath();
  if (targetPath[0] === "") {
    terminalLocation.setToRoot();
    return 1;
  }
  for (const path of targetPath) {
    if (path === "..") {
      terminalLocation.goBack();
    } else if (path === ".") {
      continue;
    } else {
      if (!terminalLocation.changeDirectory(path)) {
        terminalLocation.setToBackupPath(originalPath);
        return false;
      }
    }
  }
  return true;
};

const lsHandler = (
  commandBefore: string,
  inputCallback: (key: string) => void
) => {
  const children = terminalLocation.getChildren();
  const childrenKeys = Object.keys(children);
  inputCallback(
    commandBefore +
      childrenKeys
        .map((child) => {
          const singleChild = (children as { [key: string]: any })[child];
          return `${
            singleChild.type === "folder" ? "drwxr-xr-x" : "-rw-r--r--"
          }   ${singleChild.name}`;
        })
        .join("\n")
  );
};

const catHandler = (
  inputParams: Array<string>,
  commandBefore: string,
  inputCallback: (key: string) => void
) => {
  if (inputParams.length === 1) {
    inputCallback(commandBefore + "cat: missing operand");
  } else {
    const targetFile = terminalLocation.getData(inputParams[1]);
    if (targetFile) {
      console.log(targetFile);
      const content = Object.keys(targetFile).map((key) => {
        return `${key}: ${targetFile[key]}`;
      });
      inputCallback(commandBefore + content.join("\n"));
    } else {
      inputCallback(commandBefore + `cat: "${inputParams[1]}" No such file`);
    }
  }
};
