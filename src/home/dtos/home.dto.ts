/* eslint-disable prettier/prettier */

import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class HomeDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNumber()
  number_of_bedrooms: number;

  @IsNumber()
  number_of_bathrooms: number;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsNumber()
  square_footage: number;

  @IsString()
  image_url: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  realtor_id: number;

  @IsString()
  description: string;
}
