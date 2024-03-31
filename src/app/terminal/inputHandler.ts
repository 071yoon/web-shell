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
  if (command === "help") {
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
    const children = terminalLocation.getChildren();
    inputCallback(commandBefore + Object.keys(children).join(" "));
  } else {
    inputCallback(`Command not found: ${command}`);
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
    - help: show this message
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
        return false;
      }
    }
  }
  return true;
};
