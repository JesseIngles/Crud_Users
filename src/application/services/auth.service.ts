import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/entities/user";


export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(usuario: User) : Promise<string> {
    const payload = {username: usuario.Email, sub: usuario.Id}
    return await this.jwtService.signAsync(payload);
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