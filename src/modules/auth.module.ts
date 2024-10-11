import { Module } from "@nestjs/common";
import { UserController } from "../presenters/controllers/user.controller";
import { AuthService } from "../application/services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Mr. English',  // Você deve usar uma variável de ambiente em produção
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}