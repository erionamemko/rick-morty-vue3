import { EncryptStorage } from 'encrypt-storage';

import { env } from '@/env';

export const encryptStorage = new EncryptStorage(
  env('VITE_APP_ENCRYPT_STORAGE_SECRET_KEY'),
  {
    prefix: env('VITE_APP_ENCRYPT_STORAGE_PREFIX'),
  },
);

window.encryptStorage = encryptStorage;
