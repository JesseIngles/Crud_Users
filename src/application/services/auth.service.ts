import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/entities/user";
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  
  generateToken(user: User): string {
    return this.jwtService.sign({ id: user.Id, email: user.Email }, {secret: 'Mr. English'});

  }

  verifyToken(authToken: string) : any {
    try{
      const decoded = this.jwtService.verify(authToken);
      return decoded;

    }catch(erro){
      throw new UnauthorizedException(erro);
    }

  }
}
