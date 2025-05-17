
export interface UserDescription {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}


export interface TaskDescription {
  id: number;
  userId: string;
  text: string;
  importance: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

export interface SignupDataDescription {

}