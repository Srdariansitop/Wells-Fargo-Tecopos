import { IsEnum, IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';

export enum OperationType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  PAYMENT = 'PAYMENT',
}

export class CreateOperationDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsEnum(OperationType, { message: 'Tipo de operación no válido' })
  type: OperationType;

  @IsNumber()
  @Min(0.01, { message: 'El monto debe ser mayor a 0' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}