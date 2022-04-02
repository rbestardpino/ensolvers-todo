import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Folder as FolderModel } from '@prisma/client';
import { TodoService } from 'src/todo/todo.service';
import { FolderService } from './folder.service';

@Controller()
export class FolderController {
  constructor(
    private readonly folderService: FolderService,
    private readonly todoService: TodoService,
  ) {}

  @Get('folder/:id')
  async getFolderById(@Param('id') id: string): Promise<FolderModel> {
    return this.folderService.folder({ id: Number(id) });
  }

  @Get('folders')
  async getFolders(): Promise<FolderModel[]> {
    return this.folderService.folders({});
  }

  @Post('folder')
  async createFolder(
    @Body() folderData: { name: string },
  ): Promise<FolderModel> {
    const { name } = folderData;
    return this.folderService.createFolder({
      name,
    });
  }

  @Put('folder/:id')
  async updateFolder(
    @Param('id') id: string,
    @Body() folderData: { name: string },
  ): Promise<FolderModel> {
    const { name } = folderData;
    return this.folderService.updateFolder({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
  }

  @Delete('folder/:id')
  async deleteFolder(@Param('id') id: string): Promise<FolderModel> {
    const todos = await this.todoService.todos({
      where: {
        folderId: {
          equals: Number(id),
        },
      },
    });
    todos.forEach((todo) => {
      this.todoService.deleteTodo({
        id: todo.id,
      });
    });
    return this.folderService.deleteFolder({ id: Number(id) });
  }
}
