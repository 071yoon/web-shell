import terminalData from "./terminalData.json";

export default class TerminalLocation {
  private path: Array<string>;
  private searchCnt: number;
  private isSearching: boolean;
  private currentSearchingWord: string;

  constructor() {
    this.path = ["root"];
    this.searchCnt = 0;
    this.isSearching = false;
    this.currentSearchingWord = "";
  }

  private getCurrentLocation(): any {
    // terminalData["root"]["home"]["yeonggi"]
    // terminalData["root"]["home"]
    // terminalData["root"]
    let currentLocation = terminalData["root"];
    for (const location of this.path.slice(1)) {
      // TODO: fix json type
      currentLocation = (currentLocation.children as { [key: string]: any })[
        location
      ];
    }
    return currentLocation;
  }

  public setToRoot(): void {
    this.path = ["root"];
  }

  public getPath(): string {
    // ["root"] -> /
    // ["root", "home"] -> /home
    // ["root", "home", "yeonggi"] -> /home/yeonggi
    if (this.path.length === 1) return "/";
    return "/" + this.path.slice(1).join("/");
  }

  public changeDirectory(newPath: string): boolean {
    // go to directory after checking type === folder
    const currentLocation = this.getCurrentLocation();
    try {
      if (currentLocation.children[newPath].type === "folder") {
        this.path = this.path.concat(newPath);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public goBack(): void {
    // ["root", "home", "yeonggi"] -> ["root", "home"]
    // ["root", "home"] -> ["root"]
    if (this.path.length > 1) this.path.pop();
  }

  public getChildren(): any {
    const currentLocation = this.getCurrentLocation();
    if (currentLocation === undefined) return {};
    return currentLocation.children;
  }

  public getData(target: string): any {
    try {
      return this.getChildren()[target].data;
    } catch {
      return null;
    }
  }

  public getBackupPath(): Array<string> {
    return this.path;
  }

  public setToBackupPath(backup: Array<string>): void {
    this.path = backup;
  }

  public getSearchCnt(): number {
    return this.searchCnt;
  }

  public incrementSearchCnt(total: number): number {
    this.searchCnt = (this.searchCnt + 1) % total;
    return this.searchCnt;
  }

  public initSearch(): void {
    this.searchCnt = 0;
    this.isSearching = false;
    this.currentSearchingWord = "";
  }

  public getIsSearching(): boolean {
    return this.isSearching;
  }

  public toggleIsSearching(): boolean {
    this.isSearching = !this.isSearching;
    return this.isSearching;
  }

  public getCurrentSearchingWord(): string {
    return this.currentSearchingWord;
  }

  public setCurrentSearchingWord(word: string): void {
    this.currentSearchingWord = word;
  }
}
