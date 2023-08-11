import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeDto } from './dtos/home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllHomes() {
    const homes = await this.prismaService.home.findMany();

    return homes;
  }

  async getHomeById(id: number) {
    const home = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!home) {
      return new HttpException('Home not found', 404);
    }

    return home;
  }

  createHome(body: HomeDto) {
    const {
      address,
      number_of_bedrooms,
      number_of_bathrooms,
      price,
      city,
      square_footage,
      image_url,
      type,
      latitude,
      longitude,
      realtor_id,
      description,
    } = body;

    const home = this.prismaService.home.create({
      data: {
        address,
        price,
        description,
        number_of_bedrooms,
        number_of_bathrooms,
        city,
        square_footage,
        image_url,
        type,
        latitude,
        longitude,
        realtor_id,
      },
    });

    return home;
  }

  updateHome(id: number, body: HomeDto) {
    const {
      address,
      number_of_bedrooms,
      number_of_bathrooms,
      price,
      city,
      square_footage,
      image_url,
      type,
      latitude,
      longitude,
      realtor_id,
      description,
    } = body;

    const homeToUpdate = this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!homeToUpdate) {
      return new HttpException('Home not found', 404);
    }

    const home = this.prismaService.home.update({
      where: {
        id,
      },
      data: {
        address,
        price,
        description,
        number_of_bedrooms,
        number_of_bathrooms,
        city,
        square_footage,
        image_url,
        type,
        latitude,
        longitude,
        realtor_id,
      },
    });

    return home;
  }

  async deleteHome(id: number) {
    const homeToDelete = await this.prismaService.home.findUnique({
      where: {
        id,
      },
    });

    if (!homeToDelete) {
      return new HttpException('Home not found', 404);
    }

    const home = await this.prismaService.home.delete({
      where: {
        id,
      },
    });

    return home;
  }
}
