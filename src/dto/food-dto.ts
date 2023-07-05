import { ILogin } from "../interfaces/login";

export class LoginDto implements ILogin{
  id!: string;
  email!: string;
  password!: string;

  constructor(id, email, password) {

    this.id = id;
    this.email = email;
    this.password = password;

  }
}