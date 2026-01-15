import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';

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
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    //NOTE: すでにプログラムですぐに使える状態（インスタンス）されている
    return await this.itemsService.create(createItemDto);
  }

  // @Put(':id')
  // updateStatus(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.itemsService.updateStatus(id);
  // }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.itemsService.delete(id);
  }
}
