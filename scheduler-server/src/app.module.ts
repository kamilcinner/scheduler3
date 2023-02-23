import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import { ShoppingList, ShoppingListItem } from './shopping-lists/entities';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Task, ShoppingList, ShoppingListItem],
    }),
    ShoppingListsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
