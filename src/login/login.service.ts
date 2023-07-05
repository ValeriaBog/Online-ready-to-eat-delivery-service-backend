import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LoginService extends PassportStrategy(Strategy) {
  // отвечает за аутентификацию и генерирует токен, те пользовательно успешно авторизовался - появился токен
  //  private usersData: ILogin[] = [];

  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any>{
    const user = await this.authService.checkAuthUser(email, password) //проверяем есть ли такой юзер
    if (!user) {
      throw new HttpException(
        {
        status: HttpStatus.CONFLICT,
          errorText: 'Пользователь не найден в базе',
      }, HttpStatus.CONFLICT)
    }
    return true
  }



  // postLoginData(data: LoginDto) {
  //   this.usersData.push(data);
  // }

  // getLogUser() {
  //   return this.usersData; //тест посмотреть выводится ли массив
  // }
}
