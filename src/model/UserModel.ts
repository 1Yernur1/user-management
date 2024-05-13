export interface UserModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  registrationDate: Date | string;
}