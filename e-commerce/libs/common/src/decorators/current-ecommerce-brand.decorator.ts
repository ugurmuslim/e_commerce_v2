 import { createParamDecorator, ExecutionContext } from '@nestjs/common';
 import { BrandSettingsDocument } from '@app/common/brand-settings/models/brand-settings.schema';

const getCurrentEcommerceBrandByContext = (context: ExecutionContext): BrandSettingsDocument => {
  const request = context.switchToHttp().getRequest();
  return request.ecommerceBrand;
}


export const CurrentEcommerceBrand = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentEcommerceBrandByContext(context)
)