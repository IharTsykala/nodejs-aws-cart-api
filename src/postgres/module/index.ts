import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Orders } from '../../entities/orders';
import { Carts} from "../../entities/carts";
import { CartItems } from "../../entities/cartItems";

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "testinstance.cqipwbge8ydz.us-east-1.rds.amazonaws.com",
      port: 5432,
      username: "postgres",
      password: "QvWghSx9OLBW2vQ1KHzJ",
      database: "testNameDatabase",
      synchronize: true,
      logging: true,
      entities: [Carts,CartItems, Orders],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Carts, CartItems, Orders]),
  ],
  exports: [TypeOrmModule],
})

export class DBModule {}
