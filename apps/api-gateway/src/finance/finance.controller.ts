import { Controller, Get, Param, Inject, UseGuards, Post, Body ,Req} from '@nestjs/common'; 
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Finance') 
@ApiBearerAuth()    
@Controller('accounts')
export class FinanceController {
  constructor(
    @Inject('FINANCE_CLIENT') private readonly client: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'get_accounts' }, {});
  }


@UseGuards(AuthGuard)
@Post('operation')
createOperation(@Body() data: any, @Req() req: any) {
  const userIdFromToken = req.user.sub || req.user.id; 
  const secureData = {
    ...data,
    accountId: userIdFromToken.toString() 
  };

  return this.client.send({ cmd: 'process_operation' }, secureData);
}
  @UseGuards(AuthGuard)
  @Get('my-account') 
  findMyAccount(@Req() req: any) {
    const userId = req.user.sub || req.user.id;
    return this.client.send({ cmd: 'get_account_by_id' }, { id: userId.toString() });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_account_by_id' }, { id });
  }


}