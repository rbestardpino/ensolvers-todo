import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Folder,
  Prisma,
} from '@prisma/client';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

  async folder(folderWhereUniqueInput: Prisma.FolderWhereUniqueInput): Promise<Folder | null> {
    return this.prisma.folder.findUnique({
      where: folderWhereUniqueInput,
    });
  }

  async folders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FolderWhereUniqueInput;
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput;
  }): Promise<Folder[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.folder.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createFolder(data: Prisma.FolderCreateInput): Promise<Folder> {
    return this.prisma.folder.create({
      data,
    });
  }

  async updateFolder(params: {
    where: Prisma.FolderWhereUniqueInput;
    data: Prisma.FolderUpdateInput;
  }): Promise<Folder> {
    const { data, where } = params;
    return this.prisma.folder.update({
      data,
      where,
    });
  }

  async deleteFolder(where: Prisma.FolderWhereUniqueInput): Promise<Folder> {
    return this.prisma.folder.delete({
      where,
    });
  }
}