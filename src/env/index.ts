import { ImportMetaEnv } from '@/@types/env';

type EnvKeyType = keyof ImportMetaEnv;

export function env<ResponseType = string>(key: EnvKeyType): ResponseType {
  return import.meta.env[key] as ResponseType;
}
