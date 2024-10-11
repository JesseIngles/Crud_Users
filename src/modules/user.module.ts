import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserController } from 'src/presenters/controllers/user.controller';
import { UserService } from 'src/application/services/user.service';
import { AuthService } from 'src/application/services/auth.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    PrismaService, 
    AuthService
  ],
})
export class UserModule {}
