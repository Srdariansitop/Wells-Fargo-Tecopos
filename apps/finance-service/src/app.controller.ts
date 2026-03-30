import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_accounts' })
  async handleGetAccounts(@Payload() data: any) {
    console.log('📥 Petición recibida en Finance-Service: obtener todas las cuentas');
    return this.appService.getAccounts();
  }

  @MessagePattern({ cmd: 'get_account_by_id' })
  async handleGetAccountById(@Payload() data: { id: string }) {
    console.log(`📥 Petición recibida en Finance-Service para ID: ${data.id}`);
    return this.appService.getAccountById(data.id);
  }
  @MessagePattern({ cmd: 'process_operation' })
async handleOperation(@Payload() data: CreateOperationDto) {
  return this.appService.processTransaction(data);
}
}