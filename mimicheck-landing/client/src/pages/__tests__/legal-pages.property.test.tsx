/**
 * Property-Based Tests for Legal Pages
 * Feature: enterprise-quality-audit
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { join } from 'path';

// Company data from mimitech_company_data.md
const EXPECTED_COMPANY_DATA = {
  companyName: 'MiMi Tech Ai UG (haftungsbeschränkt)',
  address: {
    street: 'Lindenplatz 23',
    postalCode: '75378',
    city: 'Bad Liebenzell',
    country: 'Deutschland',
  },
  contact: {
    email: 'info@mimitechai.com',
    phone: '+49 1575 8805737',
    website: 'www.mimitechai.com',
  },
  representative: 'Michael Bemler',
  registryCourt: 'Amtsgericht Stuttgart',
  legalForm: 'UG (haftungsbeschränkt)',
};

/**
 * Helper function to read legal page content
 */
function readLegalPageContent(pageName: string): string {
  const filePath = join(__dirname, '..', `${pageName}.tsx`);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Helper function to check if text contains a value (case-insensitive, whitespace-flexible)
 */
function containsValue(content: string, value: string): boolean {
  // Normalize whitespace and make case-insensitive
  const normalizedContent = content.replace(/\s+/g, ' ').toLowerCase();
  const normalizedValue = value.replace(/\s+/g, ' ').toLowerCase();
  return normalizedContent.includes(normalizedValue);
}

describe('Legal Pages Property Tests', () => {
  // Feature: enterprise-quality-audit, Property 6: Legal Page Consistency
  // Validates: Requirements 3.4, 4.4
  describe('Property 6: Legal Page Consistency', () => {
    it('should have consistent company information across all legal pages', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Impressum', 'AGB', 'Datenschutz'),
          (pageName) => {
            const content = readLegalPageContent(pageName);

            // Check company name
            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.companyName),
              `${pageName} should contain company name: ${EXPECTED_COMPANY_DATA.companyName}`
            ).toBe(true);

            // Check address components
            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.address.street),
              `${pageName} should contain street: ${EXPECTED_COMPANY_DATA.address.street}`
            ).toBe(true);

            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.address.postalCode),
              `${pageName} should contain postal code: ${EXPECTED_COMPANY_DATA.address.postalCode}`
            ).toBe(true);

            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.address.city),
              `${pageName} should contain city: ${EXPECTED_COMPANY_DATA.address.city}`
            ).toBe(true);

            // Check contact information
            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.contact.email),
              `${pageName} should contain email: ${EXPECTED_COMPANY_DATA.contact.email}`
            ).toBe(true);

            // Phone number might be formatted differently, so check without spaces/dashes
            const phoneDigits = EXPECTED_COMPANY_DATA.contact.phone.replace(/[\s\-]/g, '');
            const contentDigits = content.replace(/[\s\-]/g, '');
            expect(
              contentDigits.includes(phoneDigits),
              `${pageName} should contain phone number: ${EXPECTED_COMPANY_DATA.contact.phone}`
            ).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have representative name in Impressum and Datenschutz', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Impressum', 'Datenschutz'),
          (pageName) => {
            const content = readLegalPageContent(pageName);

            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.representative),
              `${pageName} should contain representative: ${EXPECTED_COMPANY_DATA.representative}`
            ).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have registry court information in Impressum', () => {
      const content = readLegalPageContent('Impressum');

      expect(
        containsValue(content, EXPECTED_COMPANY_DATA.registryCourt),
        'Impressum should contain registry court'
      ).toBe(true);

      expect(
        containsValue(content, EXPECTED_COMPANY_DATA.legalForm),
        'Impressum should contain legal form'
      ).toBe(true);
    });

    it('should have no conflicting company information', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Impressum', 'AGB', 'Datenschutz'),
          (pageName) => {
            const content = readLegalPageContent(pageName);

            // Check that there are no conflicting addresses
            // If postal code is present, city should also be present
            if (containsValue(content, EXPECTED_COMPANY_DATA.address.postalCode)) {
              expect(
                containsValue(content, EXPECTED_COMPANY_DATA.address.city),
                `${pageName} has postal code but missing city`
              ).toBe(true);
            }

            // If street is present, postal code should also be present
            if (containsValue(content, EXPECTED_COMPANY_DATA.address.street)) {
              expect(
                containsValue(content, EXPECTED_COMPANY_DATA.address.postalCode),
                `${pageName} has street but missing postal code`
              ).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have consistent email format across all pages', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Impressum', 'AGB', 'Datenschutz'),
          (pageName) => {
            const content = readLegalPageContent(pageName);

            // Email should be present
            expect(
              containsValue(content, EXPECTED_COMPANY_DATA.contact.email),
              `${pageName} should contain email`
            ).toBe(true);

            // Email should be in a valid format (basic check)
            const emailRegex = /info@mimitechai\.com/i;
            expect(
              emailRegex.test(content),
              `${pageName} should have properly formatted email`
            ).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have all required legal pages with proper structure', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Impressum', 'AGB', 'Datenschutz'),
          (pageName) => {
            const content = readLegalPageContent(pageName);

            // Should be a React component
            expect(
              content.includes('export default function'),
              `${pageName} should be a React component`
            ).toBe(true);

            // Should have a title/heading
            expect(
              content.includes('<h1') || content.includes('className="text-4xl'),
              `${pageName} should have a main heading`
            ).toBe(true);

            // Should have Navbar
            expect(
              content.includes('<Navbar'),
              `${pageName} should include Navbar`
            ).toBe(true);

            // Should have back link to home
            expect(
              content.includes('href="/"') || content.includes('to="/"'),
              `${pageName} should have link back to home`
            ).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
