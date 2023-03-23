import { Module } from '@nestjs/common';
import { EventsGateway } from './message.gateway';


@Module({})
export class MessageModule {
  providers: [EventsGateway];
}
