import { Injectable, ConflictException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(private readonly prisamService: PrismaService) {}
  async signup({ email, password, name, phone }: SignupParams) {
    const userExists = await this.prisamService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException();
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
  login() {
    return 'This action returns all cats';
  }
}
