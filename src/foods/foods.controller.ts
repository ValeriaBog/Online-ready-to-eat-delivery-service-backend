import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FoodsService } from './foods.service';
import { IFood } from '../interfaces/food';

// по запросу http://localhost:3000/foods на сервере,
// будет отображаться то, что возвращаем через метод get
@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}
  // @Get() // будет отображаться данные
  // getFoods() {
  //   return this.foodService.getFoods();
  // }

  @Get()
  getFood(): Promise<IFood[]>{
    return this.foodService.getAllFood()
  }

  // @UseGuards()
  // @Get()
  // getAllTours(): Promise<IFood[]> {
  //   return this.foodService.getAllTours();
  // }

  // @Post()
  // initFood(@Body() body: FoodDto): void {
  //   const foodData = new FoodDto(
  //     body.id,
  //     body.name,
  //     body.price,
  //     body.tags,
  //     body.favorite,
  //     body.stars,
  //     body.imageUrl,
  //     body.description,
  //     body.sizeWeight,
  //   );
  //   this.foodService.uploadFood(foodData);
  // }
}
