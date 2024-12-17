import {  Controller } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
@Controller('/api/v1')
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
  ) {}

}
