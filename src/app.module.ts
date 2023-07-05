import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from "./login/login.module";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { OrderModule } from "./order/order.module";

//модуль предоставляет метаданные Nest, необходимые для организации структуру приложения
@Module({
  imports: [
    FoodsModule,
    RegistrationModule,
    LoginModule,
    OrderModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/online-store'),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyService],
})
export class AppModule {}
