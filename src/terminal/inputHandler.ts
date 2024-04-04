import TerminalLocation from "./terminalLocation";

const terminalLocation = new TerminalLocation();

const whoamiData = `

| ##########################&st;&st;++++++++++++++&eq;&eq;&eq;&eq;------------&eq;&eq; Hi there! I'm YeongGi Yoon, a software engineer based in Seoul, South Korea.
| #########################&st;++++++++++++++&eq;------------------- I'm passionate about building software that makes a difference in the world.
| #################@%%%#######&st;+++++++++&eq;---------------------
| ################@@%%%@@@%%%@#+++++++&eq;----------------------- Here are some of the technologies I've been working with recently:
| ################@@@%@%%%%%@%&st;++++++------------------------- - JavaScript (ES6+)
| ################@@%%%%%%@@#+++++++-----------::::...:::----- - React
| ###############@@%%%%%@&st;-++&st;&eq;&eq;+@%&st;&eq;--------::...........::-- - Node.js
| #############%@@%%%@@@&eq;..&eq;-&st;+&eq;+@%@@@#&st;&eq;---:...............:- - TypeScript
| ##############@%%%@@##&eq;.-&eq;&st;+&eq;&eq;+@%%%%%@#--:.................: - Java
| #################%@++#@&st;++&eq;&st;###@%%%%%@#--:.................. - Spring Boot
| ################%+    &st;%+++%%&st;##%@%%%@#--:......&eq;........... 
| ##############%%&st;.    +@-+%&st;%%@@##%@@@%+&eq;-:.....#........... 
| ##############@&st;-..&st;   +&eq;%@#%--#@%&st;&eq;#@#&eq;+&st;--::.&eq;@&st;#&eq;....::-- I'm currently looking for new opportunities, 
| #############%#&eq;: .+&st;.      &st;-&st;@#&st;+&st;&st;+----#&st;---%&st;&st;&st;&eq;-------- so feel free to reach out to me if you think I can help you with your project!
| #############@#&st;-. .&st;&st;-.  .+#&st;%@#&st;+&eq;--&eq;+#&st;%%----+%--------&eq;&eq; 
| ############%%&eq;&st;&st;&st;+-.:&eq;&eq;&eq;%#&st;+-&eq;&eq;+%#&st;#%&st;+&eq;&eq;&eq;%++++&st;%++++++++++ 
| ###########%%---:        .+%@&st;#&eq;--%+------&eq;%++++&st;%++++++++++ contact: yeonggi@kakao.com
| ########%%%@----.        &eq;###--%--%+------&eq;%+++&st;#%%&st;++++++++ github: https://github.com/071yoon
| ######%%%%@+---:        +#.:#@%@+&eq;%+&eq;&eq;&eq;&eq;&eq;&st;#&st;++%%++##++++++++ 
| ####%%%%%%@@@@#&st;++.....+@@%%%%%%@@@@@@@@%&st;++++#####&st;++++++++
| ###%%%%%%%%%%%%%%%@@@%%#%%%%%%%%%%%%%%%#&st;+++++++++++++++++++
| ###%%%%%%%%%%%%%%%%###########&st;&st;&st;&st;&st;&st;&st;&st;&st;+++++++++++++++++++++
| ###%%%%%%%%%%%##################&st;&st;++++++++++++++++++++++++++
| ##################################&st;&st;++++++++++++++++++++++++

`;

const helpData = `
Available commands:
- help: list all commands
- clear: clear the screen
- echo: repeat the input
- ls: list all files
- cat: show the content of a file
- cd: change directory
- pwd: show the current directory
- whoami: show the current user
- exit: close the terminal
`;

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
  } else if (command === "exit") {
    window.close();
  } else if (command === "whoami") {
    inputCallback(commandBefore + whoamiData);
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
  return "&gt; " + input + "\n";
};

const helpHandler = (
  result: string,
  inputString: string,
  inputCallback: (input: string) => void
) => {
  return inputCallback(preCommand(result, inputString) + helpData);
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
