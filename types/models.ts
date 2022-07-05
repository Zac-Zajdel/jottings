export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  // relations
  jots?: Jots;
  folders?: Folders;
}
export type Users = User[];

export interface Jot {
  id: number;
  userId: number;
  title: string;
  jot: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  // relations
  user?: User;
}
export type Jots = Jot[];

export interface Folder {
  id: number;
  userId: number;
  name: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  // relations
  user?: User;
}
export type Folders = Folder[];
