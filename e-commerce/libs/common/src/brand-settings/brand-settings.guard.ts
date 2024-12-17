import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { BrandSettingsRepository } from '@app/common/brand-settings/repositories/brand-settings.repository';

@Injectable()
export class BrandSettingsGuard implements CanActivate {
  private readonly logger = new Logger(BrandSettingsGuard.name);

  constructor(
    private readonly brandSettingsRepository: BrandSettingsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let ecommerceBrandId =
      request.length > 0
        ? request[0]['ecommerceBrandId']
        : request.params?.ecommerceBrandId;

    if (!ecommerceBrandId) {
      ecommerceBrandId = request.user?._id;
    }
    console.log(
      'BrandSettingsGuard -> canActivate -> ecommerceBrandId',
      ecommerceBrandId,
    );
    if (!ecommerceBrandId) {
      this.logger.error('ecommerceBrandId is missing in the request headers.');
      throw new UnauthorizedException('ecommerceBrandId is required.');
    }

    try {
      // Fetch the brand settings
      const brand = await this.brandSettingsRepository.findOne({
        ecommerceBrandId,
      });

      if (!brand) {
        this.logger.error(
          `No brand found for ecommerceBrandId: ${ecommerceBrandId}`,
        );
        throw new UnauthorizedException('Invalid ecommerceBrandId.');
      }

      // Attach brand settings to the request object
      request.ecommerceBrand = brand;

      return true; // Allow the request
    } catch (err: any) {
      this.logger.error(
        `Error validating ecommerceBrandId: ${ecommerceBrandId}`,
        err.stack,
      );
      throw new UnauthorizedException('Failed to validate ecommerceBrandId.');
    }
  }
}
