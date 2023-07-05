import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "../dto/login-dto";
import {AuthGuard} from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Controller('login')
export class LoginController {

  constructor(private loginService: LoginService, private authServer: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  authUser(@Body() data: LoginDto, @Param('login') email): any {

    return this.authServer.findByEmail(data)
  }

  // @Post()
  // postLoginData(@Body() data: LoginDto): void {
  //   const loginData = new LoginDto(
  //     data.email,
  //     data.password,
  //   );
  //   this.loginService.postLoginData(loginData);
  // }

  // @Get()
  // getLoginUser() {
  //   return this.loginService.getLogUser(); //тест посмотреть выводится ли массив
  // }
}
