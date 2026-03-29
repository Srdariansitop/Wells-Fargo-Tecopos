import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_accounts' })
  async handleGetAccounts(@Payload() data: any) {
    console.log('📥 Petición recibida en Finance-Service:', data);
    return this.appService.getAccounts();
  }
}