/**
 * Secrets manager - handles encryption, decryption, and validation of secrets
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { 
  validateSecrets, 
  getEncryptionKey, 
  SECRET_TARGETS, 
  SecretTarget 
} from './secrets-config';

export class SecretsManager {
  private projectRoot: string;
  private encryptionKey: string;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.encryptionKey = getEncryptionKey();
  }

  /**
   * Encrypt secrets file using age
   */
  async encryptSecrets(target: SecretTarget, secretsPath: string): Promise<void> {
    const targetConfig = SECRET_TARGETS[target];
    const encryptedPath = path.join(this.projectRoot, targetConfig.path);
    
    console.log(`Encrypting secrets for ${targetConfig.name}...`);
    
    if (!fs.existsSync(secretsPath)) {
      throw new Error(`Secrets file not found: ${secretsPath}`);
    }

    const secretsContent = fs.readFileSync(secretsPath, 'utf-8');
    
    try {
      // Use age to encrypt
      const encrypted = execSync(`age -e`, {
        input: secretsContent,
        encoding: 'utf-8',
        env: { ...process.env, AGE_KEY: this.encryptionKey }
      });

      // Ensure directory exists
      fs.mkdirSync(path.dirname(encryptedPath), { recursive: true });
      
      fs.writeFileSync(encryptedPath, encrypted, 'utf-8');
      console.log(`✓ Secrets encrypted: ${encryptedPath}`);
    } catch (error) {
      throw new Error(`Failed to encrypt secrets: ${error.message}`);
    }
  }

  /**
   * Decrypt secrets file using age
   */
  async decryptSecrets(target: SecretTarget): Promise<Record<string, string>> {
    const targetConfig = SECRET_TARGETS[target];
    const encryptedPath = path.join(this.projectRoot, targetConfig.path);

    console.log(`Decrypting secrets for ${targetConfig.name}...`);

    if (!fs.existsSync(encryptedPath)) {
      throw new Error(`Encrypted secrets file not found: ${encryptedPath}`);
    }

    const encryptedContent = fs.readFileSync(encryptedPath, 'utf-8');

    try {
      // Use age to decrypt
      const decrypted = execSync(`age -d`, {
        input: encryptedContent,
        encoding: 'utf-8',
        env: { ...process.env, AGE_KEY: this.encryptionKey }
      });

      const secrets = JSON.parse(decrypted);
      
      // Validate against schema
      const validation = validateSecrets(secrets, targetConfig.schema);
      if (!validation.valid) {
        console.error('Validation errors:', validation.errors);
        throw new Error('Decrypted secrets failed validation');
      }

      console.log(`✓ Secrets decrypted and validated`);
      return secrets;
    } catch (error) {
      throw new Error(`Failed to decrypt secrets: ${error.message}`);
    }
  }

  /**
   * Sync secrets to Supabase using supabase CLI
   */
  async syncSecretsToSupabase(secrets: Record<string, string>): Promise<void> {
    console.log('Syncing secrets to Supabase...');

    try {
      const supabaseDir = path.join(this.projectRoot, 'supabase');
      
      // Create .env file with secrets for supabase CLI
      const envPath = path.join(supabaseDir, '.env.secrets');
      const envContent = Object.entries(secrets)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
      
      fs.writeFileSync(envPath, envContent, 'utf-8');

      // Push secrets using supabase CLI
      execSync('supabase secrets set --env-file .env.secrets', {
        cwd: supabaseDir,
        stdio: 'inherit'
      });

      // Clean up
      fs.unlinkSync(envPath);
      console.log('✓ Secrets synced to Supabase');
    } catch (error) {
      throw new Error(`Failed to sync secrets to Supabase: ${error.message}`);
    }
  }

  /**
   * Sync secrets to Vercel using Vercel CLI
   */
  async syncSecretsToVercel(secrets: Record<string, string>): Promise<void> {
    console.log('Syncing secrets to Vercel...');

    try {
      // Use vercel CLI to set secrets
      for (const [key, value] of Object.entries(secrets)) {
        execSync(`vercel env add ${key}`, {
          input: `${value}\n`,
          stdio: 'inherit'
        });
      }
      
      console.log('✓ Secrets synced to Vercel');
    } catch (error) {
      throw new Error(`Failed to sync secrets to Vercel: ${error.message}`);
    }
  }

  /**
   * Rotate all secrets
   */
  async rotateAllSecrets(): Promise<void> {
    console.log('Starting secret rotation...');

    try {
      // Decrypt all targets
      const supabaseSecrets = await this.decryptSecrets('SUPABASE');
      const vercelSecrets = await this.decryptSecrets('VERCEL');
      const edgeFunctionSecrets = await this.decryptSecrets('EDGE_FUNCTIONS');

      // Sync to respective platforms
      await this.syncSecretsToSupabase(supabaseSecrets);
      await this.syncSecretsToVercel(vercelSecrets);

      console.log('✓ Secret rotation completed successfully');
    } catch (error) {
      console.error('✗ Secret rotation failed:', error.message);
      throw error;
    }
  }
}

export default SecretsManager;
