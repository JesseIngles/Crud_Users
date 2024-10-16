import { Global, Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { PrismaModule } from './modules/prisma.module';
import { AuthModule } from './modules/auth.module';
@Global()
@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule
  ]
})
export class AppModule {}
