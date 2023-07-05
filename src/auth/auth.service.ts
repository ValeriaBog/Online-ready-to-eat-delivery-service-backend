import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Registration, RegistrationDocument } from "../schemas/registration.schema";
import { Model } from "mongoose";
import { LoginDto } from "../dto/login-dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(@InjectModel(Registration.name) private registrationModel: Model<RegistrationDocument>,
    private jwtService: JwtService,
  ) {}

  async checkAuthUser(
    email: string,
    password: string,
  ): Promise<Registration[]> {
    const userArr = await this.registrationModel.find({
      email: email,
      password: password,
    });
    return userArr.length === 0 ? null : userArr;
  }


  async findByEmail(user: LoginDto){
    const payload = { email: user.email, psw: user.password };
    const userFromDb = await this.registrationModel.find({ email: user.email });
    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload),
      name: userFromDb[0].name,
      lastName: userFromDb[0].lastName,
      email: userFromDb[0].email,
    }
  }
}
