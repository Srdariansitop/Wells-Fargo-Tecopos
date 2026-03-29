import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getAccounts() {
    try {
      const url = this.configService.getOrThrow<string>('MOCK_API_URL');
      const { data } = await firstValueFrom(this.httpService.get(url));
    
      return data.map(account => ({
        id: account.id,
        number: account.accountNumber,
        balance: account.balance,
        currency: account.currency || 'USD'
      }));

    } catch (error) {
      console.error('❌ Error llamando a MockAPI:', error.message);
      return { error: 'No se pudieron recuperar las cuentas bancarias' };
    }
  }
}