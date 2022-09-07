import { Module } from '@nestjs/common';
import { UserService } from 'src/domain/services';
import { TodoController } from '../../application/controllers/todo.controller';
import { TodoService } from '../../domain/services/todo.service';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService,UserService, UserRepository],
})
export class AppModule {}
