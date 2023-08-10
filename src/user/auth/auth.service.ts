import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisamService: PrismaService) {}
  async signup({ email, password, name, phone }: SignupParams) {
    const userExists = await this.prisamService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisamService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        type: UserType.BUYER,
        image_url: 'https://i.imgur.com/5FJXZ8u.png',
      },
    });

    const token = await jwt.sign(
      {
        name,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return { token };
  }
  async signin({ email, password }: SigninParams) {
    const user = await this.prisamService.user.findUnique({
      where: { email },
    });

    console.log(user, email, password, 'user');

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return { token };
  }
}
