import crypto from 'crypto';

const secretKey = process.env.CRYPTO_KEY || '';
const algorithm = 'aes-256-ctr';

export function encrypt(text: string) {
  if (!secretKey) {
    return text;
  }
  const iv = crypto.randomBytes(16);
  const ivString = iv.toString('hex');
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return ivString + ':' + encrypted;
}

export function decrypt(text: string) {
  if (!secretKey) {
    return text;
  }
  const [ivString, encrypted] = text.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  const decrypted = decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"); 
  return decrypted;
}
