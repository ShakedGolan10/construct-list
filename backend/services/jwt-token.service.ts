import * as jose from 'jose';
const secret = jose.base64url.decode(process.env.JWT_TOKEN as string);

export async function generateJwtToken(item: string | object): Promise<string> {
  const jwtEncrypted = await new jose.EncryptJWT({ item })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string)
    .setAudience('audience')
    .setExpirationTime('30m')
    .encrypt(secret);

  return jwtEncrypted;
}

export async function validateJwtToken<T>(token: any): Promise<T> {
  const { payload } = await jose.jwtDecrypt(token, secret, {
    issuer: process.env.JWT_ISSUER,
    audience: 'audience',
  });
  return payload.item as T;
}
