import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    return 'This action returns all cats';
  }
  login() {
    return 'This action returns all cats';
  }
}
