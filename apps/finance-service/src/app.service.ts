import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOperationDto, OperationType } from './dto/create-operation.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka 
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
    console.log('✅ Productor Kafka conectado en AppService');
  }

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

  async getAccountById(id: string) {
    try {
      const baseUrl = this.configService.getOrThrow<string>('MOCK_API_URL');
      const url = `${baseUrl}/${id}`; 
      
      const { data } = await firstValueFrom(this.httpService.get(url));
    
      return {
        id: data.id,
        number: data.accountNumber,
        balance: data.balance,
        currency: data.currency || 'USD'
      };

    } catch (error) {
      console.error(`❌ Error llamando a MockAPI para el id ${id}:`, error.message);
      
      if (error.response?.status === 404) {
        return { error: `No se encontró ninguna cuenta con el ID ${id}` };
      }
      
      return { error: 'No se pudo recuperar la información de la cuenta' };
    }
  }

  async processTransaction(dto: CreateOperationDto) {
    try {
      const account = await this.getAccountById(dto.accountId);
      
      if (account.error) {
        return account; 
      }
      
      let newBalance = account.balance;

      if (dto.type === OperationType.DEPOSIT || dto.type === OperationType.TRANSFER_IN) {
        newBalance += dto.amount;
      } else {
        if (account.balance < dto.amount) {
          return { error: 'Saldo insuficiente para realizar esta operación' };
        }
        newBalance -= dto.amount;
      }

      const transactionData = {
        ...dto,
        date: new Date().toISOString(),
        previousBalance: account.balance,
        currentBalance: newBalance
      };

      this.kafkaClient.emit('transaction.processed', transactionData);

      return {
        message: 'Operación realizada con éxito',
        transaction: transactionData
      };

    } catch (error) {
      console.error('❌ Error procesando transacción:', error.message);
      return { error: 'Error al procesar la transacción bancaria' };
    }
  }
}