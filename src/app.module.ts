import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ProductsModule,
    UserModule,
    CartModule,
    MongooseModule.forRoot(
      `mongodb+srv://Brontoz554:Brontoz554@cluster0.hkall.mongodb.net/Products?retryWrites=true&w=majority`,
    ),
    GraphQLModule.forRoot({
      include: [ProductsModule, CartModule, UserModule],
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
