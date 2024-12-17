import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class AcknowledgePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const context: RmqContext = metadata?.metatype === RmqContext ? value : null;

    if (context) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      channel.ack(originalMessage);
    }

    return value;
  }
}