import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ShoppingListItemsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log({ client, payload });
    return 'Hello world!';
  }
}
