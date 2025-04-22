export interface IUser {
  user: any;
  //user: any;
  _id?: string;
  // name: string;
  email: string;
  // mobile: string;
  password?: string;
  role?: string;
  token?: string;


}

export interface IUserLogin {
  email: string;
  password: string;

}

// complete user details
export interface IProfileDetails {
  mobile?: number;
  gender?: string;
  city?: string;

  age?: number;
  height?: number;
  weight?: number;

  language?: string;
  education?: string;

  profession?: string;
  income?: number;
  religion?: string;
  profilePic?: string;
}
export const defaultProfile: IProfileDetails = {
  mobile: 1111 - 1111 - 11,
  gender: "male",
  city: "",

  age: 0,
  height: 0,
  weight: 0,

  language: "",
  education: "",

  profession: "",
  income: 0,
  religion: "",
  profilePic: "",
};

export const defaultUser: IUser = {
  // name: "",
  email: "",
  role: '',
  // mobile: "",
  password: "",
  token: '',
  user: undefined
};
