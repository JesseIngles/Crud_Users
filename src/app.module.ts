import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';

@Module({
  imports: [
    UserModule,
    PrismaModule
  ]
})
export class AppModule {}
