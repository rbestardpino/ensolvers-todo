import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, FolderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
