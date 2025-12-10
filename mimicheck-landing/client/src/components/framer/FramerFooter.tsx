/**
 * FramerFooter Component - Premium Footer Section
 *
 * A Framer-style footer with logo, link groups, trust badges,
 * and company information following the dark theme design.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Award, Bot, MapPin, Mail, ExternalLink } from "lucide-react";
import { useTranslation } from "@/i18n";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

export interface FramerFooterProps {
  /** Logo image source */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Brand name */
  brandName?: string;
  /** Company description */
  description?: string;
  /** Link groups for navigation */
  linkGroups?: FooterLinkGroup[];
  /** Trust badges to display */
  trustBadges?: TrustBadge[];
  /** Company name for copyright */
  companyName?: string;
  /** Company address */
  address?: string;
  /** Company email */
  email?: string;
  /** Additional CSS classes */
  className?: string;
}

// Helper to get string from translation
const getString = (
  t: (key: string) => string | string[],
  key: string
): string => {
  const value = t(key);
  return Array.isArray(value) ? value.join(", ") : value;
};

// Function to get default link groups with translations
function getDefaultLinkGroups(
  t: (key: string) => string | string[]
): FooterLinkGroup[] {
  return [
    {
      title: getString(t, "footer.benefits"),
      links: [
        { label: "Wohngeld", href: "/auth" },
        { label: "Kindergeld", href: "/auth" },
        { label: "BAföG", href: "/auth" },
        { label: "Elterngeld", href: "/auth" },
        { label: "Bürgergeld", href: "/auth" },
      ],
    },
    {
      title: getString(t, "footer.legal"),
      links: [
        { label: getString(t, "footer.imprint"), href: "/impressum" },
        { label: getString(t, "footer.privacy"), href: "/datenschutz" },
        { label: getString(t, "footer.terms"), href: "/agb" },
        {
          label: getString(t, "footer.accessibility"),
          href: "/barrierefreiheit",
        },
      ],
    },
    {
      title: getString(t, "footer.support"),
      links: [
        { label: getString(t, "footer.contact"), href: "/contact" },
        { label: getString(t, "footer.help"), href: "/hilfe" },
        { label: getString(t, "footer.login"), href: "/auth" },
        {
          label: getString(t, "footer.aiTransparency"),
          href: "/ki-transparenz",
        },
      ],
    },
  ];
}

// Function to get default trust badges with translations
function getDefaultTrustBadges(
  t: (key: string) => string | string[]
): TrustBadge[] {
  return [
    {
      icon: <span className="text-base">🇩🇪</span>,
      label: getString(t, "trust.madeIn"),
    },
    {
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      label: getString(t, "trust.gdpr"),
    },
    { icon: <Bot className="w-4 h-4 text-violet-400" />, label: "EU AI Act" },
  ];
}

/**
 * FramerFooter - Premium footer with Framer-style design
 */
export default function FramerFooter({
  logo = "/mimicheck-logo-medium.png",
  logoAlt = "MimiCheck Logo",
  brandName = "MimiCheck",
  companyName = "MiMi Tech Ai UG (haftungsbeschränkt)",
  address = "Lindenplatz 23, 75378 Bad Liebenzell",
  email = "info@mimicheck.de",
  className = "",
}: Omit<FramerFooterProps, "description" | "linkGroups" | "trustBadges">) {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  // Get translated content
  const description = t("footer.description");
  const linkGroups = getDefaultLinkGroups(t);
  const trustBadges = getDefaultTrustBadges(t);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <footer
      className={`relative bg-[var(--framer-bg)] border-t border-[var(--framer-border)] ${className}`}
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand Section (Requirement: 10.1) */}
          <motion.div
            className="col-span-2 lg:col-span-2"
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {/* Logo and Brand Name */}
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 hover:opacity-90 transition-opacity"
            >
              <img
                src={logo}
                alt={logoAlt}
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
                {brandName}
              </span>
            </a>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--framer-text-secondary)] mb-5 max-w-sm leading-relaxed">
              {description}
            </p>

            {/* Trust Badges (Requirement: 10.4) */}
            <div
              className="flex flex-wrap gap-2 mb-5"
              role="list"
              aria-label="Trust badges"
            >
              {trustBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--framer-bg-elevated)] border border-[var(--framer-border)] text-[var(--framer-text-secondary)] text-xs font-medium hover:border-[var(--framer-border-hover)] transition-colors"
                  role="listitem"
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Company Info (Requirement: 10.3) */}
            <div className="text-xs sm:text-sm text-[var(--framer-text-muted)]">
              <p className="font-medium text-[var(--framer-text-secondary)]">
                {companyName}
              </p>
              <p className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {address}
              </p>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 mt-1 hover:text-[var(--framer-emerald)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {email}
              </a>
            </div>
          </motion.div>

          {/* Link Groups (Requirement: 10.2) */}
          {linkGroups.map(group => (
            <motion.div
              key={group.title}
              variants={prefersReducedMotion ? undefined : itemVariants}
            >
              <h4 className="font-semibold text-[var(--framer-text-primary)] mb-4 text-sm sm:text-base">
                {group.title}
              </h4>
              <nav aria-label={`${group.title} links`}>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 text-[var(--framer-text-secondary)] hover:text-[var(--framer-emerald)] transition-colors"
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.label}
                        {link.external && (
                          <ExternalLink
                            className="w-3 h-3"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section (Requirement: 10.5) */}
        <motion.div
          className="pt-8 border-t border-[var(--framer-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[var(--framer-text-muted)]"
          variants={prefersReducedMotion ? undefined : itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Copyright Notice */}
          <p>
            © {currentYear} {companyName.split(" (")[0]}.{" "}
            {getString(t, "footer.copyright")}
          </p>

          {/* Additional Trust Indicator */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Award
                className="w-4 h-4 text-[var(--framer-emerald)]"
                aria-hidden="true"
              />
              <span>{getString(t, "footer.trustedBy")}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// Named export for convenience
export { FramerFooter };
