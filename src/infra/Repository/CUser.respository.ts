import { RespostaDto } from "src/application/dtos/OutBound/resposta.dto";
import { IUserRepository } from "src/domain/IRepository/IUser.interface";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "src/application/dtos/InBound/user.dto";
import * as bcrypt from 'bcrypt';
import { user } from "@prisma/client";
import { AuthService } from "src/application/services/auth.service";
import { Injectable } from "@nestjs/common";


export class CUserRespository implements IUserRepository{
  constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {

  }
  async EliminarUser(userId: number): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    
    var userExistente = this.prismaService.user.findFirstOrThrow({where : {
      Id: userId
    }});

    if(userExistente != null)
    {
      this.prismaService.user.delete({where: {
        Id: userId
      }});
      resposta.mensagem = "Sucesso: User eliminado";
      resposta.sucess = true;
      return resposta;
    }

    resposta.mensagem = "Falha: Não existe um usuário cadastrado com esses dados";
    resposta.sucess = false;

    return resposta;
  }

  async FazerLogin(userNameOrEmail: string, password: string): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    if(userNameOrEmail == '' || password == ''){
      resposta.mensagem = "Falha: Dados de autenticação inválidos";
      resposta.sucess = false;
    }

    try {
      const userExistente: user = await this.prismaService.user.findFirstOrThrow({
        where: {
          OR: [
            { UserName: userNameOrEmail },
            { Email: userNameOrEmail }
          ]
        }
      });
      if(userExistente!=null && await bcrypt.compareSync(userExistente.Password, password)) {
        resposta.mensagem = "Sucesso: User logado";
        resposta.sucess = true;
        resposta.resposta = this.authService.generateToken(userExistente);
        return resposta;
      }
      
    }catch(error){
      resposta.mensagem = "Houve uma falha na operação. Detalhes:" + error;
      resposta.sucess = false;
    }
    return resposta;
  }
  async TodosUsers(): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    
    resposta.mensagem = "Sucesso: Todos users";
    resposta.sucess = true;
    resposta.resposta = this.prismaService.user.findMany();

    return resposta;
  }
  async MeusDados(authToken: string): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    resposta.mensagem = "Sucesso"
    resposta.resposta = this.prismaService.user.findFirstOrThrow({
      where: {
        Id: this.authService.verifyToken(authToken)['sub']
      }
    })
    resposta.sucess = true;

    return resposta;
  }
  async AtualizarUser(userId: Number, userDto: UserDto): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    
    return resposta;
  }
  async CadastrarUser(userDto: UserDto): Promise<RespostaDto> {
    var resposta = new RespostaDto();
    if(userDto == null)
    {
      resposta.mensagem = "Falha: Objecto nulo";
      resposta.sucess = false;
    }
    
    try {
      var userExistente = this.prismaService.user.findFirstOrThrow({where: {
        Email: userDto.Email
      }});
      if(userExistente!=null){
        resposta.mensagem = "Falha: Já existe um usuário cadastrado com esses dados";
        resposta.sucess = false;
        return resposta;
      }

      userDto.Password = await bcrypt.hashSync(userDto.Password, 10);
      this.prismaService.user.create({data: userDto});
      resposta.mensagem = "Sucesso: User cadastrado";
      resposta.sucess = true;
    }catch(e) {
      resposta.mensagem = "Houve uma falha na operação. Detalhes:" + e;
      resposta.sucess = false;
    }
    return resposta;
  }
   
}