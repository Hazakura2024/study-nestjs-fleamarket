import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/types/requestUser';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  //NOTE: リクエストボディからパラメータを取得するにはパラメータに@Bodyをつける
  //NOTE: ＠Body()がついた引数にDTOのインスタンスを注入してくれる
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Req() req: ExpressRequest & { user: RequestUser },
): Promise<Item> {
    //NOTE: すでにプログラムですぐに使える状態（インスタンス）されている
    return await this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.itemsService.delete(id);
  }
}
