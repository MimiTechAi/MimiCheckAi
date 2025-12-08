/**
 * Footer Legal Links Accessibility Test - Landing Page
 * Task 6.5: Verify legal page accessibility from footer
 * Requirements: 3.3
 * 
 * This test verifies that:
 * - Footer links to Impressum, AGB, Datenschutz exist
 * - Links are visible and accessible
 * - Links work on mobile and desktop viewports
 */

import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import LandingPage from '../pages/LandingPage';

// Helper to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  const { hook } = memoryLocation({ path: '/' });
  return render(
    <Router hook={hook}>
      {component}
    </Router>
  );
};

// Helper to set viewport size
const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('Footer Legal Links Accessibility - Landing Page', () => {
  describe('Desktop viewport (1920x1080)', () => {
    beforeEach(() => {
      setViewport(1920, 1080);
    });

    it('should render footer with legal links section', () => {
      renderWithRouter(<LandingPage />);
      
      // Find footer element by id
      const footer = document.getElementById('footer');
      expect(footer).toBeInTheDocument();
      
      // Check for "Rechtliches" heading
      const legalHeading = within(footer!).getByText('Rechtliches');
      expect(legalHeading).toBeInTheDocument();
      expect(legalHeading).toBeVisible();
    });

    it('should have Impressum link that is visible and accessible', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      
      expect(impressumLink).toBeInTheDocument();
      expect(impressumLink).toBeVisible();
      expect(impressumLink).toHaveAttribute('href');
      
      // Check href points to impressum page
      const href = impressumLink.getAttribute('href');
      expect(href).toMatch(/impressum/i);
    });

    it('should have AGB link that is visible and accessible', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      
      expect(agbLink).toBeInTheDocument();
      expect(agbLink).toBeVisible();
      expect(agbLink).toHaveAttribute('href');
      
      // Check href points to AGB page
      const href = agbLink.getAttribute('href');
      expect(href).toMatch(/agb/i);
    });

    it('should have Datenschutz link that is visible and accessible', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(datenschutzLink).toBeInTheDocument();
      expect(datenschutzLink).toBeVisible();
      expect(datenschutzLink).toHaveAttribute('href');
      
      // Check href points to datenschutz page
      const href = datenschutzLink.getAttribute('href');
      expect(href).toMatch(/datenschutz/i);
    });

    it('should have all three legal links in the footer', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      
      // Get all links in the legal section
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(impressumLink).toBeInTheDocument();
      expect(agbLink).toBeInTheDocument();
      expect(datenschutzLink).toBeInTheDocument();
    });

    it('should have legal links with hover styles', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      
      // Check for transition classes that indicate hover effects
      const className = impressumLink.className;
      expect(className).toMatch(/hover|transition/);
    });
  });

  describe('Tablet viewport (768x1024)', () => {
    beforeEach(() => {
      setViewport(768, 1024);
    });

    it('should render footer with legal links on tablet', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      expect(footer).toBeInTheDocument();
      
      // All three legal links should be present
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(impressumLink).toBeVisible();
      expect(agbLink).toBeVisible();
      expect(datenschutzLink).toBeVisible();
    });
  });

  describe('Mobile viewport (375x667)', () => {
    beforeEach(() => {
      setViewport(375, 667);
    });

    it('should render footer with legal links on mobile', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      expect(footer).toBeInTheDocument();
      
      // All three legal links should be present and visible on mobile
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(impressumLink).toBeVisible();
      expect(agbLink).toBeVisible();
      expect(datenschutzLink).toBeVisible();
    });

    it('should have accessible legal links on mobile', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      
      // Check all links have proper href attributes
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(impressumLink).toHaveAttribute('href');
      expect(agbLink).toHaveAttribute('href');
      expect(datenschutzLink).toHaveAttribute('href');
    });
  });

  describe('Accessibility attributes', () => {
    it('should have semantic footer element', () => {
      renderWithRouter(<LandingPage />);
      
      // Footer should be a semantic <footer> element
      const footer = document.getElementById('footer');
      expect(footer?.tagName.toLowerCase()).toBe('footer');
    });

    it('should have links that are keyboard accessible', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      
      // Links should be focusable (tabIndex should not be -1)
      expect(impressumLink).not.toHaveAttribute('tabindex', '-1');
    });

    it('should have descriptive link text', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      
      // Links should have clear, descriptive text
      const impressumLink = within(footer!).getByRole('link', { name: /impressum/i });
      const agbLink = within(footer!).getByRole('link', { name: /agb/i });
      const datenschutzLink = within(footer!).getByRole('link', { name: /datenschutz/i });
      
      expect(impressumLink.textContent).toBeTruthy();
      expect(agbLink.textContent).toBeTruthy();
      expect(datenschutzLink.textContent).toBeTruthy();
    });

    it('should have company information visible in footer', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      
      // Check for company name
      const companyName = within(footer!).getByText(/MiMi Tech Ai UG/i);
      expect(companyName).toBeInTheDocument();
      expect(companyName).toBeVisible();
    });

    it('should have contact information in footer', () => {
      renderWithRouter(<LandingPage />);
      
      const footer = document.getElementById('footer');
      
      // Check for email link
      const emailLink = within(footer!).getByRole('link', { name: /info@mimitechai\.com/i });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:info@mimitechai.com');
    });
  });
});
