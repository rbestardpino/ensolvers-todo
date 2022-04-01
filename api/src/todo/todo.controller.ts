import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo as TodoModel } from '@prisma/client';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string): Promise<TodoModel> {
    return this.todoService.todo({ id: Number(id) });
  }

  @Get('todos')
  async getTodos(): Promise<TodoModel[]> {
    return this.todoService.todos({});
  }

  @Post('todo')
  async createTodo(
    @Body() todoData: { name: string; folder?: string },
  ): Promise<TodoModel> {
    const { name, folder } = todoData;
    return this.todoService.createTodo({
      name,
      folder: folder
        ? {
            connect: {
              id: Number(folder),
            },
          }
        : undefined,
    });
  }

  @Put('todo/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todoData: { name: string; folder?: string },
  ): Promise<TodoModel> {
    const { name, folder } = todoData;
    return this.todoService.updateTodo({
      where: { id: Number(id) },
      data: {
        name,
        folder: {
          connect: {
            id: Number(folder),
          },
        },
      },
    });
  }

  @Delete('todo/:id')
  async deleteTodo(@Param('id') id: string): Promise<TodoModel> {
    return this.todoService.deleteTodo({ id: Number(id) });
  }
}
