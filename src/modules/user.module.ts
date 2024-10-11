import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { UserController } from "src/presenters/controllers/user.controller";
import { AuthModule } from "./auth.module";


@Module({
  imports: [PrismaModule, AuthModule],
  providers: [],
  controllers: [UserController]
})
export class UserModule {}