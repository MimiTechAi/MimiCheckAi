#!/usr/bin/env node

/**
 * CLI for managing encrypted secrets
 * Usage:
 *   npm run secrets:encrypt -- --target supabase --file /path/to/secrets.json
 *   npm run secrets:decrypt -- --target supabase
 *   npm run secrets:sync -- --target supabase
 *   npm run secrets:rotate
 */

import * as fs from 'fs';
import * as path from 'path';
import SecretsManager from './secrets-manager';
import { SECRET_TARGETS, SecretTarget } from './secrets-config';

const args = process.argv.slice(2);
const command = args[0];

function printUsage() {
  console.log(`
Secrets Management CLI

Usage:
  secrets:encrypt --target <target> --file <path>    Encrypt secrets file
  secrets:decrypt --target <target>                   Decrypt secrets
  secrets:sync --target <target>                      Sync to platform
  secrets:rotate                                       Rotate all secrets

Options:
  --target <target>    Secret target: ${Object.keys(SECRET_TARGETS).join(', ')}
  --file <path>        Path to unencrypted secrets file

Examples:
  npm run secrets:encrypt -- --target supabase --file .env.supabase
  npm run secrets:decrypt -- --target supabase
  npm run secrets:sync -- --target vercel
  npm run secrets:rotate
  `);
}

function parseArgs(): { command: string; target?: SecretTarget; file?: string } {
  const parsed: any = {
    command
  };

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--target' && i + 1 < args.length) {
      parsed.target = args[i + 1];
      i++;
    } else if (args[i] === '--file' && i + 1 < args.length) {
      parsed.file = args[i + 1];
      i++;
    }
  }

  return parsed;
}

async function main() {
  try {
    const parsed = parseArgs();
    const manager = new SecretsManager();

    if (!command || command === '--help' || command === '-h') {
      printUsage();
      process.exit(0);
    }

    switch (command) {
      case 'encrypt': {
        if (!parsed.target || !parsed.file) {
          console.error('Error: --target and --file are required');
          printUsage();
          process.exit(1);
        }

        if (!Object.keys(SECRET_TARGETS).includes(parsed.target)) {
          console.error(`Error: Invalid target. Must be one of: ${Object.keys(SECRET_TARGETS).join(', ')}`);
          process.exit(1);
        }

        if (!fs.existsSync(parsed.file)) {
          console.error(`Error: File not found: ${parsed.file}`);
          process.exit(1);
        }

        await manager.encryptSecrets(parsed.target as SecretTarget, parsed.file);
        break;
      }

      case 'decrypt': {
        if (!parsed.target) {
          console.error('Error: --target is required');
          printUsage();
          process.exit(1);
        }

        if (!Object.keys(SECRET_TARGETS).includes(parsed.target)) {
          console.error(`Error: Invalid target. Must be one of: ${Object.keys(SECRET_TARGETS).join(', ')}`);
          process.exit(1);
        }

        const secrets = await manager.decryptSecrets(parsed.target as SecretTarget);
        console.log(JSON.stringify(secrets, null, 2));
        break;
      }

      case 'sync': {
        if (!parsed.target) {
          console.error('Error: --target is required');
          printUsage();
          process.exit(1);
        }

        if (!Object.keys(SECRET_TARGETS).includes(parsed.target)) {
          console.error(`Error: Invalid target. Must be one of: ${Object.keys(SECRET_TARGETS).join(', ')}`);
          process.exit(1);
        }

        const secrets = await manager.decryptSecrets(parsed.target as SecretTarget);
        
        if (parsed.target === 'SUPABASE') {
          await manager.syncSecretsToSupabase(secrets);
        } else if (parsed.target === 'VERCEL') {
          await manager.syncSecretsToVercel(secrets);
        } else {
          console.log('Secrets ready for sync (manual step may be required)');
        }
        break;
      }

      case 'rotate': {
        await manager.rotateAllSecrets();
        break;
      }

      default:
        console.error(`Error: Unknown command: ${command}`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
