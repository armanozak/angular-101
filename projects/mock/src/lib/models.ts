export interface List<T extends {}> {
  rows: Rec<T>[];
  totalCount: number;
}

export interface ListRequest {
  page: number;
  limit: number;
}

export type Rec<T extends {}> = T & {
  id: string;
};

export type Todo = {
  title: string;
  done: boolean;
};

export interface TodoCreate {
  title: string;
}

export interface TodoUpdate {
  title: string;
  done: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
}
