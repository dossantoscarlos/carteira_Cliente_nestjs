import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma.service';
import { Cliente } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateClienteDto): Promise<Cliente> {
    const { nome, sexo } = data;
    return this.prisma.cliente.create({
      data: {
        nome,
        sexo,
        status: true,
      },
    });
  }

  findAll(): Promise<Cliente[] | []> {
    return this.prisma.cliente.findMany();
  }

  findStatus(status: boolean): Promise<Cliente[] | []> {
    return this.prisma.cliente.findMany({
      where: {
        status,
      },
    });
  }

  findOne(id: string): Promise<Cliente> {
    return this.prisma.cliente.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateClienteDto) {
    const { status } = data;
    return this.prisma.cliente.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }
}
