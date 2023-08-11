import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeDto } from './dtos/home.dto';

@Controller('/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  getAllHomes() {
    return this.homeService.getAllHomes();
  }

  @Get('/:id')
  getHomeById(@Param('id') id: number) {
    return this.homeService.getHomeById(id);
  }

  @Post()
  createHome(@Body() body: HomeDto) {
    return this.homeService.createHome(body);
  }

  @Put('/:id')
  updateHome(@Param('id') id: number, @Body() body: HomeDto) {
    return this.homeService.updateHome(id, body);
  }

  @Delete('/:id')
  deleteHome(@Param('id') id: number) {
    return this.homeService.deleteHome(id);
  }
}
