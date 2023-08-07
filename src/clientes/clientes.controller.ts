import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('api/v1/clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cliente criado com sucesso' })
  async create(@Body() createClienteDto: CreateClienteDto, @Res() res) {
    return res
      .status(201)
      .json(await this.clientesService.create(createClienteDto));
  }

  @Get()
  async findAll() {
    return await this.clientesService.findAll();
  }

  @Get('/status/:status')
  async findStatus(
    @Param('status')
    status: string,
    @Res() res,
  ) {
    let visibility = false;
    if (status.trim().toLowerCase() === 'ativo') {
      visibility = true;
    } else if (status.trim().toLowerCase() === 'desativado') {
      visibility = false;
    } else {
      return res.status(400).json('Status Invalido.');
    }

    return res
      .status(200)
      .json(await this.clientesService.findStatus(visibility));
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Cliente inexistente.' })
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      return res.status(200).json(await this.clientesService.findOne(id));
    } catch (error) {
      return res.status(404).json({
        message: 'Cliente Inexistente',
        status: 404,
      });
    }
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Error atualizar cliente.' })
  @ApiOkResponse({ description: 'Atualizado com sucesso' })
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
    @Res() res,
  ) {
    try {
      return res
        .status(200)
        .json(await this.clientesService.update(id, updateClienteDto));
    } catch (error) {
      return res.status(404).json({
        message: 'Cliente Invalido',
        status: 404,
      });
    }
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Error ao deletar cliente' })
  @ApiAcceptedResponse({ description: 'Deletado com sucesso' })
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.clientesService.findOne(id);
      return await this.clientesService.remove(id);
    } catch (error: any) {
      console.log(error);
      return res.status(404).json({
        message: 'Not found client',
        status: 404,
      });
    }
  }
}
