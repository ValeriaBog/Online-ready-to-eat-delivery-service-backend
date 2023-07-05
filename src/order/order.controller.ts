import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderDto } from "../dto/order-dto";

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @Post()
  initOrder(@Body() data: OrderDto): void {

    const orderData = new OrderDto(
      data.totalPrice,
      data.totalCounter,
      data.products,
      data.nameUser,
      data.lastNameUser,
      data.email)

    this.orderService.sendOrder(orderData)

  }
}
