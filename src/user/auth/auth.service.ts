import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisamService: PrismaService) {}
  signup() {
    return 'This action returns all cats';
  }
  login() {
    return 'This action returns all cats';
  }
}
