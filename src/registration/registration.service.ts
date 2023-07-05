import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Registration, RegistrationDocument } from "../schemas/registration.schema";

@Injectable()
export class RegistrationService {

  // private usersData: IRegistration[] = [];

  constructor(@InjectModel(Registration.name) private registrationModel: Model<RegistrationDocument>) {}

  async checkRegUser(email: string): Promise<Registration[]> {
    return this.registrationModel.find({ email: email });
  }// проверка на есть ли такой юзер в БД уже с помощью email

  async sendUser(data): Promise<Registration> {
    const userData = new this.registrationModel(data)
    return userData.save()
  }//если такого юзера нет, то создаем новую запись


  // async deleteAllUsers(): Promise<any> {
  //   return this.registrationModel.findOneAndRemove()
  // }

  // postRegistData(data: RegistrationDto): Promise<Registration> {
  //   const registrationData = new this.registrationModel(data);
  //   return registrationData.save();

    // this.usersData.push(data);
  }

  //потом подключить монгус

  // getUser() {
  //   return this.usersData; //тест посмотреть выводится ли массив
  // }
// }
