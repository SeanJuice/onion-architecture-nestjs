import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from '../../application/dtos/toto.dto';

// Creates a Todo interface to show exactly the attribute of our Todo
interface Todo {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}

@Injectable()
export class TodoService {

// Creates a Todo array with one Todo
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Tod',
      isDone: true,
    },
  ];

// Creates a new todo (Add todo to array)
  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    this.todos.push(createTodoDTO);

// return last added item
    return this.todos.at(-1);
  }

// Returns a single todo with ID
  async getTodo(todoID: number): Promise<Todo> {
    const post = this.todos.find((todo) => todo.id === todoID);
    return post;
  }

// Returns all todos available
  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }

// Deletes a todo by ID and add a new one (Update process)
  async editTodo(postID: number, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    await this.deleteTodo(postID);
    this.todos.push(createTodoDTO);

// return last added item
    return this.todos.at(-1);
  }

// Deletes a todo from the array
  async deleteTodo(todoID: number): Promise<any> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoID);
    return this.todos.splice(todoIndex, 1);
  }
}