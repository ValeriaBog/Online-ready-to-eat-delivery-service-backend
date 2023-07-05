import { IRegistration } from "../interfaces/registration";

export class RegistrationDto implements IRegistration{
  name!: string;
  lastName!: string;
  email!: string;
  password!: string

  constructor(name, lastName, email, password) {

    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;

  }
}