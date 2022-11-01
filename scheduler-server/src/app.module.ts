import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import { ShoppingListItemsModule } from './shopping-list-items/shopping-list-items.module';
import { ShoppingList } from './shopping-lists/entities/shopping-list.entity';
import { ShoppingListItem } from './shopping-list-items/entities/shopping-list-item.entity';
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
    ShoppingListItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
