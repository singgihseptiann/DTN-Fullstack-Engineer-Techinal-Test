import { SetMetadata } from '@nestjs/common';

export const SKIP_RESPONSE = 'skipResponse';
export const SkipResponse = () => SetMetadata(SKIP_RESPONSE, true);
