import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/entities/user";
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private readonly secret = 'Mr. English';
  constructor(private jwtService: JwtService) {}

  
  generateToken(user: User): string {
    return jwt.sign({ sub: user.Id, email: user.Email }, this.secret, { expiresIn: '1h' });
  }

  async verifyToken(authToken: string) : Promise<string> {
    try{
      const decoded = await this.jwtService.verifyAsync(authToken);
      return decoded;
    }catch{
      throw new UnauthorizedException('Invalid token');
    }

  }
}
