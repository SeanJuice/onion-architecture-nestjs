import { Module } from '@nestjs/common';
import { TodoController } from '../../application/controllers/todo.controller';
import { TodoService } from '../../domain/services/todo.service';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
