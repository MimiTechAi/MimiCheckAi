/**
 * Security Property Tests
 * **Feature: beta-launch-deployment, Property 1: Keine exponierten Secrets im Quellcode**
 * **Validates: Requirements 1.1**
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Secret-Patterns die nicht im Code sein sollten
const SECRET_PATTERNS = [
  /sk-proj-[a-zA-Z0-9_-]{20,}/g,           // OpenAI API Keys
  /sk_live_[a-zA-Z0-9]{20,}/g,              // Stripe Live Secret Keys
  /sk_test_[a-zA-Z0-9]{20,}/g,              // Stripe Test Secret Keys
  /sk-ant-api[a-zA-Z0-9_-]{20,}/g,          // Anthropic API Keys
  /whsec_[a-zA-Z0-9]{20,}/g,                // Stripe Webhook Secrets
  /service_role['":\s]+eyJ[a-zA-Z0-9_-]+/g, // Supabase Service Role Keys
];

// Erlaubte Dateien (z.B. .env.example mit Platzhaltern)
const ALLOWED_FILES = [
  '.env',
  '.env.local',
  '.env.example',
  '.env.local.example',
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  '.husky',
  '.github',
  'mimicheck-landing',
  'backend',
  'Webseite erstellen basierend auf PDCA-Prinzip',
];

// Verzeichnisse die gescannt werden sollen
const SCAN_DIRECTORIES = ['src'];

// Datei-Erweiterungen die gescannt werden sollen
const SCAN_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json'];

/**
 * Rekursiv alle Dateien in einem Verzeichnis finden
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  try {
    const files = readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = join(dirPath, file);
      
      // Überspringe erlaubte Verzeichnisse
      if (ALLOWED_FILES.some(allowed => fullPath.includes(allowed))) {
        return;
      }

      try {
        if (statSync(fullPath).isDirectory()) {
          getAllFiles(fullPath, arrayOfFiles);
        } else {
          // Nur relevante Datei-Erweiterungen
          if (SCAN_EXTENSIONS.some(ext => fullPath.endsWith(ext))) {
            arrayOfFiles.push(fullPath);
          }
        }
      } catch {
        // Datei nicht lesbar, überspringen
      }
    });
  } catch {
    // Verzeichnis nicht lesbar, überspringen
  }

  return arrayOfFiles;
}

describe('Security Properties', () => {
  it('**Feature: beta-launch-deployment, Property 1: Keine exponierten Secrets im Quellcode**', () => {
    const violations: { file: string; pattern: string; match: string }[] = [];

    for (const dir of SCAN_DIRECTORIES) {
      const files = getAllFiles(dir);

      for (const file of files) {
        try {
          const content = readFileSync(file, 'utf-8');

          for (const pattern of SECRET_PATTERNS) {
            const matches = content.match(pattern);
            if (matches) {
              for (const match of matches) {
                violations.push({
                  file,
                  pattern: pattern.toString(),
                  match: match.substring(0, 20) + '...' // Nur Anfang zeigen
                });
              }
            }
          }
        } catch {
          // Datei nicht lesbar, überspringen
        }
      }
    }

    // Ausgabe der Violations für Debugging
    if (violations.length > 0) {
      console.error('\n❌ SECURITY VIOLATIONS FOUND:');
      violations.forEach(v => {
        console.error(`  File: ${v.file}`);
        console.error(`  Pattern: ${v.pattern}`);
        console.error(`  Match: ${v.match}`);
        console.error('');
      });
    }

    expect(violations).toHaveLength(0);
  });

  it('should not have hardcoded Supabase URLs with inline keys', () => {
    const violations: string[] = [];
    
    // Pattern für hardcodierte Supabase-Konfiguration
    const HARDCODED_SUPABASE = /createClient\s*\(\s*['"][^'"]+supabase\.co['"]\s*,\s*['"]eyJ/g;

    for (const dir of SCAN_DIRECTORIES) {
      const files = getAllFiles(dir);

      for (const file of files) {
        try {
          const content = readFileSync(file, 'utf-8');
          
          if (HARDCODED_SUPABASE.test(content)) {
            violations.push(file);
          }
        } catch {
          // Datei nicht lesbar
        }
      }
    }

    if (violations.length > 0) {
      console.error('\n❌ HARDCODED SUPABASE CONFIG FOUND IN:');
      violations.forEach(f => console.error(`  - ${f}`));
    }

    expect(violations).toHaveLength(0);
  });
});
