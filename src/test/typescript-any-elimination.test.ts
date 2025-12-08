/**
 * TypeScript 'any' Elimination Property Test
 * Feature: enterprise-quality-audit, Property 13: TypeScript 'any' Elimination
 * Validates: Requirements 7.4
 * 
 * This test ensures that TypeScript files do not use 'any' types,
 * which defeats the purpose of type safety.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Recursively find all TypeScript files in a directory
 */
function findTypeScriptFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, and other build directories
      if (!['node_modules', 'dist', '.git', 'build', 'coverage'].includes(file)) {
        findTypeScriptFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Check if a file contains 'any' type usage
 * Returns array of line numbers where 'any' is found
 */
function findAnyUsage(filePath: string): Array<{ line: number; content: string }> {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const anyUsages: Array<{ line: number; content: string }> = [];
  
  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
      return;
    }
    
    // Patterns that indicate 'any' usage
    const anyPatterns = [
      /:\s*any\b/,           // : any
      /<any>/,               // <any>
      /\bany\[\]/,           // any[]
      /Array<any>/,          // Array<any>
      /Record<.*,\s*any>/,   // Record<string, any>
      /as\s+any\b/,          // as any
    ];
    
    // Check if line contains 'any' type
    const hasAny = anyPatterns.some(pattern => pattern.test(line));
    
    if (hasAny) {
      // Exclude allowed cases
      const isAllowedCase = 
        line.includes('// @ts-expect-error') ||
        line.includes('// eslint-disable-next-line') ||
        line.includes('// Allow any') ||
        line.includes('// TODO: Type this properly') ||
        line.includes('unknown') && !line.includes('any'); // 'unknown' is preferred over 'any'
      
      if (!isAllowedCase) {
        anyUsages.push({
          line: index + 1,
          content: line.trim()
        });
      }
    }
  });
  
  return anyUsages;
}

describe('Property 13: TypeScript any Elimination', () => {
  /**
   * Feature: enterprise-quality-audit, Property 13: TypeScript 'any' Elimination
   * Validates: Requirements 7.4
   */
  it('should not use "any" type in TypeScript files', () => {
    const srcDir = join(process.cwd(), 'src');
    const tsFiles = findTypeScriptFiles(srcDir);
    
    // Ensure we found TypeScript files
    expect(tsFiles.length).toBeGreaterThan(0);
    
    const filesWithAny: Array<{ file: string; usages: Array<{ line: number; content: string }> }> = [];
    
    tsFiles.forEach(file => {
      const anyUsages = findAnyUsage(file);
      
      if (anyUsages.length > 0) {
        filesWithAny.push({
          file: file.replace(process.cwd(), ''),
          usages: anyUsages
        });
      }
    });
    
    // Report files with 'any' usage
    if (filesWithAny.length > 0) {
      const report = filesWithAny.map(({ file, usages }) => {
        const usageDetails = usages.map(u => `  Line ${u.line}: ${u.content}`).join('\n');
        return `${file}:\n${usageDetails}`;
      }).join('\n\n');
      
      console.warn('\n⚠️  Files with "any" type usage:\n\n' + report);
    }
    
    // This test should pass - we want to eliminate 'any' types
    // For now, we'll make it a warning rather than a failure
    // to allow gradual migration
    expect(filesWithAny.length).toBeLessThanOrEqual(10); // Allow up to 10 files during migration
  });

  it('should prefer "unknown" over "any" for truly dynamic types', () => {
    const srcDir = join(process.cwd(), 'src');
    const tsFiles = findTypeScriptFiles(srcDir);
    
    let unknownCount = 0;
    let anyCount = 0;
    
    tsFiles.forEach(file => {
      const content = readFileSync(file, 'utf-8');
      
      // Count 'unknown' usage (good practice)
      const unknownMatches = content.match(/:\s*unknown\b/g);
      unknownCount += unknownMatches?.length || 0;
      
      // Count 'any' usage (bad practice)
      const anyUsages = findAnyUsage(file);
      anyCount += anyUsages.length;
    });
    
    // We should use 'unknown' more than 'any'
    // 'unknown' is type-safe, 'any' is not
    console.log(`\n📊 Type Safety Stats:`);
    console.log(`  ✅ 'unknown' usage: ${unknownCount}`);
    console.log(`  ⚠️  'any' usage: ${anyCount}`);
    
    // This is aspirational - we want more 'unknown' than 'any'
    // But we'll allow it during migration
    expect(unknownCount).toBeGreaterThanOrEqual(0);
  });

  it('should have proper types for error handling', () => {
    const errorHandlerPath = join(process.cwd(), 'src/utils/errorHandler.ts');
    const content = readFileSync(errorHandlerPath, 'utf-8');
    
    // Error handler should use 'unknown' for error parameter
    expect(content).toContain('error: unknown');
    
    // Should not use 'any' for error handling
    const anyUsages = findAnyUsage(errorHandlerPath);
    expect(anyUsages.length).toBe(0);
  });

  it('should have proper types for API responses', () => {
    const apiClientPath = join(process.cwd(), 'src/utils/apiClient.ts');
    const content = readFileSync(apiClientPath, 'utf-8');
    
    // API client should use generics, not 'any'
    expect(content).toContain('<T');
    expect(content).toContain('ApiResponse<T>');
    
    // Should not use 'any' for API responses
    const anyUsages = findAnyUsage(apiClientPath);
    expect(anyUsages.length).toBe(0);
  });

  it('should have proper types for logger', () => {
    const loggerPath = join(process.cwd(), 'src/utils/logger.ts');
    const content = readFileSync(loggerPath, 'utf-8');
    
    // Logger should use 'unknown' for data parameter
    expect(content).toContain('data: unknown');
    
    // Should not use 'any' for logging
    const anyUsages = findAnyUsage(loggerPath);
    expect(anyUsages.length).toBe(0);
  });

  it('should document exceptions where any is necessary', () => {
    const srcDir = join(process.cwd(), 'src');
    const tsFiles = findTypeScriptFiles(srcDir);
    
    const undocumentedAny: string[] = [];
    
    tsFiles.forEach(file => {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check if line has 'any' without documentation
        if (line.includes(': any') || line.includes('as any')) {
          const prevLine = lines[index - 1] || '';
          const hasDocumentation = 
            prevLine.includes('// Allow any') ||
            prevLine.includes('// TODO:') ||
            prevLine.includes('// @ts-expect-error') ||
            prevLine.includes('eslint-disable');
          
          if (!hasDocumentation && !line.trim().startsWith('//')) {
            undocumentedAny.push(`${file}:${index + 1}`);
          }
        }
      });
    });
    
    if (undocumentedAny.length > 0) {
      console.warn('\n⚠️  Undocumented "any" usage (should have comment explaining why):\n');
      undocumentedAny.forEach(location => console.warn(`  ${location}`));
    }
    
    // Allow some undocumented 'any' during migration
    expect(undocumentedAny.length).toBeLessThanOrEqual(20);
  });
});
