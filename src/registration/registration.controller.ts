import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationDto } from "../dto/registration-dto";
import { Registration } from "../schemas/registration.schema";

@Controller("registration")
export class RegistrationController {
  constructor(private registrService: RegistrationService) {
  }

  // @Post()
  // postRegistData(@Body() body: RegistrationDto): void {
  //   const registrData = new RegistrationDto(
  //     body.id,
  //     body.name,
  //     body.price,
  //     body.tags,
  //     body.favorite,
  //     body.stars,
  //     body.imageUrl,
  //     body.description,
  //     body.sizeWeight
  //   );
  //   this.registrationService.postRegistData(registrData);
  // }

  @Post() // проверка находится ли уже такой юзер в БД, находим по логину
  sendUsers(@Body() data: RegistrationDto): Promise<Registration> {
    return this.registrService.checkRegUser(data.email).then((queryRes) => {
      // console.log('data reg', queryRes)
      if (queryRes.length === 0) { // если такой юзер не найден, то создаем новую запись в БД из data
        return this.registrService.sendUser(data);
      } else {
        // если такой логин уже есть в БД, то дает нам ошибку
        // console.log('err - user is exists')
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь уже зарегистрирован',
          },
          HttpStatus.CONFLICT,
        );
      }
    });
  }

  // @Delete() //удалит всех пользователей.
  // deleteAllUsers(): Promise<any> {
  //   return this.registrationService.deleteAllUsers()
  //
  // }


  // @Post('auth') // для аутиентификации, сделаю когда подключу монго, вынести в отдельный login
  // postRegistData(@Body() data: RegistrationDto): void {
  //   const email = data.email;
  //
  //   this.registrationService.postRegistData(registrData);
  // }

  // @Get()
  // getUser() {
  //   return this.registrationService.getUser(); //тест посмотреть выводится ли массив
  // }
}
