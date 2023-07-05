import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IRegistration } from "../interfaces/registration";

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema()
export class Registration implements IRegistration{
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);