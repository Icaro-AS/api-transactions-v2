import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GetStatisticsUseCase } from './application/use-cases/get-statistics.use-case';
import { StatisticsDto } from './dtos/statistics.dto';

@WebSocketGateway({ cors: true })
export class StatisticsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('StatisticsGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
    this.updateStatistics(); // Iniciar a atualização das estatísticas
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async updateStatistics() {
    setInterval(async () => {
      const statistics: StatisticsDto =
        await this.getStatisticsUseCase.getStatistics();
      this.server.emit('statistics', statistics); // Enviar as estatísticas para todos os clientes conectados
    }, 5000); // Atualizar a cada 5 segundos
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
