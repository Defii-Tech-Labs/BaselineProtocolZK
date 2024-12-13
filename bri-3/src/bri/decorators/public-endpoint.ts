import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ENDPOINT_METADATA_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_ENDPOINT_METADATA_KEY, true);
