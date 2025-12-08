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

import { FeatureSection, FeatureSectionProps } from "./FeatureSection";

export interface FeaturesShowcaseProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Feature data based on design document specifications
 * Each feature has alternating mockup positions for visual variety
 */
const features: FeatureSectionProps[] = [
  {
    badge: "Förder-Analyse",
    headline: "Automatisiere repetitive Aufgaben",
    description:
      "Wir helfen dir, interne Abläufe zu optimieren durch automatisierte Förder-Suche, Dokumenten-Analyse und Antrags-Workflows. Unsere KI durchsucht tausende Förderprogramme und findet automatisch die passenden für deine Situation.",
    tags: ["Wohngeld", "BAföG", "100+ Förderungen"],
    mockupPosition: "left",
    mockupType: "task-list",
    id: "feature-analyse",
  },
  {
    badge: "KI-Assistent",
    headline: "Delegiere tägliche Aufgaben",
    description:
      "Von der Dokumenten-Analyse bis zur Antrags-Vorbereitung – unser KI-Assistent arbeitet rund um die Uhr für dich. Er analysiert deine Unterlagen, erkennt relevante Daten und bereitet alles für den Antrag vor.",
    tags: ["Zusammenfassungen", "Analyse", "Vieles mehr"],
    mockupPosition: "right",
    mockupType: "chat",
    id: "feature-assistent",
  },
  {
    badge: "Auto-Anträge",
    headline: "Baue smartere Systeme",
    description:
      "Ob du bei Null startest oder ein bestehendes System verbesserst – wir entwickeln maßgeschneiderte Lösungen für deine Förderanträge. Formulare werden automatisch ausgefüllt und zur Einreichung vorbereitet.",
    tags: ["Auto-Fill", "PDF-Export", "Einreichung"],
    mockupPosition: "left",
    mockupType: "form-fill",
    id: "feature-antraege",
  },
];

/**
 * FeaturesShowcase - Container for all three feature sections
 */
export default function FeaturesShowcase({
  className = "",
}: FeaturesShowcaseProps) {
  return (
    <div className={`space-y-8 lg:space-y-0 ${className}`}>
      {features.map((feature, index) => (
        <FeatureSection key={feature.id || index} {...feature} />
      ))}
    </div>
  );
}

// Named export
export { FeaturesShowcase, features };
