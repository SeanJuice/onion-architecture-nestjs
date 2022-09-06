import { Controller,
Get,
Res,
HttpStatus,
Param,
NotFoundException,
Body,
Put,
Query,
Delete,
Post } from '@nestjs/common';
import { CreateTodoDTO } from '../dtos/toto.dto';
import { TodoService } from '../../domain/services/todo.service';
@Controller('todos')

export class TodoController {
    constructor(private todoService: TodoService) {}
  
    // Create a todo
    @Post('/')
    async create(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
      const newTodo = await this.todoService.addTodo(createTodoDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Todo has been submitted successfully!',
        todo: newTodo,
      });
    }
  
    // Fetch a particular todo using ID
    @Get('/:todoID')
    async getTodo(@Res() res, @Param('todoID') todoID) {
      const todo = await this.todoService.getTodo(todoID);
      if (!todo) {
        throw new NotFoundException('Todo does not exist!');
      }
      return res.status(HttpStatus.OK).json(todo);
    }
  
    // Fetch all todos
    @Get('/')
    async getTodos(@Res() res) {
      const todos = await this.todoService.getTodos();
      return res.status(HttpStatus.OK).json(todos);
    }
  
    // Edit a particular todo using ID
    @Put('/')
    async editTodo(
      @Res() res,
      @Query('todoID') todoID,
      @Body() createTodoDTO: CreateTodoDTO,
    ) {
      const editedTodo = await this.todoService.editTodo(todoID, createTodoDTO);
      if (!editedTodo) {
        throw new NotFoundException('Todo does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Todo has been successfully updated',
        todo: editedTodo,
      });
    }
  
    // Delete a todo using ID
    @Delete('/delete')
    async deleteTodo(@Res() res, @Query('todoID') todoID) {
      const deletedTodo = await this.todoService.deleteTodo(todoID);
      if (!deletedTodo) {
        throw new NotFoundException('Todo does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Todo has been deleted!',
        todo: deletedTodo,
      });
    }
  }
