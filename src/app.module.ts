import { Global, Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';
@Global()
@Module({
  imports: [
    UserModule,
    PrismaModule
  ]
})
export class AppModule {}
