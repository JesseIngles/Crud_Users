import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/entities/user";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(usuario: User) : Promise<string> {
    const payload = {'username': usuario.Email.toString(), 'sub': usuario.Id}
    console.log(usuario.Email)
    console.log(usuario.Id)
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
