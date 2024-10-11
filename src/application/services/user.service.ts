import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/application/dtos/InBound/user.dto';
import { RespostaDto } from 'src/application/dtos/OutBound/resposta.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/application/services/auth.service';
import { user } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async cadastrarUser(userDto: UserDto): Promise<RespostaDto> {
    const resposta = new RespostaDto();
    try {
      const userExistente = await this.prismaService.user.findFirst({
        where: { Email: userDto.Email },
      });

      if (userExistente) {
        resposta.mensagem = 'Falha: Usuário já cadastrado';
        resposta.sucess = false;
        return resposta;
      }

      userDto.Password = await bcrypt.hash(userDto.Password, 10);
      await this.prismaService.user.create({ data: userDto });
      resposta.mensagem = 'Sucesso: Usuário cadastrado';
      resposta.sucess = true;
    } catch (error) {
      resposta.mensagem = `Falha na operação: ${error.message}`;
      resposta.sucess = false;
    }

    return resposta;
  }

  async atualizarUser(userId: number, userDto: UserDto): Promise<RespostaDto> {
    const resposta = new RespostaDto();
    try {
      await this.prismaService.user.update({
        where: { Id: userId },
        data: userDto,
      });
      resposta.mensagem = 'Sucesso: Usuário atualizado';
      resposta.sucess = true;
    } catch (error) {
      resposta.mensagem = `Falha ao atualizar usuário: ${error.message}`;
      resposta.sucess = false;
    }

    return resposta;
  }

  async meusDados(authToken: string): Promise<RespostaDto> {
    const resposta = new RespostaDto();
    try {
      const decodedToken = this.authService.verifyToken(authToken);
      resposta.resposta = await this.prismaService.user.findFirstOrThrow({
        where: { Id: decodedToken['sub'] },
      });
      resposta.mensagem = 'Sucesso';
      resposta.sucess = true;
    } catch (error) {
      resposta.mensagem = 'Falha: Token inválido ou expirado';
      resposta.sucess = false;
    }

    return resposta;
  }

  async todosUsers(): Promise<RespostaDto> {
    const resposta = new RespostaDto();
    resposta.resposta = await this.prismaService.user.findMany({
      select: {
        Id: true,
        UserName: true,
        Email: true,
        Ocupacao: true,
        Ativo: true
      }
    });
    resposta.mensagem = 'Sucesso: Todos os usuários';
    resposta.sucess = true;
    return resposta;
  }

  async fazerLogin(userNameOrEmail: string, password: string): Promise<RespostaDto> {
    const resposta = new RespostaDto();

    try {
      const userExistente: user = await this.prismaService.user.findFirstOrThrow({
        where: {
          OR: [{ UserName: userNameOrEmail }, { Email: userNameOrEmail }],
        },
      });

      const isPasswordValid = await bcrypt.compare(password, userExistente.Password);
      if (isPasswordValid) {
        resposta.mensagem = 'Sucesso: Usuário logado';
        resposta.sucess = true; 
        resposta.resposta = await this.authService.generateToken(userExistente);
      } else {
        resposta.mensagem = 'Falha: Credenciais incorretas';
        resposta.sucess = false;
      }
    } catch (error) {
      resposta.mensagem = `Falha: ${error.message}`;
      resposta.sucess = false;
    }

    return resposta;
  }

  async eliminarUser(userId: number): Promise<RespostaDto> {
    const resposta = new RespostaDto();
    try {
      await this.prismaService.user.delete({
        where: { Id: userId },
      });
      resposta.mensagem = 'Sucesso: Usuário eliminado';
      resposta.sucess = true;
    } catch (error) {
      resposta.mensagem = 'Falha: Usuário não encontrado' + error;
      resposta.sucess = false;
    }

    return resposta;
  }
}
