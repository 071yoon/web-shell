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
  if (command === "help") {
    helpHandler(result, inputData, inputCallback);
  } else if (command === "clear") {
    inputCallback("");
  } else if (command === "echo") {
    inputCallback(inputParams.slice(1).join(" "));
  } else {
    inputCallback(`Command not found: ${command}`);
  }
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
  const prefix = addResultLineBreak(result) + addInputLineBreak(inputString);
  return inputCallback(
    prefix +
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
