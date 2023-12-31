import { Get, Injectable, UseGuards } from '@nestjs/common';
import { IFood } from '../interfaces/food';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from '../schemas/food.schema';
import { FoodDto } from '../dto/food-dto';

//поместили массив данных и написали метод, который вернет этот массив
@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  // private foods: IFood[] = [
  //   {
  //     id: "1",
  //     name: "Пицца Пепперони",
  //     sizeWeight: "30 см, традиционное тесто, 670 г",
  //     price: 320,
  //     favorite: false,
  //     description: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
  //     stars: 4.5,
  //     imageUrl: "assets/pizza1.webp",
  //     tags: ["Мясная", "Острая"]
  //
  //   },
  //   {
  //     id: "2",
  //     name: "Пицца Сырный цыпленок",
  //     price: 369,
  //     sizeWeight: "30 см, традиционное тесто, 540 г",
  //     favorite: true,
  //     description: "Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок",
  //     stars: 4.7,
  //     imageUrl: "assets/pizza2.webp",
  //     tags: ["Мясная"]
  //   },
  //   {
  //     id: "3",
  //     name: "Пицца Барбекю",
  //     price: 430,
  //     sizeWeight: "30 см, традиционное тесто, 710 г",
  //     favorite: true,
  //     description: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
  //     stars: 3.5,
  //     imageUrl: "assets/pizza3.webp",
  //     tags: ["Мясная"]
  //   },
  //   {
  //     id: "4",
  //     name: "Пицца Бургер",
  //     price: 430,
  //     sizeWeight: "30 см, традиционное тесто, 660 г",
  //     favorite: true,
  //     description: "Ветчина, маринованные огурчики, томаты, красный лук, чеснок, соус бургер, моцарелла, фирменный томатный соус",
  //     stars: 3.3,
  //     imageUrl: "assets/pizza4.webp",
  //     tags: ["Мясная"]
  //   },
  //   {
  //     id: "5",
  //     name: "Пицца 4 сыра",
  //     price: 390,
  //     sizeWeight: "30 см, традиционное тесто, 500 г",
  //     favorite: false,
  //     description: "Сыр блю чиз, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо",
  //     stars: 3.0,
  //     imageUrl: "assets/pizza5.webp",
  //     tags: ["Вегетарианская"]
  //   },
  //   {
  //     id: "6",
  //     name: "Пицца Ветчина и грибы",
  //     price: 410,
  //     sizeWeight: "30 см, традиционное тесто, 490 г",
  //     favorite: false,
  //     description: "Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус",
  //     stars: 4.0,
  //     imageUrl: "assets/pizza6.webp",
  //     tags: ["Мясная"]
  //   },
  //   {
  //     id: "7",
  //     name: "Пицца Маргарита",
  //     price: 299,
  //     sizeWeight: "30 см, традиционное тесто, 540 г",
  //     favorite: false,
  //     description: "Увеличенная порция моцареллы, томаты, итальянские травы, фирменный томатный соус",
  //     stars: 4.0,
  //     imageUrl: "assets/pizza7.webp",
  //     tags: ["Вегетарианская"]
  //   },
  //   {
  //     id: "8",
  //     name: "Пицца Овощи и грибы",
  //     price: 299,
  //     sizeWeight: "30 см, традиционное тесто, 490 г",
  //     favorite: false,
  //     description: "Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, фирменный томатный соус, итальянские травы",
  //     stars: 4.0,
  //     imageUrl: "assets/pizza8.webp",
  //     tags: ["Вегетарианская", "С грибами"]
  //   },
  //   {
  //     id: "9",
  //     name: "Гавайская",
  //     price: 340,
  //     sizeWeight: "",
  //     favorite: false,
  //     description: "Фирменный соус альфредо, цыпленок, моцарелла, ананасы",
  //     stars: 4.0,
  //     imageUrl: "assets/pizza9.webp",
  //     tags: ["Вегетарианская"]
  //   },
  //   {
  //     id: "9",
  //     name: "Картофель фри",
  //     price: 150,
  //     sizeWeight: "",
  //     favorite: true,
  //     description: "Запеченная в печи картошечка. Привычный вкус и мало масла",
  //     stars: 4.0,
  //     imageUrl: "assets/fries.webp",
  //     tags: ["Закуски"]
  //   },
  //   {
  //     id: "10",
  //     name: "Куриные крылья",
  //     price: 310,
  //     sizeWeight: "",
  //     favorite: true,
  //     description: "Куриные крылышки со специями и ароматом копчения. В порции присутствуют локтевые и плечевые части крылышек",
  //     stars: 4.0,
  //     imageUrl: "assets/wings.webp",
  //     tags: ["Закуски"]
  //   },
  //   {
  //     id: "11",
  //     name: "Кофе Капучино",
  //     price: 120,
  //     sizeWeight: "",
  //     favorite: false,
  //     description: "Король среди кофейных напитков — классический капучино. Для любителей сбалансированного кофейно-молочного вкуса",
  //     stars: 4.0,
  //     imageUrl: "assets/cappuch.webp",
  //     tags: ["Напитки"]
  //   },
  //   {
  //     id: "12",
  //     name: "Кокосовый латте",
  //     price: 160,
  //     sizeWeight: "",
  //     favorite: true,
  //     description: "Горячий напиток на основе эспрессо с увеличенной порцией молока и кокосовым сиропом",
  //     stars: 4.0,
  //     imageUrl: "assets/coconutLatte.webp",
  //     tags: ["Напитки"]
  //   },
  //   {
  //     id: "13",
  //     name: "Американо",
  //     price: 120,
  //     sizeWeight: "",
  //     favorite: false,
  //     description: "Пара глотков горячего Американо, и вы будете готовы покорять этот день",
  //     stars: 4.0,
  //     imageUrl: "assets/americano.webp",
  //     tags: ["Напитки"]
  //   }
  // ];

  // getFoods(){
  //   return Promise.resolve(this.foods);
  // }

  async getAllFood(): Promise<IFood[]>{
    return this.foodModel.find()
  }

  // async getAllTours(): Promise<IFood[]> {
  //   return this.foodModel.find();
  // }

  // uploadFood(body: FoodDto): Promise<Food> {
  //   const foodData = new this.foodModel(body);
  //   return foodData.save();
  // }
}
