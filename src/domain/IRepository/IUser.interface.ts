import { Injectable } from "@nestjs/common";
import { UserDto } from "src/application/dtos/InBound/user.dto";
import { RespostaDto } from "src/application/dtos/OutBound/resposta.dto";

export interface IUserRepository {
  EliminarUser(userId: Number): Promise<RespostaDto>;
  FazerLogin(userNameOrEmail: string, password: string): Promise<RespostaDto>;
  TodosUsers(): Promise<RespostaDto>;
  MeusDados(authToken: string): Promise<RespostaDto>;
  AtualizarUser(userId: Number, userDto: UserDto): Promise<RespostaDto>;
  CadastrarUser(userDto: UserDto): Promise<RespostaDto>;
}