import { Global, Module } from "@nestjs/common";
import { UserController } from "../presenters/controllers/user.controller";
import { AuthService } from "../application/services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/infra/auth/jwt.strategy";

@Global()
@Module({
  imports: [
    JwtModule.register({
      
      secret: 'Mr. English', 
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService]
})
export class AuthModule {}  