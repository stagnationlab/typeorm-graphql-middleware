/* tslint:disable */

export interface Query {
  userList?: User[] | null; 
}

export interface User {
  id: string; 
  name: string; 
  posts: Post[]; 
}

export interface Post {
  id: string; 
  name: string; 
  user: User; 
}

export interface Mutation {
  addUser: User; 
}

export interface AddUserInput {
  name: string; 
  posts?: string[] | null; 
}
export interface AddUserMutationArgs {
  input?: AddUserInput | null; 
}

export interface Subscription {}
