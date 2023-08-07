import { ApiProperty } from '@nestjs/swagger';

export class Cliente {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  sexo: string;

  @ApiProperty()
  status: boolean;
}
