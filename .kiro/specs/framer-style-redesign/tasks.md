# Implementation Plan

## Phase 1: Foundation & Theme Setup

- [x] 1. Set up Framer theme CSS variables and base styles
  - Create `framer-theme.css` with color palette, animations, and utility classes
  - Add CSS variables for --framer-bg, --framer-violet, --framer-emerald, etc.
  - Add keyframe animations for glow-pulse, float-particle, marquee-scroll
  - Import theme in main CSS file
  - _Requirements: 1.1, 1.2, 1.3_

## Phase 2: Core Components

- [x] 2. Implement GlowOrb animated background component
  - [x] 2.1 Create GlowOrb.tsx with pulsing violet orb animation
    - Implement radial gradient with blur effect
    - Add Framer Motion animation for scale/opacity pulse
    - Support customizable size, color, and animation speed props
    - _Requirements: 2.1, 2.6_
  - [x] 2.2 Add floating particle effects around the orb
    - Create 20-30 small animated dots
    - Random positioning and float animation delays
    - _Requirements: 2.7_

- [x] 3. Implement FramerNavbar component
  - [x] 3.1 Create FramerNavbar.tsx with logo, menu items, and CTA button
    - MimiCheck logo on left
    - Menu items: Home, Über uns, Blog, Kontakt
    - Primary CTA button "Jetzt starten" with violet background
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 3.2 Add scroll-based background transition
    - Transparent at scroll 0, solid dark at scroll > 50px
    - Smooth transition animation
    - _Requirements: 7.4, 7.5_
  - [x] 3.3 Implement mobile hamburger menu
    - Hamburger icon under 768px
    - Slide-in menu panel
    - _Requirements: 7.6_

- [x] 4. Implement FramerHero component
  - [x] 4.1 Create FramerHero.tsx with badge, headline, subtitle, and CTAs
    - "Neu" badge with "Automatische Förder-Erkennung" text
    - Large headline "Intelligente Förderanträge für moderne Menschen."
    - Subtitle with value proposition
    - Two CTA buttons with proper styling
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  - [x] 4.2 Add text reveal animations
    - Staggered fade-up for headline words
    - Fade-in for subtitle and buttons
    - _Requirements: 8.1, 8.2_
  - [x] 4.3 Integrate GlowOrb as background element
    - Position orb in center-top area
    - Layer behind text content
    - _Requirements: 2.1_

## Phase 3: Trust & Services Sections

- [x] 5. Implement TrustMarquee component
  - [x] 5.1 Create TrustMarquee.tsx with title and logo row
    - "Über 50+ Unternehmen vertrauen uns" title
    - Horizontal scrolling logo container
    - _Requirements: 3.1, 3.2_
  - [x] 5.2 Add seamless infinite scroll animation
    - Duplicate logo list for seamless loop
    - CSS translateX animation
    - Grayscale filter with hover effect
    - _Requirements: 3.3, 3.4, 3.5_

- [x] 6. Implement ServicesSection component
  - Create ServicesSection.tsx with badge, headline, and subtitle
  - "Our Services" badge
  - "KI-Lösungen die dein Business auf das nächste Level bringen" headline
  - Scroll-triggered fade-in animation
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

## Phase 4: Feature Sections with UI Mockups

- [x] 7. Implement UIMockup component variants
  - [x] 7.1 Create base UIMockup.tsx component
    - Dark card with slate-900 background
    - Subtle border and shadow
    - Hover scale and glow effects
    - _Requirements: 5.7, 5.8_
  - [x] 7.2 Implement TaskListMockup variant
    - Tab bar (All Tasks, Waiting for approval)
    - Task items with icons, titles, status indicators
    - MimiCheck-specific tasks: Wohngeld, BAföG, Kindergeld
    - _Requirements: 5.2_
  - [x] 7.3 Implement ChatMockup variant
    - Chat interface with AI messages
    - Document analysis visualization
    - _Requirements: 5.3_
  - [x] 7.4 Implement FormFillMockup variant
    - Form fields being auto-filled
    - Progress indicator
    - _Requirements: 5.4_

- [x] 8. Implement FeatureSection component
  - [x] 8.1 Create FeatureSection.tsx with alternating layout
    - Grid layout with mockup and text columns
    - Support for left/right mockup positioning
    - _Requirements: 5.2, 5.3, 5.4_
  - [x] 8.2 Add category badge and feature tags
    - Badge above headline (e.g., "Förder-Analyse")
    - Pill buttons for tags below description
    - _Requirements: 5.5, 5.6_
  - [x] 8.3 Create three feature instances
    - Feature 1: Förder-Analyse with TaskListMockup (left)
    - Feature 2: KI-Assistent with ChatMockup (right)
    - Feature 3: Auto-Anträge with FormFillMockup (left)
    - _Requirements: 5.1_

- [ ]* 8.4 Write property test for Feature Section completeness
  - **Property 1: Feature Section Completeness**
  - **Validates: Requirements 5.1, 5.5, 5.6**

## Phase 5: Process Section

- [x] 9. Implement ProcessSection component
  - [x] 9.1 Create ProcessSection.tsx with header and step cards
    - "Unser Prozess" badge
    - "Dein Weg zur Förderung in 3 Schritten" headline
    - Horizontal card layout (3 columns)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 9.2 Create ProcessCard component with visualizations
    - Step number label
    - Title and description
    - Dark card with violet/emerald border accent
    - Hover lift and glow effect
    - _Requirements: 6.5, 6.6, 6.7, 6.8, 6.9_
  - [x] 9.3 Implement step visualizations
    - Step 1: Document upload visualization (PDF icons, progress)
    - Step 2: AI analysis visualization (scanning animation, checkmarks)
    - Step 3: Form submission visualization (auto-fill, send)
    - _Requirements: 6.5, 6.6, 6.7_

- [ ]* 9.4 Write property test for Process Steps completeness
  - **Property 2: Process Steps Completeness**
  - **Validates: Requirements 6.5, 6.6, 6.7**

## Phase 6: Footer & Final Assembly

- [x] 10. Implement FramerFooter component
  - Create FramerFooter.tsx with logo, links, and company info
  - MimiCheck logo and description
  - Link groups: Förderungen, Rechtliches, Support
  - Trust badges (Made in Germany, DSGVO, EU AI Act)
  - Copyright notice
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Create LandingFramer page and integrate all components
  - [x] 11.1 Create LandingFramer.tsx page component
    - Import and compose all section components
    - Add proper section spacing and layout
    - _Requirements: 1.4, 1.5_
  - [x] 11.2 Add scroll-triggered animations for all sections
    - Framer Motion useInView for reveal animations
    - Staggered animations for lists and cards
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 11.3 Implement reduced motion support
    - Check prefers-reduced-motion
    - Disable or reduce animations accordingly
    - _Requirements: 8.5_

- [ ]* 11.4 Write property test for Navigation Menu Items
  - **Property 3: Navigation Menu Items**
  - **Validates: Requirements 7.1, 7.2, 7.3**

## Phase 7: Responsive Design

- [x] 12. Implement responsive layouts
  - [x] 12.1 Mobile layout adjustments (< 768px)
    - Stack feature sections vertically
    - Reduce headline font sizes
    - Full-width buttons
    - _Requirements: 9.1, 9.2, 9.5_
  - [x] 12.2 Tablet layout adjustments (768px - 1023px)
    - Adjust grid gaps and padding
    - _Requirements: 9.1_
  - [x] 12.3 Process section mobile stack
    - Vertical card layout on mobile
    - _Requirements: 9.3_
  - [x] 12.4 Mobile glow effect optimization
    - Reduce blur and size for performance
    - _Requirements: 9.6_

## Phase 8: Route Integration & Cleanup

- [x] 13. Update routing and navigation
  - [x] 13.1 Add LandingFramer route to App.tsx
    - Replace or add alongside existing landing page
    - Update default route if needed
    - _Requirements: 1.4_
  - [x] 13.2 Update internal links
    - Ensure all CTAs and navigation links work correctly
    - _Requirements: 7.2_

- [x] 14. Final Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 15. Write integration tests
  - [ ]* 15.1 Test page renders without errors
  - [ ]* 15.2 Test navigation functionality
  - [ ]* 15.3 Test responsive breakpoints
