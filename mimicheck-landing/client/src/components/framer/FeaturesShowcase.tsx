/**
 * FeaturesShowcase Component - Three Feature Sections
 *
 * Displays the three main MimiCheck features with alternating layouts:
 * - Feature 1: Förder-Analyse with TaskListMockup (left)
 * - Feature 2: KI-Assistent with ChatMockup (right)
 * - Feature 3: Auto-Anträge with FormFillMockup (left)
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */

import { FeatureSection, type MockupType } from "./FeatureSection";
import { useTranslation } from "@/i18n";

export interface FeaturesShowcaseProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * FeaturesShowcase - Container for all three feature sections
 */
export default function FeaturesShowcase({
  className = "",
}: FeaturesShowcaseProps) {
  const { t } = useTranslation();

  // Helper to get string from translation (handles string | string[])
  const getString = (key: string): string => {
    const value = t(key);
    return Array.isArray(value) ? value.join(", ") : value;
  };

  // Get tags from translations (handle both array and string returns)
  const getTagsArray = (key: string): string[] => {
    const tags = t(key);
    if (Array.isArray(tags)) return tags;
    return [];
  };

  const featuresData = [
    {
      badge: getString("features.analyse.badge"),
      headline: getString("features.analyse.headline"),
      description: getString("features.analyse.description"),
      tags: getTagsArray("features.analyse.tags"),
      mockupPosition: "left" as const,
      mockupType: "task-list" as MockupType,
      id: "feature-analyse",
    },
    {
      badge: getString("features.assistant.badge"),
      headline: getString("features.assistant.headline"),
      description: getString("features.assistant.description"),
      tags: getTagsArray("features.assistant.tags"),
      mockupPosition: "right" as const,
      mockupType: "chat" as MockupType,
      id: "feature-assistent",
    },
    {
      badge: getString("features.autoFill.badge"),
      headline: getString("features.autoFill.headline"),
      description: getString("features.autoFill.description"),
      tags: getTagsArray("features.autoFill.tags"),
      mockupPosition: "left" as const,
      mockupType: "form-fill" as MockupType,
      id: "feature-antraege",
    },
  ];

  return (
    <div className={`space-y-8 lg:space-y-0 ${className}`}>
      {featuresData.map((feature, index) => (
        <FeatureSection key={feature.id || index} {...feature} />
      ))}
    </div>
  );
}

// Named export
export { FeaturesShowcase };
