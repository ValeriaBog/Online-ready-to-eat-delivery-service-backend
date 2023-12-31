import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Food, FoodSchema } from "../schemas/food.schema";

@Module({ imports: [MongooseModule.forFeature([{name: Food.name, schema: FoodSchema}])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
