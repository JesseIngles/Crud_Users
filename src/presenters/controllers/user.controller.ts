import { Body, Controller, Delete, Get, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "src/application/dtos/InBound/user.dto";
import { RespostaDto } from "src/application/dtos/OutBound/resposta.dto";
import { IUserRepository } from "src/domain/IRepository/IUser.interface";

@Controller('UserController')
export class UserController {
  constructor(private readonly _user: IUserRepository) {}

  @Post('CadastrarUser')
  async CadastrarUser(@Body() userDto: UserDto) : Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.CadastrarUser(userDto);
    return resposta;
  }

  @Put('AtualizarUser')
  async AtualizarUser(@Body() userId: Number, userDto: UserDto) : Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.AtualizarUser(userId, userDto);
    return resposta;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async MeusDados(authToken: string) : Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.MeusDados(authToken);
    return resposta;
  }

  @Get('TodosUsers')
  async TodosUsers(): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.TodosUsers();
    return resposta;
  }
  
  @Post('FazerLogin')
  async FazerLogin(userNameOrEmail: string, password: string) : Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.FazerLogin(userNameOrEmail, password);
    return resposta;
  }

  @Delete('EliminarUser')
  async EliminarUser(userId: Number) : Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta = await this._user.EliminarUser(userId);
    return resposta;
  }

}