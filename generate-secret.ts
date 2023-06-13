import * as fs from 'fs-extra';
import * as crypto from 'crypto';

/*
  The `generate-secrets.ts` file is used to generate and store a secret token that will be used by dbAuth.
  It is important to keep this file secure and prevent.
*/

const secret = crypto.randomBytes(32).toString('hex');
fs.writeFileSync('.env', `SESSION_SECRET=${secret}`);