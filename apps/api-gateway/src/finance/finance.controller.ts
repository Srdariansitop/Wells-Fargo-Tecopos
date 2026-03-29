import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Finance') 
@ApiBearerAuth()    
@Controller('accounts')
export class FinanceController {
  constructor(
    @Inject('FINANCE_CLIENT') private readonly client: ClientProxy,
  ) {}

  @Get()
  findAll() {
    return this.client.send({ cmd: 'get_accounts' }, {});
  }
}