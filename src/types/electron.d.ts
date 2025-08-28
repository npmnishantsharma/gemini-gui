export interface ElectronAPI {
  on: (channel: string, callback: (...args: any[]) => void) => void;
  send: (channel: string, args: any[]) => void;
  
  // Basic file system APIs
  openFolder: () => Promise<string | null>;
  readFile: (filePath: string) => Promise<string>;
  readDirectory: (dirPath: string) => Promise<FileItem[]>;
  getFileStats: (filePath: string) => Promise<FileStats>;
  
  // Extended file system APIs
  writeFile: (filePath: string, content: string) => Promise<boolean>;
  createDirectory: (dirPath: string) => Promise<boolean>;
  deleteFile: (filePath: string) => Promise<boolean>;
  deleteDirectory: (dirPath: string) => Promise<boolean>;
  fileExists: (filePath: string) => Promise<boolean>;
  getFileExtension: (filePath: string) => Promise<string>;
  getFileName: (filePath: string) => Promise<string>;
  getDirectoryName: (filePath: string) => Promise<string>;
  joinPaths: (...paths: string[]) => Promise<string>;
}

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size: number;
  modified: Date;
}

export interface FileStats {
  size: number;
  modified: Date;
  isDirectory: boolean;
  isFile: boolean;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
} 