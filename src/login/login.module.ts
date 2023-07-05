import { Module } from '@nestjs/common';
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { AuthService } from '../auth/auth.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Registration, RegistrationSchema } from "../schemas/registration.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../private/secret";

@Module({
  controllers: [LoginController,
  ],
  imports: [
    MongooseModule.forFeature([
    { name: Registration.name, schema: RegistrationSchema },
  ]), PassportModule, JwtModule.register({secret: jwtConstants.secret})],
  providers: [LoginService, AuthService],
})
export class LoginModule {}
