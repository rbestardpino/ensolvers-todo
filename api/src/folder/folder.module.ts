import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TodoService } from 'src/todo/todo.service';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
  imports: [],
  controllers: [FolderController],
  providers: [FolderService, PrismaService, TodoService],
})
export class FolderModule {}
