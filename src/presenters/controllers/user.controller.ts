import { Body, Controller, Delete, Get, Post, Put, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/application/dtos/InBound/user.dto';
import { RespostaDto } from 'src/application/dtos/OutBound/resposta.dto';

import { Request } from 'express';
import { UserService } from 'src/application/services/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from 'src/application/dtos/InBound/login.dto';
import { UserUpdateDto } from 'src/application/dtos/InBound/userUpdate.dto';
import { UserDeleteDto } from 'src/application/dtos/InBound/delete.dto';
import { JwtAuthGuard } from 'src/infra/auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cadastrar')
  async CadastrarUser(@Body() userDto: UserDto): Promise<RespostaDto> {
    return this.userService.cadastrarUser(userDto);
  }

  @Put('atualizar')
  async AtualizarUser(@Body() userUpdateDto:UserUpdateDto) : Promise<RespostaDto> {
    return this.userService.atualizarUser(userUpdateDto.userId, userUpdateDto.userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async MeusDados(@Req() req: Request): Promise<RespostaDto> {
    const authToken = req.headers.authorization.split(' ')[1]; 
    return this.userService.meusDados(authToken);
  }

  @Get('todos')
  async TodosUsers(): Promise<RespostaDto> {
    return this.userService.todosUsers();
  }


  @Post('login')
  async FazerLogin(@Body() loginDto: LoginDto): Promise<RespostaDto> {
    return this.userService.fazerLogin(loginDto.userNameOrEmail, loginDto.password);
  }


  @Delete('eliminar')
  async EliminarUser(@Body() user: UserDeleteDto): Promise<RespostaDto> {
    return this.userService.eliminarUser(user.userId);
  }
}
