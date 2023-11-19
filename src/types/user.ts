export default interface Usertype {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: number;
  role: number;
}

export interface UserApi {
  user?: Usertype;
}
