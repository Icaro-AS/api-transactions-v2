import{Controller, Post, Body, Inject, HttpCode, HttpStatus, BadRequestException} from '@nestjs/common';
import { CreateTransactionDto } from './../dtos/create-transaction.dto';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { Transaction } from '../entities/transaction.entity';
import{ plainToClass} from 'class-transformer';
import{ validate} from 'class-validator';

@Controller('transactions')
export class TransactionController {
        constructor(
            @Inject(CreateTransactionUseCase)
            private readonly createTransactionUseCase: CreateTransactionUseCase,
        ) {}
        @Post() 
        @HttpCode(HttpStatus.CREATED)
        async create(@Body() createTransactionDto: CreateTransactionDto): Promise<void> {    
            const transaction = plainToClass(Transaction, createTransactionDto);
            const errors = await validate(transaction);
            
            if(errors.length > 0) {
                throw new BadRequestException(errors);
            }

            await this.createTransactionUseCase.execute(transaction);
        }
    }