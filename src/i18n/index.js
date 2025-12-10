import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  de: {
    translation: {
      appTitle: 'Nebenkosten-Knacker',
      nav: { onboarding: 'Profil vervollständigen' },
      upload: { title: 'Upload', progress: 'Analyse läuft…' },
      abrechnungen: { title: 'Abrechnungen', filter: 'Filter' },
      notifications: { title: 'Benachrichtigungen', empty: 'Keine Meldungen' },
      dashboard: {
        greeting: { morning: 'Guten Morgen', day: 'Guten Tag', evening: 'Guten Abend' },
        hero: { secure: 'Sicher & Verschlüsselt', easy: 'leicht gemacht', subtitle: 'MiMiCheck analysiert Ihre Dokumente mit KI.', ctaUpload: 'Neue Abrechnung', ctaAntraege: 'Meine Anträge' },
        stats: { total: 'GESAMT', active: 'AKTIV', potential: 'POTENZIAL', savings: 'Ø Ersparnis/Jahr', processing: 'In Bearbeitung', abrechnungen: 'Abrechnungen' },
        activity: { title: 'Letzte Aktivitäten', viewAll: 'Alle anzeigen', emptyTitle: 'Noch keine Abrechnungen', emptyText: 'Starten Sie jetzt und lassen Sie uns Ihre Dokumente analysieren!', createFirst: 'Erste Abrechnung erstellen' },
        status: { completed: 'Abgeschlossen', processing: 'In Bearbeitung', pending: 'Wartend', error: 'Fehler' },
        tabs: {
          title: 'Dein Förder-Cockpit',
          subtitle: 'Profil ausfüllen, AI-Analyse starten, passende Anträge finden.',
          overview: 'Übersicht',
          profile: 'Mein Profil',
          applications: 'Meine Anträge',
          profileStatus: 'Profil-Status',
          ready: 'Bereit',
          incomplete: 'Unvollständig',
          potentialSavings: 'Potenzielle Ersparnis',
          matchingApps: 'Passende Anträge',
          perMonth: 'pro Monat',
          completeProfile: 'Profil vervollständigen',
          completeProfileText: 'Fülle dein Profil aus, damit unsere AI passende Förderungen und Anträge für dich finden kann.',
          fillNow: 'Jetzt ausfüllen',
          analysisComplete: 'AI-Analyse abgeschlossen',
          foundPrograms: 'Wir haben {{count}} passende Förderungen für dich gefunden!',
          viewApps: 'Anträge ansehen',
          reanalyze: 'Neu analysieren',
          analyzing: 'AI analysiert dein Profil...',
          analyzingWait: 'Dies kann einen Moment dauern.',
          profileIncomplete: 'Profil unvollständig',
          fillProfileFirst: 'Bitte fülle zuerst dein Profil aus, damit wir passende Anträge für dich finden können.',
          fillProfile: 'Profil ausfüllen',
          yourRecommendations: 'Deine Empfehlungen',
          foundBasedOnProfile: 'Basierend auf deinem Profil haben wir {{count}} passende Förderungen gefunden.',
          estimatedPotential: 'Geschätztes Potenzial',
          match: 'Match',
          fillWithAI: 'Mit AI ausfüllen',
          noRecommendations: 'Keine Empfehlungen',
          noRecommendationsText: 'Basierend auf deinem Profil konnten wir keine passenden Förderungen finden.',
          analyzeAgain: 'Erneut analysieren'
        },
        profileWidget: {
          status: 'Profil-Status',
          readyForAnalysis: 'Bereit für AI-Analyse',
          completeYourProfile: 'Vervollständige dein Profil',
          fields: 'Felder',
          fillSection: '{{section}} ausfüllen',
          tip: 'Tipp: Je vollständiger dein Profil, desto bessere Empfehlungen!',
          sections: {
            personal: 'Persönliche Daten',
            address: 'Kontakt & Adresse',
            income: 'Einkommen',
            living: 'Wohnsituation',
            children: 'Kinder',
            bank: 'Bankverbindung',
            insurance: 'Krankenversicherung',
            special: 'Besondere Umstände',
            partner: 'Partner/in',
            assets: 'Vermögen'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Wohngeld', 'Kindergeld', 'BAföG', 'Elterngeld'] },
        flow: {
          step1: { title: 'Upload', subtitle: 'Dokumente hochladen' },
          step2: { title: 'KI-Analyse', subtitle: 'Automatische Prüfung' },
          step3: { title: 'Bewilligt', subtitle: 'Geld erhalten' },
          tagline: { auto: 'Automatisch.', secure: 'Sicher.', time: 'In 3 Minuten.' }
        }
      },
      chat: {
        initial: 'Hallo! Ich bin dein Bürokratie-Lotse. 👋\nIch helfe dir bei Anträgen, Formularen oder dem Upload deiner Abrechnung. Was möchtest du tun?',
        title: 'Bürokratie-Lotse',
        online: 'Online',
        placeholder: 'Frag mich etwas...',
        error: 'Entschuldigung, ich habe gerade Verbindungsprobleme.',
        configError: '⚠️ Konfigurationsfehler: Der OpenAI API-Key fehlt oder ist ungültig.'
      },
      layout: {
        subtitle: 'Dein digitaler Antragshelfer',
        nav: { dashboard: 'Dashboard', upload: 'Upload', antraege: 'Anträge', contact: 'Kontakt', impressum: 'Impressum' },
        profile: { edit: 'Profil bearbeiten', logout: 'Abmelden', login: 'Anmelden / Registrieren' },
        footer: '© 2025 MiMiCheck. Made with ❤️ in DACH.'
      },
      anspruchsAnalyse: {
        title: 'KI-Anspruchsanalyse',
        subtitle: 'Lassen Sie unsere KI analysieren, auf welche Förderungen Sie Anspruch haben',
        cta: {
          ready: 'Bereit für Ihre persönliche Analyse?',
          description: 'Unsere KI analysiert Ihr Profil und ermittelt, auf welche Sozialleistungen und Förderungen Sie voraussichtlich Anspruch haben. Sie sehen dann konkrete Beträge und die nächsten Schritte.',
          button: 'Jetzt Ansprüche analysieren',
          analyzing: 'Analysiere Ansprüche...'
        },
        results: {
          total: 'Geschätzter monatlicher Gesamtanspruch',
          programs: 'Programme mit Anspruch',
          match: 'Match',
          amount: 'Geschätzter monatlicher Betrag',
          reason: 'Begründung:',
          docs: 'Benötigte Dokumente:',
          steps: 'Nächste Schritte:',
          download: 'Offizielles Formular herunterladen',
          recommendations: 'Empfehlungen',
          retry: 'Erneut analysieren',
          pdf: 'Ergebnis als PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Wohngeld',
              reasoning: 'Basierend auf Ihrem Einkommen und Ihrer Wohnsituation haben Sie hohe Chancen auf Wohngeld.',
              requiredDocuments: ['Mietvertrag', 'Einkommensnachweise der letzten 12 Monate', 'Personalausweis'],
              nextSteps: ['Formular herunterladen', 'Dokumente zusammenstellen', 'Bei Wohngeldstelle einreichen']
            },
            {
              programName: 'Kindergeld',
              reasoning: 'Sie haben Anspruch auf Kindergeld für Ihre Kinder bis zum 18. Lebensjahr (ggf. länger bei Ausbildung).',
              requiredDocuments: ['Geburtsurkunde des Kindes', 'Steuer-ID', 'Haushaltsbescheinigung'],
              nextSteps: ['Antrag bei Familienkasse stellen', 'Geburtsurkunde einreichen', 'Auf Bewilligung warten']
            },
            {
              programName: 'Grundsicherung (Bürgergeld)',
              reasoning: 'Bei niedrigem Einkommen können Sie zusätzliche Grundsicherung beantragen.',
              requiredDocuments: ['Personalausweis', 'Einkommensnachweise', 'Mietbescheinigung', 'Kontoauszüge'],
              nextSteps: ['Termin beim Jobcenter vereinbaren', 'Antrag ausfüllen', 'Unterlagen vorlegen']
            }
          ],
          recommendations: [
            'Vervollständigen Sie Ihr Profil für genauere Analysen',
            'Bereiten Sie alle Dokumente im Voraus vor',
            'Nutzen Sie unsere KI-Ausfüllhilfe für schnellere Anträge',
            'Stellen Sie mehrere Anträge parallel, um Ihre Chancen zu maximieren'
          ]
        }
      },
      uploadPage: {
        back: 'Zurück',
        secureTransfer: 'Sichere Übertragung',
        title: 'Dokument',
        titleHighlight: 'hochladen',
        subtitle: 'Wir analysieren deine Nebenkostenabrechnung oder deinen Mietvertrag auf Fehler und Sparpotenzial.',
        steps: {
          upload: { title: 'Dokument hochladen', description: 'Sichere Übertragung...' },
          analysis: { title: 'KI-Analyse', description: 'Prüfe Inhalt und Struktur...' },
          extraction: { title: 'Datenextraktion', description: 'Identifiziere Kostenpunkte...' },
          legal: { title: 'Rechtliche Prüfung', description: 'Abgleich mit Mietrecht...' },
          report: { title: 'Bericht erstellen', description: 'Finalisiere Ergebnisse...' }
        },
        features: {
          formats: { title: 'Alle Formate', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'DSGVO Konform', desc: 'Verschlüsselt' },
          ai: { title: 'KI Analyse', desc: 'Sofort-Ergebnis' }
        },
        errors: {
          uploadFailed: 'Upload fehlgeschlagen',
          unexpected: 'Ein unerwarteter Fehler ist aufgetreten.'
        }
      },
      antraegePage: {
        title: 'Deine Ansprüche',
        subtitle: 'Unsere KI hat basierend auf deinem Profil diese Förderungen für dich gefunden.',
        noProfile: {
          title: 'Profil vervollständigen',
          text: 'Vervollständige dein Profil, damit unsere KI passende Förderungen für dich finden kann.',
          button: 'Profil vervollständigen'
        },
        searchPlaceholder: 'Suche nach Anträgen (z.B. Wohngeld)...',
        filter: { all: 'Alle' },
        categories: {
          social: 'Grundsicherung & Soziales',
          family: 'Familie & Kinder',
          housing: 'Wohnen & Miete',
          education: 'Bildung & Ausbildung',
          retirement: 'Rente & Alter',
          health: 'Gesundheit & Pflege'
        },
        card: {
          match: 'Match',
          amount: 'Geschätzter Betrag',
          duration: 'Bearbeitungsdauer',
          button: 'Jetzt Beantragen'
        },
        fallback: {
          wohngeld: { name: 'Wohngeld', desc: 'Staatlicher Zuschuss zur Miete für Haushalte mit geringem Einkommen.' },
          kindergeld: { name: 'Kindergeld', desc: 'Monatliche Unterstützung für alle Familien mit Kindern.' },
          buergergeld: { name: 'Bürgergeld', desc: 'Grundsicherung für Arbeitssuchende zur Sicherung des Lebensunterhalts.' },
          bafoeg: { name: 'BAföG', desc: 'Staatliche Unterstützung für Schüler und Studierende.' }
        }
      },
      contactPage: {
        title: 'Kontakt & Support',
        subtitle: 'Wir sind für dich da. Egal ob technische Fragen, Feedback oder Partnerschaften.',
        liveChat: {
          title: 'Live Chat',
          desc: 'Unser KI-Assistent "Bürokratie-Lotse" ist rund um die Uhr für dich da.',
          button: 'Chat öffnen'
        },
        contact: {
          title: 'Kontakt',
          response: 'Antwort innerhalb von 24h'
        },
        location: {
          title: 'Standort',
          country: 'Deutschland'
        },
        form: {
          title: 'Schreib uns',
          name: 'Name',
          namePlaceholder: 'Dein Name',
          email: 'E-Mail',
          emailPlaceholder: 'deine@email.de',
          message: 'Nachricht',
          messagePlaceholder: 'Wie können wir dir helfen?',
          submit: 'Nachricht senden',
          submitting: 'Wird gesendet...',
          successTitle: 'Nachricht gesendet!',
          successText: 'Vielen Dank für deine Nachricht. Wir melden uns schnellstmöglich bei dir.',
          newMsg: 'Neue Nachricht schreiben'
        }
      },
      impressumPage: {
        title: 'Impressum',
        subtitle: 'Rechtliche Informationen gemäß § 5 TMG',
        provider: 'Anbieterinformationen',
        company: 'Unternehmen',
        contact: 'Kontakt',
        responsible: 'Verantwortlich für den Inhalt',
        register: 'Registereintrag',
        registerText: 'Eintragung im Handelsregister.\nRegistergericht: [Amtsgericht nachtragen]\nRegisternummer: [HRB nachtragen]',
        disclaimer: {
          title: 'Haftungsausschluss',
          contentTitle: 'Haftung für Inhalte',
          content: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Die Nutzung der KI-Empfehlungen erfolgt auf eigene Verantwortung.',
          legalTitle: 'Rechtliche Beratung',
          legal: 'MiMiCheck stellt keine Rechtsberatung dar. Bei rechtlichen Fragen wenden Sie sich bitte an einen qualifizierten Rechtsanwalt oder Steuerberater.'
        }
      },
      datenschutzPage: {
        title: 'Datenschutzerklärung',
        subtitle: 'Gemäß Art. 13, 14 DSGVO • Stand: Januar 2025',
        security: {
          title: 'Ihre Daten sind sicher',
          text: 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.'
        },
        collection: {
          title: 'Welche Daten wir sammeln',
          google: { title: 'Google Login:', text: 'Name, E-Mail-Adresse (zur Kontenerstellung)' },
          profile: { title: 'Profildaten:', text: 'Einkommen, Familienstand, Wohnsituation (für Förderprüfung)' },
          docs: { title: 'Dokumente:', text: 'Nebenkostenabrechnungen (zur rechtlichen Analyse)' }
        },
        ai: {
          title: 'KI & Datenverarbeitung',
          purpose: { title: 'Zweck:', text: 'Automatische Prüfung von Förderansprüchen und Nebenkostenabrechnungen' },
          anon: { title: 'Anonymisierung:', text: 'Daten werden für KI-Analyse pseudonymisiert' },
          noShare: { title: 'Keine Weitergabe:', text: 'Ihre Daten werden nicht an Dritte verkauft' }
        },
        rights: {
          title: 'Ihre Rechte',
          info: { title: 'Auskunft', text: 'Sie haben das Recht auf Auskunft über Ihre gespeicherten Daten.' },
          delete: { title: 'Löschung', text: 'Sie können jederzeit die Löschung Ihrer Daten beantragen.' },
          revoke: { title: 'Widerruf', text: 'Einverständnisse können jederzeit widerrufen werden.' }
        },
        contact: {
          title: 'Kontakt zum Datenschutzbeauftragten',
          text: 'Bei Fragen zum Datenschutz kontaktieren Sie uns unter:'
        }
      },
      agbPage: {
        title: 'Allgemeine Geschäftsbedingungen',
        subtitle: 'Stand: Januar 2025',
        scope: {
          title: '§ 1 Geltungsbereich & Vertragsgegenstand',
          content1: 'Diese AGB regeln die Nutzung der Plattform MiMiCheck.',
          content2: 'Gegenstand ist die Bereitstellung einer KI-gestützten Software zur Analyse von Ansprüchen auf staatliche Leistungen und Prüfung von Nebenkostenabrechnungen.'
        },
        duties: {
          title: '§ 2 Pflichten des Nutzers',
          content1: 'Der Nutzer ist für die Richtigkeit der eingegebenen Daten verantwortlich. Falsche Angaben können zu fehlerhaften Ergebnissen führen.',
          content2: 'Die Zugangsdaten sind geheim zu halten.'
        },
        liability: {
          title: '§ 3 Haftungsbeschränkung',
          content1: 'MiMiCheck übernimmt keine Garantie für die Richtigkeit der Analyseergebnisse. Die Plattform stellt keine Rechts- oder Steuerberatung dar.',
          content2: 'Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen.'
        }
      },
      onboardingPage: {
        loading: 'Lade Profil...',
        welcome: 'Willkommen bei MiMiCheck',
        step: 'Schritt {{current}} von {{total}}',
        error: 'Fehler beim Speichern. Bitte erneut versuchen.',
        steps: {
          basics: {
            title: 'Basisdaten',
            firstName: 'Vorname',
            lastName: 'Nachname',
            birthDate: 'Geburtsdatum',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} von 3 Feldern ausgefüllt'
          },
          living: {
            title: 'Lebenssituation',
            type: 'Wohnart',
            select: 'Bitte wählen',
            rent: '🏠 Miete',
            own: '🏡 Eigentum'
          },
          consent: {
            title: 'Zustimmung',
            text: 'Ich akzeptiere die <1>Datenschutzbedingungen</1> und stimme der Verarbeitung meiner Daten gemäß DSGVO zu.'
          }
        },
        buttons: {
          back: 'Zurück',
          next: 'Weiter',
          finish: 'Abschließen'
        }
      },
      lebenslagenPage: {
        loading: 'Lade Formulardaten...',
        title: 'Vollständiges Profil',
        subtitle: 'Für vollautomatisierte KI-Prozesse und Antragsstellung',
        validationErrorTitle: 'Validierungsfehler:',
        autoSave: 'Profil wird automatisch gespeichert',
        buttons: {
          save: 'Speichern',
          saving: 'Speichern...',
          saved: 'Gespeichert!'
        },
        tabs: {
          personal: 'Persönlich',
          living: 'Wohnen',
          finance: 'Finanzen',
          authorities: 'Behörden',
          privacy: 'Datenschutz'
        },
        sections: {
          personal: {
            title: 'Persönliche Grunddaten',
            firstName: 'Vorname *',
            lastName: 'Nachname *',
            birthDate: 'Geburtsdatum',
            maritalStatus: 'Familienstand',
            employmentStatus: 'Beschäftigungsstatus',
            householdSize: 'Anzahl Personen im Haushalt',
            childrenCount: 'Anzahl Kinder',
            specialCircumstances: 'Besondere Umstände',
            singleParent: 'Alleinerziehend',
            disability: 'Schwerbehinderung',
            careNeed: 'Pflegebedürftig',
            student: 'Student',
            chronicIllness: 'Chronische Krankheit',
            disabilityDegree: 'Grad der Behinderung (%)',
            careLevel: 'Pflegegrad (1-5)',
            options: {
              select: 'Bitte auswählen',
              single: 'Ledig',
              married: 'Verheiratet',
              partnership: 'In Lebenspartnerschaft',
              widowed: 'Verwitwet',
              divorced: 'Geschieden',
              employed: 'Angestellt',
              unemployed: 'Arbeitslos',
              selfEmployed: 'Selbstständig',
              student: 'Student',
              retired: 'Rentner',
              parentalLeave: 'Elternzeit',
              incapacitated: 'Arbeitsunfähig'
            }
          },
          living: {
            title: 'Wohnsituation',
            street: 'Straße',
            houseNumber: 'Hausnummer',
            zip: 'PLZ *',
            city: 'Ort *',
            state: 'Bundesland',
            type: 'Wohnart *',
            area: 'Wohnfläche (m²)',
            rentCold: 'Kaltmiete (€/Monat)',
            utilities: 'Nebenkosten (€/Monat)',
            heating: 'Heizkosten (€/Monat)',
            options: {
              rent: 'Miete',
              ownPaid: 'Eigentum (abbezahlt)',
              ownCredit: 'Eigentum mit Kredit',
              socialHousing: 'Sozialwohnung'
            }
          },
          finance: {
            title: 'Einkommen & Finanzen',
            netIncome: 'Gesamtes monatl. Nettoeinkommen (€) *',
            detailsTitle: 'Einkommensdetails (optional)',
            salaryEmployed: 'Gehalt (angestellt)',
            incomeSelfEmployed: 'Einkommen (selbstständig)',
            pension: 'Rente',
            unemploymentBenefit: 'Arbeitslosengeld',
            childBenefit: 'Kindergeld',
            parentalBenefit: 'Elterngeld',
            alimony: 'Unterhalt',
            otherIncome: 'Sonstige Einkommen',
            assets: 'Gesamtvermögen (€)',
            assetsHint: 'Sparguthaben, Aktien, Immobilienwerte etc.',
            insuranceTitle: 'Krankenversicherung',
            insuranceType: 'Art der Krankenversicherung',
            insuranceName: 'Name der Krankenkasse',
            insurancePlaceholder: 'z.B. AOK, TK, Barmer',
            options: {
              public: 'Gesetzlich',
              private: 'Privat',
              none: 'Keine'
            }
          },
          authorities: {
            title: 'Behördendaten (für Auto-Anträge)',
            info: 'Diese Daten sind optional und werden nur für automatische Antragsstellung benötigt. Alle Daten werden verschlüsselt gespeichert.',
            taxId: 'Steuer-Identifikationsnummer',
            taxIdHint: '11-stellig',
            socialSecurityId: 'Sozialversicherungsnummer',
            socialSecurityIdHint: '12 Zeichen',
            iban: 'IBAN (für Auszahlungen)',
            ibanHint: 'Erforderlich für direkte Auszahlungen von Fördergeldern',
            consentTitle: 'Vollmachten & Einverständnis',
            autoApply: 'Automatische Antragsstellung erlauben',
            autoApplyHint: 'Die KI darf in meinem Namen Anträge bei Behörden stellen',
            authorityPower: 'Behörden-Vollmacht erteilen',
            authorityPowerHint: 'Die Plattform darf Auskünfte bei Behörden einholen'
          }
        },
        validation: {
          required: '{{field}} ist erforderlich',
          zip: 'PLZ muss 5 Ziffern enthalten',
          minLength: '{{field}} muss mindestens {{min}} Zeichen haben',
          number: '{{field}} muss eine Zahl sein',
          min: '{{field}} muss mindestens {{min}} sein',
          max: '{{field}} darf maximal {{max}} sein',
          onlyDisability: 'Nur bei Schwerbehinderung',
          onlyCare: 'Nur bei Pflegebedürftigkeit'
        }
      }
    }
  },
  en: {
    translation: {
      appTitle: 'Service Charge Cracker',
      nav: { onboarding: 'Complete profile' },
      upload: { title: 'Upload', progress: 'Analyzing…' },
      abrechnungen: { title: 'Statements', filter: 'Filter' },
      notifications: { title: 'Notifications', empty: 'No messages' },
      dashboard: {
        greeting: { morning: 'Good Morning', day: 'Good Day', evening: 'Good Evening' },
        hero: { secure: 'Secure & Encrypted', easy: 'made easy', subtitle: 'MiMiCheck analyzes your documents with AI.', ctaUpload: 'New Statement', ctaAntraege: 'My Applications' },
        stats: { total: 'TOTAL', active: 'ACTIVE', potential: 'POTENTIAL', savings: 'Ø Savings/Year', processing: 'Processing', abrechnungen: 'Statements' },
        activity: { title: 'Recent Activity', viewAll: 'View All', emptyTitle: 'No statements yet', emptyText: 'Start now and let us analyze your documents!', createFirst: 'Create First Statement' },
        status: { completed: 'Completed', processing: 'Processing', pending: 'Pending', error: 'Error' },
        tabs: {
          title: 'Your Benefits Cockpit',
          subtitle: 'Fill profile, start AI analysis, find matching applications.',
          overview: 'Overview',
          profile: 'My Profile',
          applications: 'My Applications',
          profileStatus: 'Profile Status',
          ready: 'Ready',
          incomplete: 'Incomplete',
          potentialSavings: 'Potential Savings',
          matchingApps: 'Matching Applications',
          perMonth: 'per month',
          completeProfile: 'Complete Profile',
          completeProfileText: 'Fill out your profile so our AI can find suitable benefits and applications for you.',
          fillNow: 'Fill Now',
          analysisComplete: 'AI Analysis Complete',
          foundPrograms: 'We found {{count}} matching benefits for you!',
          viewApps: 'View Applications',
          reanalyze: 'Reanalyze',
          analyzing: 'AI is analyzing your profile...',
          analyzingWait: 'This may take a moment.',
          profileIncomplete: 'Profile Incomplete',
          fillProfileFirst: 'Please fill out your profile first so we can find matching applications for you.',
          fillProfile: 'Fill Profile',
          yourRecommendations: 'Your Recommendations',
          foundBasedOnProfile: 'Based on your profile, we found {{count}} matching benefits.',
          estimatedPotential: 'Estimated Potential',
          match: 'Match',
          fillWithAI: 'Fill with AI',
          noRecommendations: 'No Recommendations',
          noRecommendationsText: 'Based on your profile, we could not find any matching benefits.',
          analyzeAgain: 'Analyze Again'
        },
        profileWidget: {
          status: 'Profile Status',
          readyForAnalysis: 'Ready for AI Analysis',
          completeYourProfile: 'Complete your profile',
          fields: 'Fields',
          fillSection: 'Fill {{section}}',
          tip: 'Tip: The more complete your profile, the better recommendations!',
          sections: {
            personal: 'Personal Data',
            address: 'Contact & Address',
            income: 'Income',
            living: 'Living Situation',
            children: 'Children',
            bank: 'Bank Details',
            insurance: 'Health Insurance',
            special: 'Special Circumstances',
            partner: 'Partner',
            assets: 'Assets'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Housing Benefit', 'Child Benefit', 'Student Aid', 'Parental Allowance'] },
        flow: {
          step1: { title: 'Upload', subtitle: 'Upload Documents' },
          step2: { title: 'AI Analysis', subtitle: 'Automatic Check' },
          step3: { title: 'Approved', subtitle: 'Receive Money' },
          tagline: { auto: 'Automatic.', secure: 'Secure.', time: 'In 3 Minutes.' }
        }
      },
      chat: {
        initial: 'Hello! I am your Bureaucracy Pilot. 👋\nI can help you with applications, forms, or uploading your statement. What would you like to do?',
        title: 'Bureaucracy Pilot',
        online: 'Online',
        placeholder: 'Ask me something...',
        error: 'Sorry, I am having connection issues right now.',
        configError: '⚠️ Configuration Error: OpenAI API Key is missing or invalid.'
      },
      layout: {
        subtitle: 'Your digital application helper',
        nav: { dashboard: 'Dashboard', upload: 'Upload', antraege: 'Applications', contact: 'Contact', impressum: 'Imprint' },
        profile: { edit: 'Edit Profile', logout: 'Logout', login: 'Login / Register' },
        footer: '© 2025 MiMiCheck. Made with ❤️ in DACH.'
      },
      anspruchsAnalyse: {
        title: 'AI Eligibility Analysis',
        subtitle: 'Let our AI analyze which subsidies you are eligible for',
        cta: {
          ready: 'Ready for your personal analysis?',
          description: 'Our AI analyzes your profile and determines which social benefits and subsidies you are likely eligible for. You will then see concrete amounts and the next steps.',
          button: 'Analyze Eligibility Now',
          analyzing: 'Analyzing Eligibility...'
        },
        results: {
          total: 'Estimated Total Monthly Benefit',
          programs: 'Eligible Programs',
          match: 'Match',
          amount: 'Estimated Monthly Amount',
          reason: 'Reasoning:',
          docs: 'Required Documents:',
          steps: 'Next Steps:',
          download: 'Download Official Form',
          recommendations: 'Recommendations',
          retry: 'Analyze Again',
          pdf: 'Result as PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Housing Benefit',
              reasoning: 'Based on your income and living situation, you have a high chance of receiving housing benefit.',
              requiredDocuments: ['Rental Agreement', 'Income Statements (last 12 months)', 'ID Card'],
              nextSteps: ['Download Form', 'Compile Documents', 'Submit to Housing Office']
            },
            {
              programName: 'Child Benefit',
              reasoning: 'You are eligible for child benefit for your children up to 18 years (possibly longer if in education).',
              requiredDocuments: ['Child\'s Birth Certificate', 'Tax ID', 'Household Certificate'],
              nextSteps: ['Apply at Family Benefits Office', 'Submit Birth Certificate', 'Wait for Approval']
            },
            {
              programName: 'Basic Income (Bürgergeld)',
              reasoning: 'With low income, you can apply for additional basic income support.',
              requiredDocuments: ['ID Card', 'Income Statements', 'Rent Certificate', 'Bank Statements'],
              nextSteps: ['Make Appointment at Jobcenter', 'Fill out Application', 'Submit Documents']
            }
          ],
          recommendations: [
            'Complete your profile for more accurate analyses',
            'Prepare all documents in advance',
            'Use our AI filling aid for faster applications',
            'Submit multiple applications in parallel to maximize your chances'
          ]
        }
      },
      uploadPage: {
        back: 'Back',
        secureTransfer: 'Secure Transfer',
        title: 'Upload',
        titleHighlight: 'Document',
        subtitle: 'We analyze your service charge statement or rental agreement for errors and savings potential.',
        steps: {
          upload: { title: 'Upload Document', description: 'Secure Transfer...' },
          analysis: { title: 'AI Analysis', description: 'Checking Content and Structure...' },
          extraction: { title: 'Data Extraction', description: 'Identifying Cost Items...' },
          legal: { title: 'Legal Check', description: 'Checking against Tenancy Law...' },
          report: { title: 'Create Report', description: 'Finalizing Results...' }
        },
        features: {
          formats: { title: 'All Formats', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'GDPR Compliant', desc: 'Encrypted' },
          ai: { title: 'AI Analysis', desc: 'Instant Result' }
        },
        errors: {
          uploadFailed: 'Upload failed',
          unexpected: 'An unexpected error occurred.'
        }
      },
      antraegePage: {
        title: 'Your Entitlements',
        subtitle: 'Our AI has found these subsidies for you based on your profile.',
        noProfile: {
          title: 'Complete Profile',
          text: 'Complete your profile so our AI can find suitable subsidies for you.',
          button: 'Complete Profile'
        },
        searchPlaceholder: 'Search for applications (e.g. Housing Benefit)...',
        filter: { all: 'All' },
        categories: {
          social: 'Basic Security & Social',
          family: 'Family & Children',
          housing: 'Housing & Rent',
          education: 'Education & Training',
          retirement: 'Pension & Age',
          health: 'Health & Care'
        },
        card: {
          match: 'Match',
          amount: 'Estimated Amount',
          duration: 'Processing Time',
          button: 'Apply Now'
        },
        fallback: {
          wohngeld: { name: 'Housing Benefit', desc: 'State subsidy for rent for low-income households.' },
          kindergeld: { name: 'Child Benefit', desc: 'Monthly support for all families with children.' },
          buergergeld: { name: 'Basic Income', desc: 'Basic security for job seekers to secure their livelihood.' },
          bafoeg: { name: 'Student Aid', desc: 'State support for pupils and students.' }
        }
      },
      contactPage: {
        title: 'Contact & Support',
        subtitle: 'We are here for you. Whether technical questions, feedback or partnerships.',
        liveChat: {
          title: 'Live Chat',
          desc: 'Our AI assistant "Bureaucracy Pilot" is available for you 24/7.',
          button: 'Open Chat'
        },
        contact: {
          title: 'Contact',
          response: 'Response within 24h'
        },
        location: {
          title: 'Location',
          country: 'Germany'
        },
        form: {
          title: 'Write to us',
          name: 'Name',
          namePlaceholder: 'Your Name',
          email: 'Email',
          emailPlaceholder: 'your@email.com',
          message: 'Message',
          messagePlaceholder: 'How can we help you?',
          submit: 'Send Message',
          submitting: 'Sending...',
          successTitle: 'Message sent!',
          successText: 'Thank you for your message. We will get back to you as soon as possible.',
          newMsg: 'Write new message'
        }
      },
      impressumPage: {
        title: 'Legal Notice',
        subtitle: 'Legal information according to § 5 TMG',
        provider: 'Provider Information',
        company: 'Company',
        contact: 'Contact',
        responsible: 'Responsible for Content',
        register: 'Register Entry',
        registerText: 'Entry in the commercial register.\nRegister Court: [Add Court]\nRegister Number: [Add HRB]',
        disclaimer: {
          title: 'Disclaimer',
          contentTitle: 'Liability for Content',
          content: 'The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, and timeliness of the content. The use of AI recommendations is at your own risk.',
          legalTitle: 'Legal Advice',
          legal: 'MiMiCheck does not constitute legal advice. For legal questions, please consult a qualified lawyer or tax advisor.'
        }
      },
      datenschutzPage: {
        title: 'Privacy Policy',
        subtitle: 'According to Art. 13, 14 GDPR • Status: January 2025',
        security: {
          title: 'Your data is safe',
          text: 'We take the protection of your personal data very seriously and treat your data confidentially and in accordance with statutory data protection regulations and this privacy policy.'
        },
        collection: {
          title: 'What data we collect',
          google: { title: 'Google Login:', text: 'Name, email address (for account creation)' },
          profile: { title: 'Profile Data:', text: 'Income, marital status, living situation (for eligibility check)' },
          docs: { title: 'Documents:', text: 'Utility bills (for legal analysis)' }
        },
        ai: {
          title: 'AI & Data Processing',
          purpose: { title: 'Purpose:', text: 'Automatic check of eligibility claims and utility bills' },
          anon: { title: 'Anonymization:', text: 'Data is pseudonymized for AI analysis' },
          noShare: { title: 'No Sharing:', text: 'Your data is not sold to third parties' }
        },
        rights: {
          title: 'Your Rights',
          info: { title: 'Information', text: 'You have the right to information about your stored data.' },
          delete: { title: 'Deletion', text: 'You can request the deletion of your data at any time.' },
          revoke: { title: 'Revocation', text: 'Consents can be revoked at any time.' }
        },
        contact: {
          title: 'Contact Data Protection Officer',
          text: 'For questions about data protection, contact us at:'
        }
      },
      agbPage: {
        title: 'Terms and Conditions',
        subtitle: 'Status: January 2025',
        scope: {
          title: '§ 1 Scope & Subject Matter',
          content1: 'These T&Cs govern the use of the MiMiCheck platform.',
          content2: 'The subject matter is the provision of AI-supported software for analyzing claims for state benefits and checking utility bills.'
        },
        duties: {
          title: '§ 2 User Obligations',
          content1: 'The user is responsible for the accuracy of the data entered. Incorrect information can lead to incorrect results.',
          content2: 'Access data must be kept secret.'
        },
        liability: {
          title: '§ 3 Limitation of Liability',
          content1: 'MiMiCheck assumes no guarantee for the correctness of the analysis results. The platform does not constitute legal or tax advice.',
          content2: 'Liability for slight negligence is excluded.'
        }
      },
      onboardingPage: {
        loading: 'Loading profile...',
        welcome: 'Welcome to MiMiCheck',
        step: 'Step {{current}} of {{total}}',
        error: 'Error saving. Please try again.',
        steps: {
          basics: {
            title: 'Basic Data',
            firstName: 'First Name',
            lastName: 'Last Name',
            birthDate: 'Date of Birth',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} of 3 fields filled'
          },
          living: {
            title: 'Living Situation',
            type: 'Housing Type',
            select: 'Please select',
            rent: '🏠 Rent',
            own: '🏡 Own'
          },
          consent: {
            title: 'Consent',
            text: 'I accept the <1>Privacy Policy</1> and agree to the processing of my data according to GDPR.'
          }
        },
        buttons: {
          back: 'Back',
          next: 'Next',
          finish: 'Finish'
        }
      },
      lebenslagenPage: {
        loading: 'Loading form data...',
        title: 'Complete Profile',
        subtitle: 'For fully automated AI processes and application filing',
        validationErrorTitle: 'Validation Errors:',
        autoSave: 'Profile is saved automatically',
        buttons: {
          save: 'Save',
          saving: 'Saving...',
          saved: 'Saved!'
        },
        tabs: {
          personal: 'Personal',
          living: 'Living',
          finance: 'Finance',
          authorities: 'Authorities',
          privacy: 'Privacy'
        },
        sections: {
          personal: {
            title: 'Personal Basic Data',
            firstName: 'First Name *',
            lastName: 'Last Name *',
            birthDate: 'Date of Birth',
            maritalStatus: 'Marital Status',
            employmentStatus: 'Employment Status',
            householdSize: 'Household Size',
            childrenCount: 'Number of Children',
            specialCircumstances: 'Special Circumstances',
            singleParent: 'Single Parent',
            disability: 'Severe Disability',
            careNeed: 'Need for Care',
            student: 'Student',
            chronicIllness: 'Chronic Illness',
            disabilityDegree: 'Degree of Disability (%)',
            careLevel: 'Care Level (1-5)',
            options: {
              select: 'Please select',
              single: 'Single',
              married: 'Married',
              partnership: 'In Partnership',
              widowed: 'Widowed',
              divorced: 'Divorced',
              employed: 'Employed',
              unemployed: 'Unemployed',
              selfEmployed: 'Self-employed',
              student: 'Student',
              retired: 'Retired',
              parentalLeave: 'Parental Leave',
              incapacitated: 'Incapacitated'
            }
          },
          living: {
            title: 'Living Situation',
            street: 'Street',
            houseNumber: 'House Number',
            zip: 'ZIP *',
            city: 'City *',
            state: 'State',
            type: 'Housing Type *',
            area: 'Living Area (m²)',
            rentCold: 'Cold Rent (€/Month)',
            utilities: 'Utilities (€/Month)',
            heating: 'Heating Costs (€/Month)',
            options: {
              rent: 'Rent',
              ownPaid: 'Own (Paid off)',
              ownCredit: 'Own with Credit',
              socialHousing: 'Social Housing'
            }
          },
          finance: {
            title: 'Income & Finance',
            netIncome: 'Total Monthly Net Income (€) *',
            detailsTitle: 'Income Details (Optional)',
            salaryEmployed: 'Salary (Employed)',
            incomeSelfEmployed: 'Income (Self-employed)',
            pension: 'Pension',
            unemploymentBenefit: 'Unemployment Benefit',
            childBenefit: 'Child Benefit',
            parentalBenefit: 'Parental Benefit',
            alimony: 'Alimony',
            otherIncome: 'Other Income',
            assets: 'Total Assets (€)',
            assetsHint: 'Savings, Stocks, Real Estate etc.',
            insuranceTitle: 'Health Insurance',
            insuranceType: 'Type of Health Insurance',
            insuranceName: 'Name of Health Insurance',
            insurancePlaceholder: 'e.g. AOK, TK, Barmer',
            options: {
              public: 'Public',
              private: 'Private',
              none: 'None'
            }
          },
          authorities: {
            title: 'Authority Data (for Auto-Applications)',
            info: 'This data is optional and only needed for automatic application filing. All data is stored encrypted.',
            taxId: 'Tax Identification Number',
            taxIdHint: '11 digits',
            socialSecurityId: 'Social Security Number',
            socialSecurityIdHint: '12 characters',
            iban: 'IBAN (for payouts)',
            ibanHint: 'Required for direct payouts of funds',
            consentTitle: 'Powers of Attorney & Consent',
            autoApply: 'Allow automatic application filing',
            autoApplyHint: 'The AI may file applications with authorities on my behalf',
            authorityPower: 'Grant authority power of attorney',
            authorityPowerHint: 'The platform may obtain information from authorities'
          }
        },
        validation: {
          required: '{{field}} is required',
          zip: 'ZIP must contain 5 digits',
          minLength: '{{field}} must have at least {{min}} characters',
          number: '{{field}} must be a number',
          min: '{{field}} must be at least {{min}}',
          max: '{{field}} must be at most {{max}}',
          onlyDisability: 'Only with severe disability',
          onlyCare: 'Only with need for care'
        }
      }
    }
  },
  tr: {
    translation: {
      appTitle: 'Aidat Kıran',
      nav: { onboarding: 'Profili tamamla' },
      upload: { title: 'Yükle', progress: 'Analiz ediliyor…' },
      abrechnungen: { title: 'Faturalar', filter: 'Filtre' },
      notifications: { title: 'Bildirimler', empty: 'Mesaj yok' },
      dashboard: {
        greeting: { morning: 'Günaydın', day: 'İyi Günler', evening: 'İyi Akşamlar' },
        hero: { secure: 'Güvenli & Şifreli', easy: 'kolaylaştırıldı', subtitle: 'MiMiCheck belgelerinizi YZ ile analiz eder.', ctaUpload: 'Yeni Fatura', ctaAntraege: 'Başvurularım' },
        stats: { total: 'TOPLAM', active: 'AKTİF', potential: 'POTANSİYEL', savings: 'Ø Tasarruf/Yıl', processing: 'İşleniyor', abrechnungen: 'Faturalar' },
        activity: { title: 'Son Aktiviteler', viewAll: 'Hepsini Gör', emptyTitle: 'Henüz fatura yok', emptyText: 'Şimdi başlayın ve belgelerinizi analiz edelim!', createFirst: 'İlk Faturayı Oluştur' },
        status: { completed: 'Tamamlandı', processing: 'İşleniyor', pending: 'Beklemede', error: 'Hata' },
        tabs: {
          title: 'Destek Kokpitiniz',
          subtitle: 'Profili doldurun, AI analizini başlatın, uygun başvuruları bulun.',
          overview: 'Genel Bakış',
          profile: 'Profilim',
          applications: 'Başvurularım',
          profileStatus: 'Profil Durumu',
          ready: 'Hazır',
          incomplete: 'Eksik',
          potentialSavings: 'Potansiyel Tasarruf',
          matchingApps: 'Uygun Başvurular',
          perMonth: 'aylık',
          completeProfile: 'Profili Tamamla',
          completeProfileText: 'AI\'ın sizin için uygun destekleri bulabilmesi için profilinizi doldurun.',
          fillNow: 'Şimdi Doldur',
          analysisComplete: 'AI Analizi Tamamlandı',
          foundPrograms: 'Sizin için {{count}} uygun destek bulduk!',
          viewApps: 'Başvuruları Gör',
          reanalyze: 'Yeniden Analiz Et',
          analyzing: 'AI profilinizi analiz ediyor...',
          analyzingWait: 'Bu biraz zaman alabilir.',
          profileIncomplete: 'Profil Eksik',
          fillProfileFirst: 'Uygun başvuruları bulabilmemiz için lütfen önce profilinizi doldurun.',
          fillProfile: 'Profili Doldur',
          yourRecommendations: 'Önerileriniz',
          foundBasedOnProfile: 'Profilinize göre {{count}} uygun destek bulduk.',
          estimatedPotential: 'Tahmini Potansiyel',
          match: 'Eşleşme',
          fillWithAI: 'AI ile Doldur',
          noRecommendations: 'Öneri Yok',
          noRecommendationsText: 'Profilinize göre uygun destek bulunamadı.',
          analyzeAgain: 'Tekrar Analiz Et'
        },
        profileWidget: {
          status: 'Profil Durumu',
          readyForAnalysis: 'AI Analizi için Hazır',
          completeYourProfile: 'Profilinizi tamamlayın',
          fields: 'Alan',
          fillSection: '{{section}} doldur',
          tip: 'İpucu: Profiliniz ne kadar eksiksizse, öneriler o kadar iyi!',
          sections: {
            personal: 'Kişisel Bilgiler',
            address: 'İletişim & Adres',
            income: 'Gelir',
            living: 'Yaşam Durumu',
            children: 'Çocuklar',
            bank: 'Banka Bilgileri',
            insurance: 'Sağlık Sigortası',
            special: 'Özel Durumlar',
            partner: 'Partner',
            assets: 'Varlıklar'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Kira Yardımı', 'Çocuk Parası', 'Öğrenci Yardımı', 'Ebeveyn Parası'] },
        flow: {
          step1: { title: 'Yükle', subtitle: 'Belgeleri Yükle' },
          step2: { title: 'YZ Analizi', subtitle: 'Otomatik Kontrol' },
          step3: { title: 'Onaylandı', subtitle: 'Parayı Al' },
          tagline: { auto: 'Otomatik.', secure: 'Güvenli.', time: '3 Dakikada.' }
        }
      },
      chat: {
        initial: 'Merhaba! Ben Bürokrasi Rehberinizim. 👋\nBaşvurular, formlar veya fatura yükleme konusunda size yardımcı olabilirim. Ne yapmak istersiniz?',
        title: 'Bürokrasi Rehberi',
        online: 'Çevrimiçi',
        placeholder: 'Bana bir şey sor...',
        error: 'Üzgünüm, şu anda bağlantı sorunları yaşıyorum.',
        configError: '⚠️ Yapılandırma Hatası: OpenAI API Anahtarı eksik veya geçersiz.'
      },
      layout: {
        subtitle: 'Dijital başvuru yardımcınız',
        nav: { dashboard: 'Panel', upload: 'Yükle', antraege: 'Başvurular', contact: 'İletişim', impressum: 'Künye' },
        profile: { edit: 'Profili Düzenle', logout: 'Çıkış Yap', login: 'Giriş / Kayıt' },
        footer: '© 2025 MiMiCheck. ❤️ ile DACH\'ta yapıldı.'
      },
      anspruchsAnalyse: {
        title: 'YZ Uygunluk Analizi',
        subtitle: 'Hangi yardımlara uygun olduğunuzu YZ analiz etsin',
        cta: {
          ready: 'Kişisel analiziniz için hazır mısınız?',
          description: 'Yapay zekamız profilinizi analiz eder ve hangi sosyal yardımlara ve desteklere uygun olabileceğinizi belirler. Ardından somut tutarları ve sonraki adımları görürsünüz.',
          button: 'Şimdi Uygunluğu Analiz Et',
          analyzing: 'Uygunluk Analiz Ediliyor...'
        },
        results: {
          total: 'Tahmini Toplam Aylık Yardım',
          programs: 'Uygun Programlar',
          match: 'Eşleşme',
          amount: 'Tahmini Aylık Tutar',
          reason: 'Gerekçe:',
          docs: 'Gerekli Belgeler:',
          steps: 'Sonraki Adımlar:',
          download: 'Resmi Formu İndir',
          recommendations: 'Öneriler',
          retry: 'Tekrar Analiz Et',
          pdf: 'Sonucu PDF Olarak İndir'
        },
        fallback: {
          programs: [
            {
              programName: 'Kira Yardımı (Wohngeld)',
              reasoning: 'Geliriniz ve yaşam durumunuza dayanarak, kira yardımı alma şansınız yüksektir.',
              requiredDocuments: ['Kira Sözleşmesi', 'Gelir Belgeleri (son 12 ay)', 'Kimlik Kartı'],
              nextSteps: ['Formu İndir', 'Belgeleri Derle', 'Konut Ofisine Gönder']
            },
            {
              programName: 'Çocuk Parası (Kindergeld)',
              reasoning: '18 yaşına kadar olan çocuklarınız için çocuk parası alma hakkınız vardır (eğitimde ise daha uzun).',
              requiredDocuments: ['Çocuğun Doğum Belgesi', 'Vergi Kimlik No', 'Hane Halkı Belgesi'],
              nextSteps: ['Aile Kasasına Başvur', 'Doğum Belgesini Gönder', 'Onayı Bekle']
            },
            {
              programName: 'Temel Güvence (Bürgergeld)',
              reasoning: 'Düşük gelirle, ek temel güvence başvurusunda bulunabilirsiniz.',
              requiredDocuments: ['Kimlik Kartı', 'Gelir Belgeleri', 'Kira Belgesi', 'Banka Hesap Özetleri'],
              nextSteps: ['İş Merkezinden Randevu Al', 'Başvuruyu Doldur', 'Belgeleri Sun']
            }
          ],
          recommendations: [
            'Daha doğru analizler için profilinizi tamamlayın',
            'Tüm belgeleri önceden hazırlayın',
            'Daha hızlı başvurular için YZ doldurma yardımcımızı kullanın',
            'Şansınızı en üst düzeye çıkarmak için birden fazla başvuru yapın'
          ]
        }
      },
      uploadPage: {
        back: 'Geri',
        secureTransfer: 'Güvenli Transfer',
        title: 'Belge',
        titleHighlight: 'Yükle',
        subtitle: 'Aidat faturanızı veya kira sözleşmenizi hatalar ve tasarruf potansiyeli açısından analiz ediyoruz.',
        steps: {
          upload: { title: 'Belge Yükle', description: 'Güvenli Transfer...' },
          analysis: { title: 'YZ Analizi', description: 'İçerik ve Yapı Kontrol Ediliyor...' },
          extraction: { title: 'Veri Çıkarma', description: 'Maliyet Kalemleri Belirleniyor...' },
          legal: { title: 'Yasal Kontrol', description: 'Kira Hukuku ile Karşılaştırma...' },
          report: { title: 'Rapor Oluştur', description: 'Sonuçlar Finalize Ediliyor...' }
        },
        features: {
          formats: { title: 'Tüm Formatlar', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'KVKK Uyumlu', desc: 'Şifreli' },
          ai: { title: 'YZ Analizi', desc: 'Anında Sonuç' }
        },
        errors: {
          uploadFailed: 'Yükleme başarısız',
          unexpected: 'Beklenmeyen bir hata oluştu.'
        }
      },
      antraegePage: {
        title: 'Haklarınız',
        subtitle: 'Yapay zekamız profilinize dayanarak sizin için bu destekleri buldu.',
        noProfile: {
          title: 'Profili Tamamla',
          text: 'Yapay zekamızın sizin için uygun destekleri bulabilmesi için profilinizi tamamlayın.',
          button: 'Profili Tamamla'
        },
        searchPlaceholder: 'Başvuru ara (örn. Kira Yardımı)...',
        filter: { all: 'Hepsi' },
        categories: {
          social: 'Temel Güvence & Sosyal',
          family: 'Aile & Çocuklar',
          housing: 'Konut & Kira',
          education: 'Eğitim & Öğretim',
          retirement: 'Emeklilik & Yaşlılık',
          health: 'Sağlık & Bakım'
        },
        card: {
          match: 'Eşleşme',
          amount: 'Tahmini Tutar',
          duration: 'İşlem Süresi',
          button: 'Şimdi Başvur'
        },
        fallback: {
          wohngeld: { name: 'Kira Yardımı', desc: 'Düşük gelirli haneler için kira devlet desteği.' },
          kindergeld: { name: 'Çocuk Parası', desc: 'Çocuklu tüm aileler için aylık destek.' },
          buergergeld: { name: 'Temel Güvence', desc: 'İş arayanlar için geçimlerini sağlamak amacıyla temel güvence.' },
          bafoeg: { name: 'Öğrenci Yardımı', desc: 'Öğrenciler ve kursiyerler için devlet desteği.' }
        }
      },
      contactPage: {
        title: 'İletişim & Destek',
        subtitle: 'Sizin için buradayız. Teknik sorular, geri bildirim veya ortaklıklar olsun.',
        liveChat: {
          title: 'Canlı Sohbet',
          desc: 'YZ asistanımız "Bürokrasi Rehberi" 7/24 hizmetinizdedir.',
          button: 'Sohbeti Aç'
        },
        contact: {
          title: 'İletişim',
          response: '24 saat içinde yanıt'
        },
        location: {
          title: 'Konum',
          country: 'Almanya'
        },
        form: {
          title: 'Bize Yazın',
          name: 'İsim',
          namePlaceholder: 'İsminiz',
          email: 'E-posta',
          emailPlaceholder: 'epostaniz@email.com',
          message: 'Mesaj',
          messagePlaceholder: 'Size nasıl yardımcı olabiliriz?',
          submit: 'Mesaj Gönder',
          submitting: 'Gönderiliyor...',
          successTitle: 'Mesaj gönderildi!',
          successText: 'Mesajınız için teşekkürler. En kısa sürede size döneceğiz.',
          newMsg: 'Yeni mesaj yaz'
        }
      },
      impressumPage: {
        title: 'Künye',
        subtitle: '§ 5 TMG uyarınca yasal bilgiler',
        provider: 'Sağlayıcı Bilgileri',
        company: 'Şirket',
        contact: 'İletişim',
        responsible: 'İçerikten Sorumlu',
        register: 'Sicil Kaydı',
        registerText: 'Ticaret siciline kayıt.\nSicil Mahkemesi: [Mahkeme Ekle]\nSicil Numarası: [HRB Ekle]',
        disclaimer: {
          title: 'Sorumluluk Reddi',
          contentTitle: 'İçerik Sorumluluğu',
          content: 'Sayfalarımızın içeriği büyük bir özenle hazırlanmıştır. Ancak, içeriğin doğruluğu, eksiksizliği ve güncelliği konusunda garanti veremeyiz. YZ önerilerinin kullanımı kendi sorumluluğunuzdadır.',
          legalTitle: 'Yasal Tavsiye',
          legal: 'MiMiCheck yasal tavsiye niteliği taşımaz. Yasal sorularınız için lütfen yetkili bir avukata veya vergi danışmanına başvurun.'
        }
      },
      datenschutzPage: {
        title: 'Gizlilik Politikası',
        subtitle: 'Art. 13, 14 GDPR uyarınca • Durum: Ocak 2025',
        security: {
          title: 'Verileriniz güvende',
          text: 'Kişisel verilerinizin korunmasını çok ciddiye alıyoruz ve verilerinizi gizli tutuyor, yasal veri koruma düzenlemelerine ve bu gizlilik politikasına uygun olarak işliyoruz.'
        },
        collection: {
          title: 'Hangi verileri topluyoruz',
          google: { title: 'Google Girişi:', text: 'İsim, e-posta adresi (hesap oluşturma için)' },
          profile: { title: 'Profil Verileri:', text: 'Gelir, medeni durum, yaşam durumu (uygunluk kontrolü için)' },
          docs: { title: 'Belgeler:', text: 'Yan gider faturaları (yasal analiz için)' }
        },
        ai: {
          title: 'YZ & Veri İşleme',
          purpose: { title: 'Amaç:', text: 'Uygunluk taleplerinin ve yan gider faturalarının otomatik kontrolü' },
          anon: { title: 'Anonimleştirme:', text: 'Veriler YZ analizi için takma adlaştırılır' },
          noShare: { title: 'Paylaşım Yok:', text: 'Verileriniz üçüncü şahıslara satılmaz' }
        },
        rights: {
          title: 'Haklarınız',
          info: { title: 'Bilgi', text: 'Saklanan verileriniz hakkında bilgi alma hakkına sahipsiniz.' },
          delete: { title: 'Silme', text: 'Verilerinizin silinmesini her zaman talep edebilirsiniz.' },
          revoke: { title: 'İptal', text: 'Onaylar her zaman iptal edilebilir.' }
        },
        contact: {
          title: 'Veri Koruma Görevlisi ile İletişim',
          text: 'Veri koruma ile ilgili sorularınız için bize ulaşın:'
        }
      },
      agbPage: {
        title: 'Genel İşletme Şartları',
        subtitle: 'Durum: Ocak 2025',
        scope: {
          title: '§ 1 Kapsam & Sözleşme Konusu',
          content1: 'Bu GİŞ, MiMiCheck platformunun kullanımını düzenler.',
          content2: 'Konu, devlet yardımları taleplerinin analizi ve yan gider faturalarının kontrolü için YZ destekli bir yazılımın sağlanmasıdır.'
        },
        duties: {
          title: '§ 2 Kullanıcının Yükümlülükleri',
          content1: 'Kullanıcı, girilen verilerin doğruluğundan sorumludur. Yanlış bilgiler hatalı sonuçlara yol açabilir.',
          content2: 'Erişim verileri gizli tutulmalıdır.'
        },
        liability: {
          title: '§ 3 Sorumluluk Sınırlaması',
          content1: 'MiMiCheck, analiz sonuçlarının doğruluğu konusunda garanti vermez. Platform yasal veya vergi tavsiyesi niteliği taşımaz.',
          content2: 'Hafif ihmal sorumluluğu hariçtir.'
        }
      },
      onboardingPage: {
        loading: 'Profil yükleniyor...',
        welcome: 'MiMiCheck\'e Hoş Geldiniz',
        step: 'Adım {{current}} / {{total}}',
        error: 'Kaydetme hatası. Lütfen tekrar deneyin.',
        steps: {
          basics: {
            title: 'Temel Veriler',
            firstName: 'Ad',
            lastName: 'Soyad',
            birthDate: 'Doğum Tarihi',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} / 3 alan dolduruldu'
          },
          living: {
            title: 'Yaşam Durumu',
            type: 'Konut Tipi',
            select: 'Lütfen seçin',
            rent: '🏠 Kira',
            own: '🏡 Mülk'
          },
          consent: {
            title: 'Onay',
            text: '<1>Gizlilik Politikası</1>\'nı kabul ediyorum ve verilerimin GDPR uyarınca işlenmesine izin veriyorum.'
          }
        },
        buttons: {
          back: 'Geri',
          next: 'İleri',
          finish: 'Tamamla'
        }
      },
      lebenslagenPage: {
        loading: 'Form verileri yükleniyor...',
        title: 'Tam Profil',
        subtitle: 'Tam otomatik yapay zeka süreçleri ve başvuru için',
        validationErrorTitle: 'Doğrulama Hataları:',
        autoSave: 'Profil otomatik olarak kaydedilir',
        buttons: {
          save: 'Kaydet',
          saving: 'Kaydediliyor...',
          saved: 'Kaydedildi!'
        },
        tabs: {
          personal: 'Kişisel',
          living: 'Konut',
          finance: 'Finans',
          authorities: 'Resmi Kurumlar',
          privacy: 'Gizlilik'
        },
        sections: {
          personal: {
            title: 'Kişisel Temel Veriler',
            firstName: 'Ad *',
            lastName: 'Soyad *',
            birthDate: 'Doğum Tarihi',
            maritalStatus: 'Medeni Durum',
            employmentStatus: 'Çalışma Durumu',
            householdSize: 'Hane Halkı Sayısı',
            childrenCount: 'Çocuk Sayısı',
            specialCircumstances: 'Özel Durumlar',
            singleParent: 'Tek Ebeveyn',
            disability: 'Ağır Engellilik',
            careNeed: 'Bakıma Muhtaç',
            student: 'Öğrenci',
            chronicIllness: 'Kronik Hastalık',
            disabilityDegree: 'Engel Derecesi (%)',
            careLevel: 'Bakım Derecesi (1-5)',
            options: {
              select: 'Lütfen seçin',
              single: 'Bekar',
              married: 'Evli',
              partnership: 'Birliktelik',
              widowed: 'Dul',
              divorced: 'Boşanmış',
              employed: 'Çalışan',
              unemployed: 'İşsiz',
              selfEmployed: 'Serbest Meslek',
              student: 'Öğrenci',
              retired: 'Emekli',
              parentalLeave: 'Ebeveyn İzni',
              incapacitated: 'Çalışamaz'
            }
          },
          living: {
            title: 'Konut Durumu',
            street: 'Cadde/Sokak',
            houseNumber: 'Kapı No',
            zip: 'Posta Kodu *',
            city: 'Şehir *',
            state: 'Eyalet',
            type: 'Konut Tipi *',
            area: 'Yaşam Alanı (m²)',
            rentCold: 'Kira (€/Ay)',
            utilities: 'Yan Giderler (€/Ay)',
            heating: 'Isınma Giderleri (€/Ay)',
            options: {
              rent: 'Kira',
              ownPaid: 'Mülk (Ödenmiş)',
              ownCredit: 'Kredili Mülk',
              socialHousing: 'Sosyal Konut'
            }
          },
          finance: {
            title: 'Gelir & Finans',
            netIncome: 'Toplam Aylık Net Gelir (€) *',
            detailsTitle: 'Gelir Detayları (İsteğe Bağlı)',
            salaryEmployed: 'Maaş (Çalışan)',
            incomeSelfEmployed: 'Gelir (Serbest)',
            pension: 'Emeklilik',
            unemploymentBenefit: 'İşsizlik Maaşı',
            childBenefit: 'Çocuk Parası',
            parentalBenefit: 'Ebeveyn Parası',
            alimony: 'Nafaka',
            otherIncome: 'Diğer Gelirler',
            assets: 'Toplam Varlıklar (€)',
            assetsHint: 'Tasarruflar, Hisseler, Gayrimenkul vb.',
            insuranceTitle: 'Sağlık Sigortası',
            insuranceType: 'Sigorta Türü',
            insuranceName: 'Sigorta Adı',
            insurancePlaceholder: 'örn. AOK, TK',
            options: {
              public: 'Kamu',
              private: 'Özel',
              none: 'Yok'
            }
          },
          authorities: {
            title: 'Resmi Kurum Verileri (Oto-Başvuru)',
            info: 'Bu veriler isteğe bağlıdır ve sadece otomatik başvuru için gereklidir. Tüm veriler şifrelenmiş olarak saklanır.',
            taxId: 'Vergi Kimlik Numarası',
            taxIdHint: '11 haneli',
            socialSecurityId: 'Sosyal Güvenlik Numarası',
            socialSecurityIdHint: '12 karakter',
            iban: 'IBAN (ödemeler için)',
            ibanHint: 'Doğrudan ödemeler için gereklidir',
            consentTitle: 'Vekaletnameler & Onay',
            autoApply: 'Otomatik başvuruya izin ver',
            autoApplyHint: 'Yapay zeka benim adıma başvuruda bulunabilir',
            authorityPower: 'Resmi kurum vekaleti ver',
            authorityPowerHint: 'Platform resmi kurumlardan bilgi alabilir'
          }
        },
        validation: {
          required: '{{field}} gereklidir',
          zip: 'Posta kodu 5 haneli olmalıdır',
          minLength: '{{field}} en az {{min}} karakter olmalıdır',
          number: '{{field}} bir sayı olmalıdır',
          min: '{{field}} en az {{min}} olmalıdır',
          max: '{{field}} en fazla {{max}} olmalıdır',
          onlyDisability: 'Sadece ağır engellilik durumunda',
          onlyCare: 'Sadece bakıma muhtaçlık durumunda'
        }
      }
    }
  },
  es: {
    translation: {
      appTitle: 'Rompe Gastos',
      nav: { onboarding: 'Completar perfil' },
      upload: { title: 'Subir', progress: 'Analizando…' },
      abrechnungen: { title: 'Facturas', filter: 'Filtro' },
      notifications: { title: 'Notificaciones', empty: 'Sin mensajes' },
      dashboard: {
        greeting: { morning: 'Buenos Días', day: 'Buenas Tardes', evening: 'Buenas Noches' },
        hero: { secure: 'Seguro & Encriptado', easy: 'fácil', subtitle: 'MiMiCheck analiza tus documentos con IA.', ctaUpload: 'Nueva Factura', ctaAntraege: 'Mis Solicitudes' },
        stats: { total: 'TOTAL', active: 'ACTIVO', potential: 'POTENCIAL', savings: 'Ø Ahorro/Año', processing: 'Procesando', abrechnungen: 'Facturas' },
        activity: { title: 'Actividad Reciente', viewAll: 'Ver Todo', emptyTitle: 'Aún no hay facturas', emptyText: '¡Empieza ahora y déjanos analizar tus documentos!', createFirst: 'Crear Primera Factura' },
        status: { completed: 'Completado', processing: 'Procesando', pending: 'Pendiente', error: 'Error' },
        tabs: {
          title: 'Tu Panel de Beneficios',
          subtitle: 'Completa tu perfil, inicia el análisis de IA, encuentra solicitudes adecuadas.',
          overview: 'Resumen',
          profile: 'Mi Perfil',
          applications: 'Mis Solicitudes',
          profileStatus: 'Estado del Perfil',
          ready: 'Listo',
          incomplete: 'Incompleto',
          potentialSavings: 'Ahorro Potencial',
          matchingApps: 'Solicitudes Coincidentes',
          perMonth: 'por mes',
          completeProfile: 'Completar Perfil',
          completeProfileText: 'Completa tu perfil para que nuestra IA pueda encontrar beneficios y solicitudes adecuadas para ti.',
          fillNow: 'Completar Ahora',
          analysisComplete: 'Análisis de IA Completado',
          foundPrograms: '¡Encontramos {{count}} beneficios adecuados para ti!',
          viewApps: 'Ver Solicitudes',
          reanalyze: 'Reanalizar',
          analyzing: 'La IA está analizando tu perfil...',
          analyzingWait: 'Esto puede tardar un momento.',
          profileIncomplete: 'Perfil Incompleto',
          fillProfileFirst: 'Por favor, completa primero tu perfil para que podamos encontrar solicitudes adecuadas para ti.',
          fillProfile: 'Completar Perfil',
          yourRecommendations: 'Tus Recomendaciones',
          foundBasedOnProfile: 'Basado en tu perfil, encontramos {{count}} beneficios adecuados.',
          estimatedPotential: 'Potencial Estimado',
          match: 'Coincidencia',
          fillWithAI: 'Completar con IA',
          noRecommendations: 'Sin Recomendaciones',
          noRecommendationsText: 'Basado en tu perfil, no pudimos encontrar beneficios adecuados.',
          analyzeAgain: 'Analizar de Nuevo'
        },
        profileWidget: {
          status: 'Estado del Perfil',
          readyForAnalysis: 'Listo para Análisis de IA',
          completeYourProfile: 'Completa tu perfil',
          fields: 'Campos',
          fillSection: 'Completar {{section}}',
          tip: '¡Consejo: Cuanto más completo tu perfil, mejores recomendaciones!',
          sections: {
            personal: 'Datos Personales',
            address: 'Contacto y Dirección',
            income: 'Ingresos',
            living: 'Situación de Vivienda',
            children: 'Hijos',
            bank: 'Datos Bancarios',
            insurance: 'Seguro de Salud',
            special: 'Circunstancias Especiales',
            partner: 'Pareja',
            assets: 'Patrimonio'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Ayuda Vivienda', 'Subsidio Infantil', 'Beca Estudiantil', 'Subsidio Parental'] },
        flow: {
          step1: { title: 'Subir', subtitle: 'Subir Documentos' },
          step2: { title: 'Análisis IA', subtitle: 'Chequeo Automático' },
          step3: { title: 'Aprobado', subtitle: 'Recibir Dinero' },
          tagline: { auto: 'Automático.', secure: 'Seguro.', time: 'En 3 Minutos.' }
        }
      },
      chat: {
        initial: '¡Hola! Soy tu Piloto de Burocracia. 👋\nPuedo ayudarte con solicitudes, formularios o subiendo tu factura. ¿Qué te gustaría hacer?',
        title: 'Piloto de Burocracia',
        online: 'En línea',
        placeholder: 'Pregúntame algo...',
        error: 'Lo siento, tengo problemas de conexión en este momento.',
        configError: '⚠️ Error de Configuración: Falta la clave API de OpenAI o es inválida.'
      },
      layout: {
        subtitle: 'Tu asistente digital de solicitudes',
        nav: { dashboard: 'Panel', upload: 'Subir', antraege: 'Solicitudes', contact: 'Contacto', impressum: 'Aviso Legal' },
        profile: { edit: 'Editar Perfil', logout: 'Cerrar Sesión', login: 'Iniciar Sesión / Registro' },
        footer: '© 2025 MiMiCheck. Hecho con ❤️ en DACH.'
      },
      anspruchsAnalyse: {
        title: 'Análisis de Elegibilidad IA',
        subtitle: 'Deja que nuestra IA analice a qué subsidios tienes derecho',
        cta: {
          ready: '¿Listo para tu análisis personal?',
          description: 'Nuestra IA analiza tu perfil y determina a qué beneficios sociales y subsidios probablemente tengas derecho. Verás montos concretos y los siguientes pasos.',
          button: 'Analizar Elegibilidad Ahora',
          analyzing: 'Analizando Elegibilidad...'
        },
        results: {
          total: 'Beneficio Mensual Total Estimado',
          programs: 'Programas Elegibles',
          match: 'Coincidencia',
          amount: 'Monto Mensual Estimado',
          reason: 'Razonamiento:',
          docs: 'Documentos Requeridos:',
          steps: 'Siguientes Pasos:',
          download: 'Descargar Formulario Oficial',
          recommendations: 'Recomendaciones',
          retry: 'Analizar de Nuevo',
          pdf: 'Resultado como PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Ayuda de Vivienda (Wohngeld)',
              reasoning: 'Basado en tus ingresos y situación de vivienda, tienes altas posibilidades de recibir ayuda de vivienda.',
              requiredDocuments: ['Contrato de Alquiler', 'Declaraciones de Ingresos (últimos 12 meses)', 'DNI'],
              nextSteps: ['Descargar Formulario', 'Recopilar Documentos', 'Enviar a la Oficina de Vivienda']
            },
            {
              programName: 'Subsidio Infantil (Kindergeld)',
              reasoning: 'Tienes derecho al subsidio infantil para tus hijos hasta los 18 años (posiblemente más tiempo si estudian).',
              requiredDocuments: ['Certificado de Nacimiento del Niño', 'ID Fiscal', 'Certificado de Hogar'],
              nextSteps: ['Solicitar en la Caja de Familia', 'Enviar Certificado de Nacimiento', 'Esperar Aprobación']
            },
            {
              programName: 'Ingreso Básico (Bürgergeld)',
              reasoning: 'Con bajos ingresos, puedes solicitar apoyo de ingreso básico adicional.',
              requiredDocuments: ['DNI', 'Declaraciones de Ingresos', 'Certificado de Alquiler', 'Extractos Bancarios'],
              nextSteps: ['Pedir Cita en el Jobcenter', 'Rellenar Solicitud', 'Presentar Documentos']
            }
          ],
          recommendations: [
            'Completa tu perfil para análisis más precisos',
            'Prepara todos los documentos con antelación',
            'Usa nuestra ayuda de llenado por IA para solicitudes más rápidas',
            'Presenta múltiples solicitudes en paralelo para maximizar tus posibilidades'
          ]
        }
      },
      uploadPage: {
        back: 'Atrás',
        secureTransfer: 'Transferencia Segura',
        title: 'Subir',
        titleHighlight: 'Documento',
        subtitle: 'Analizamos tu factura de gastos o contrato de alquiler en busca de errores y potencial de ahorro.',
        steps: {
          upload: { title: 'Subir Documento', description: 'Transferencia Segura...' },
          analysis: { title: 'Análisis IA', description: 'Comprobando Contenido y Estructura...' },
          extraction: { title: 'Extracción de Datos', description: 'Identificando Partidas de Costos...' },
          legal: { title: 'Chequeo Legal', description: 'Comparación con Ley de Arrendamiento...' },
          report: { title: 'Crear Informe', description: 'Finalizando Resultados...' }
        },
        features: {
          formats: { title: 'Todos los Formatos', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'Conforme RGPD', desc: 'Encriptado' },
          ai: { title: 'Análisis IA', desc: 'Resultado Instantáneo' }
        },
        errors: {
          uploadFailed: 'Carga fallida',
          unexpected: 'Ocurrió un error inesperado.'
        }
      },
      antraegePage: {
        title: 'Tus Derechos',
        subtitle: 'Nuestra IA ha encontrado estos subsidios para ti basándose en tu perfil.',
        noProfile: {
          title: 'Completar Perfil',
          text: 'Completa tu perfil para que nuestra IA pueda encontrar subsidios adecuados para ti.',
          button: 'Completar Perfil'
        },
        searchPlaceholder: 'Buscar solicitudes (ej. Ayuda de Vivienda)...',
        filter: { all: 'Todo' },
        categories: {
          social: 'Seguridad Básica & Social',
          family: 'Familia & Niños',
          housing: 'Vivienda & Alquiler',
          education: 'Educación & Formación',
          retirement: 'Pensión & Vejez',
          health: 'Salud & Cuidado'
        },
        card: {
          match: 'Coincidencia',
          amount: 'Monto Estimado',
          duration: 'Tiempo de Procesamiento',
          button: 'Solicitar Ahora'
        },
        fallback: {
          wohngeld: { name: 'Ayuda de Vivienda', desc: 'Subsidio estatal para el alquiler para hogares de bajos ingresos.' },
          kindergeld: { name: 'Subsidio Infantil', desc: 'Apoyo mensual para todas las familias con niños.' },
          buergergeld: { name: 'Ingreso Básico', desc: 'Seguridad básica para solicitantes de empleo para asegurar su sustento.' },
          bafoeg: { name: 'Beca Estudiantil', desc: 'Apoyo estatal para alumnos y estudiantes.' }
        }
      },
      contactPage: {
        title: 'Contacto & Soporte',
        subtitle: 'Estamos aquí para ti. Ya sean preguntas técnicas, comentarios o asociaciones.',
        liveChat: {
          title: 'Chat en Vivo',
          desc: 'Nuestro asistente de IA "Piloto de Burocracia" está disponible 24/7.',
          button: 'Abrir Chat'
        },
        contact: {
          title: 'Contacto',
          response: 'Respuesta en 24h'
        },
        location: {
          title: 'Ubicación',
          country: 'Alemania'
        },
        form: {
          title: 'Escríbenos',
          name: 'Nombre',
          namePlaceholder: 'Tu Nombre',
          email: 'Correo',
          emailPlaceholder: 'tu@email.com',
          message: 'Mensaje',
          messagePlaceholder: '¿Cómo podemos ayudarte?',
          submit: 'Enviar Mensaje',
          submitting: 'Enviando...',
          successTitle: '¡Mensaje enviado!',
          successText: 'Gracias por tu mensaje. Te responderemos lo antes posible.',
          newMsg: 'Escribir nuevo mensaje'
        }
      },
      impressumPage: {
        title: 'Aviso Legal',
        subtitle: 'Información legal según § 5 TMG',
        provider: 'Información del Proveedor',
        company: 'Empresa',
        contact: 'Contacto',
        responsible: 'Responsable del Contenido',
        register: 'Registro',
        registerText: 'Inscripción en el registro mercantil.\nJuzgado de Registro: [Añadir Juzgado]\nNúmero de Registro: [Añadir HRB]',
        disclaimer: {
          title: 'Exención de Responsabilidad',
          contentTitle: 'Responsabilidad por Contenidos',
          content: 'Los contenidos de nuestras páginas han sido creados con el mayor cuidado. Sin embargo, no podemos garantizar la exactitud, integridad y actualidad de los contenidos. El uso de las recomendaciones de IA es bajo su propio riesgo.',
          legalTitle: 'Asesoramiento Legal',
          legal: 'MiMiCheck no constituye asesoramiento legal. Para preguntas legales, consulte a un abogado o asesor fiscal calificado.'
        }
      },
      datenschutzPage: {
        title: 'Política de Privacidad',
        subtitle: 'Según Art. 13, 14 RGPD • Estado: Enero 2025',
        security: {
          title: 'Sus datos están seguros',
          text: 'Tomamos muy en serio la protección de sus datos personales y tratamos sus datos de forma confidencial y de acuerdo con las normas legales de protección de datos y esta política de privacidad.'
        },
        collection: {
          title: 'Qué datos recopilamos',
          google: { title: 'Inicio de sesión con Google:', text: 'Nombre, dirección de correo electrónico (para creación de cuenta)' },
          profile: { title: 'Datos de Perfil:', text: 'Ingresos, estado civil, situación de vivienda (para verificación de elegibilidad)' },
          docs: { title: 'Documentos:', text: 'Facturas de servicios (para análisis legal)' }
        },
        ai: {
          title: 'IA y Procesamiento de Datos',
          purpose: { title: 'Propósito:', Text: 'Verificación automática de reclamaciones de elegibilidad y facturas de servicios' },
          anon: { title: 'Anonimización:', Text: 'Los datos se seudonimizan para el análisis de IA' },
          noShare: { title: 'Sin Compartir:', Text: 'Sus datos no se venden a terceros' }
        },
        rights: {
          title: 'Sus Derechos',
          info: { title: 'Información', text: 'Tiene derecho a información sobre sus datos almacenados.' },
          delete: { title: 'Eliminación', text: 'Puede solicitar la eliminación de sus datos en cualquier momento.' },
          revoke: { title: 'Revocación', text: 'Los consentimientos pueden ser revocados en cualquier momento.' }
        },
        contact: {
          title: 'Contacto Oficial de Protección de Datos',
          text: 'Para preguntas sobre protección de datos, contáctenos en:'
        }
      },
      agbPage: {
        title: 'Términos y Condiciones Generales',
        subtitle: 'Estado: Enero 2025',
        scope: {
          title: '§ 1 Ámbito y Objeto del Contrato',
          content1: 'Estos T&C regulan el uso de la plataforma MiMiCheck.',
          content2: 'El objeto es la provisión de software asistido por IA para analizar reclamaciones de beneficios estatales y verificar facturas de servicios.'
        },
        duties: {
          title: '§ 2 Obligaciones del Usuario',
          content1: 'El usuario es responsable de la exactitud de los datos introducidos. La información incorrecta puede llevar a resultados incorrectos.',
          content2: 'Los datos de acceso deben mantenerse en secreto.'
        },
        liability: {
          title: '§ 3 Limitación de Responsabilidad',
          content1: 'MiMiCheck no asume ninguna garantía por la exactitud de los resultados del análisis. La plataforma no constituye asesoramiento legal o fiscal.',
          content2: 'Se excluye la responsabilidad por negligencia leve.'
        }
      },
      onboardingPage: {
        loading: 'Cargando perfil...',
        welcome: 'Bienvenido a MiMiCheck',
        step: 'Paso {{current}} de {{total}}',
        error: 'Error al guardar. Inténtelo de nuevo.',
        steps: {
          basics: {
            title: 'Datos Básicos',
            firstName: 'Nombre',
            lastName: 'Apellido',
            birthDate: 'Fecha de Nacimiento',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} de 3 campos completados'
          },
          living: {
            title: 'Situación de Vivienda',
            type: 'Tipo de Vivienda',
            select: 'Por favor seleccione',
            rent: '🏠 Alquiler',
            own: '🏡 Propiedad'
          },
          consent: {
            title: 'Consentimiento',
            text: 'Acepto la <1>Política de Privacidad</1> y doy mi consentimiento para el procesamiento de mis datos según el RGPD.'
          }
        },
        buttons: {
          back: 'Atrás',
          next: 'Siguiente',
          finish: 'Finalizar'
        }
      },
      lebenslagenPage: {
        loading: 'Cargando datos del formulario...',
        title: 'Perfil Completo',
        subtitle: 'Para procesos de IA totalmente automatizados y solicitudes',
        validationErrorTitle: 'Errores de validación:',
        autoSave: 'El perfil se guarda automáticamente',
        buttons: {
          save: 'Guardar',
          saving: 'Guardando...',
          saved: '¡Guardado!'
        },
        tabs: {
          personal: 'Personal',
          living: 'Vivienda',
          finance: 'Finanzas',
          authorities: 'Autoridades',
          privacy: 'Privacidad'
        },
        sections: {
          personal: {
            title: 'Datos Personales Básicos',
            firstName: 'Nombre *',
            lastName: 'Apellido *',
            birthDate: 'Fecha de Nacimiento',
            maritalStatus: 'Estado Civil',
            employmentStatus: 'Estado Laboral',
            householdSize: 'Tamaño del Hogar',
            childrenCount: 'Número de Hijos',
            specialCircumstances: 'Circunstancias Especiales',
            singleParent: 'Monoparental',
            disability: 'Discapacidad Grave',
            careNeed: 'Necesidad de Cuidados',
            student: 'Estudiante',
            chronicIllness: 'Enfermedad Crónica',
            disabilityDegree: 'Grado de Discapacidad (%)',
            careLevel: 'Nivel de Cuidados (1-5)',
            options: {
              select: 'Por favor seleccione',
              single: 'Soltero/a',
              married: 'Casado/a',
              partnership: 'Pareja de Hecho',
              widowed: 'Viudo/a',
              divorced: 'Divorciado/a',
              employed: 'Empleado',
              unemployed: 'Desempleado',
              selfEmployed: 'Autónomo',
              student: 'Estudiante',
              retired: 'Jubilado',
              parentalLeave: 'Baja Parental',
              incapacitated: 'Incapacitado'
            }
          },
          living: {
            title: 'Situación de Vivienda',
            street: 'Calle',
            houseNumber: 'Número',
            zip: 'CP *',
            city: 'Ciudad *',
            state: 'Estado',
            type: 'Tipo de Vivienda *',
            area: 'Superficie (m²)',
            rentCold: 'Alquiler Frío (€/Mes)',
            utilities: 'Gastos (€/Mes)',
            heating: 'Calefacción (€/Mes)',
            options: {
              rent: 'Alquiler',
              ownPaid: 'Propiedad (Pagada)',
              ownCredit: 'Propiedad con Crédito',
              socialHousing: 'Vivienda Social'
            }
          },
          finance: {
            title: 'Ingresos y Finanzas',
            netIncome: 'Ingreso Neto Mensual Total (€) *',
            detailsTitle: 'Detalles de Ingresos (Opcional)',
            salaryEmployed: 'Salario (Empleado)',
            incomeSelfEmployed: 'Ingreso (Autónomo)',
            pension: 'Pensión',
            unemploymentBenefit: 'Subsidio de Desempleo',
            childBenefit: 'Subsidio Familiar',
            parentalBenefit: 'Subsidio Parental',
            alimony: 'Pensión Alimenticia',
            otherIncome: 'Otros Ingresos',
            assets: 'Patrimonio Total (€)',
            assetsHint: 'Ahorros, Acciones, Inmuebles, etc.',
            insuranceTitle: 'Seguro Médico',
            insuranceType: 'Tipo de Seguro',
            insuranceName: 'Nombre del Seguro',
            insurancePlaceholder: 'ej. AOK, TK',
            options: {
              public: 'Público',
              private: 'Privado',
              none: 'Ninguno'
            }
          },
          authorities: {
            title: 'Datos de Autoridades (Auto-Solicitud)',
            info: 'Estos datos son opcionales y solo necesarios para la solicitud automática. Todos los datos se almacenan cifrados.',
            taxId: 'Número de Identificación Fiscal',
            taxIdHint: '11 dígitos',
            socialSecurityId: 'Número de Seguridad Social',
            socialSecurityIdHint: '12 caracteres',
            iban: 'IBAN (para pagos)',
            ibanHint: 'Necesario para pagos directos de fondos',
            consentTitle: 'Poderes y Consentimiento',
            autoApply: 'Permitir solicitud automática',
            autoApplyHint: 'La IA puede presentar solicitudes en mi nombre',
            authorityPower: 'Otorgar poder a autoridades',
            authorityPowerHint: 'La plataforma puede obtener información de autoridades'
          }
        },
        validation: {
          required: '{{field}} es obligatorio',
          zip: 'El CP debe tener 5 dígitos',
          minLength: '{{field}} debe tener al menos {{min}} caracteres',
          number: '{{field}} debe ser un número',
          min: '{{field}} debe ser al menos {{min}}',
          max: '{{field}} debe ser como máximo {{max}}',
          onlyDisability: 'Solo con discapacidad grave',
          onlyCare: 'Solo con necesidad de cuidados'
        }
      }
    }
  },
  pt: {
    translation: {
      appTitle: 'Quebra Despesas',
      nav: { onboarding: 'Completar perfil' },
      upload: { title: 'Carregar', progress: 'Analisando…' },
      abrechnungen: { title: 'Faturas', filter: 'Filtro' },
      notifications: { title: 'Notificações', empty: 'Sem mensagens' },
      dashboard: {
        greeting: { morning: 'Bom Dia', day: 'Boa Tarde', evening: 'Boa Noite' },
        hero: { secure: 'Seguro & Criptografado', easy: 'fácil', subtitle: 'MiMiCheck analisa seus documentos com IA.', ctaUpload: 'Nova Fatura', ctaAntraege: 'Minhas Solicitações' },
        stats: { total: 'TOTAL', active: 'ATIVO', potential: 'POTENCIAL', savings: 'Ø Economia/Ano', processing: 'Processando', abrechnungen: 'Faturas' },
        activity: { title: 'Atividade Recente', viewAll: 'Ver Tudo', emptyTitle: 'Ainda não há faturas', emptyText: 'Comece agora e deixe-nos analisar seus documentos!', createFirst: 'Criar Primeira Fatura' },
        status: { completed: 'Concluído', processing: 'Processando', pending: 'Pendente', error: 'Erro' },
        tabs: {
          title: 'Seu Painel de Benefícios',
          subtitle: 'Preencha o perfil, inicie a análise de IA, encontre solicitações adequadas.',
          overview: 'Visão Geral',
          profile: 'Meu Perfil',
          applications: 'Minhas Solicitações',
          profileStatus: 'Status do Perfil',
          ready: 'Pronto',
          incomplete: 'Incompleto',
          potentialSavings: 'Economia Potencial',
          matchingApps: 'Solicitações Correspondentes',
          perMonth: 'por mês',
          completeProfile: 'Completar Perfil',
          completeProfileText: 'Preencha seu perfil para que nossa IA possa encontrar benefícios e solicitações adequadas para você.',
          fillNow: 'Preencher Agora',
          analysisComplete: 'Análise de IA Concluída',
          foundPrograms: 'Encontramos {{count}} benefícios adequados para você!',
          viewApps: 'Ver Solicitações',
          reanalyze: 'Reanalisar',
          analyzing: 'A IA está analisando seu perfil...',
          analyzingWait: 'Isso pode levar um momento.',
          profileIncomplete: 'Perfil Incompleto',
          fillProfileFirst: 'Por favor, preencha primeiro seu perfil para que possamos encontrar solicitações adequadas para você.',
          fillProfile: 'Preencher Perfil',
          yourRecommendations: 'Suas Recomendações',
          foundBasedOnProfile: 'Com base no seu perfil, encontramos {{count}} benefícios adequados.',
          estimatedPotential: 'Potencial Estimado',
          match: 'Correspondência',
          fillWithAI: 'Preencher com IA',
          noRecommendations: 'Sem Recomendações',
          noRecommendationsText: 'Com base no seu perfil, não encontramos benefícios adequados.',
          analyzeAgain: 'Analisar Novamente'
        },
        profileWidget: {
          status: 'Status do Perfil',
          readyForAnalysis: 'Pronto para Análise de IA',
          completeYourProfile: 'Complete seu perfil',
          fields: 'Campos',
          fillSection: 'Preencher {{section}}',
          tip: 'Dica: Quanto mais completo seu perfil, melhores recomendações!',
          sections: {
            personal: 'Dados Pessoais',
            address: 'Contato e Endereço',
            income: 'Renda',
            living: 'Situação de Moradia',
            children: 'Filhos',
            bank: 'Dados Bancários',
            insurance: 'Seguro Saúde',
            special: 'Circunstâncias Especiais',
            partner: 'Parceiro(a)',
            assets: 'Patrimônio'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Auxílio Moradia', 'Abono Família', 'Bolsa Estudante', 'Licença Parental'] },
        flow: {
          step1: { title: 'Carregar', subtitle: 'Carregar Documentos' },
          step2: { title: 'Análise IA', subtitle: 'Verificação Automática' },
          step3: { title: 'Aprovado', subtitle: 'Receber Dinheiro' },
          tagline: { auto: 'Automático.', secure: 'Seguro.', time: 'Em 3 Minutos.' }
        }
      },
      chat: {
        initial: 'Olá! Sou seu Piloto de Burocracia. 👋\nPosso ajudar com solicitações, formulários ou envio de sua fatura. O que você gostaria de fazer?',
        title: 'Piloto de Burocracia',
        online: 'Online',
        placeholder: 'Pergunte-me algo...',
        error: 'Desculpe, estou com problemas de conexão no momento.',
        configError: '⚠️ Erro de Configuração: A chave API da OpenAI está ausente ou inválida.'
      },
      layout: {
        subtitle: 'Seu assistente digital de solicitações',
        nav: { dashboard: 'Painel', upload: 'Carregar', antraege: 'Solicitações', contact: 'Contato', impressum: 'Aviso Legal' },
        profile: { edit: 'Editar Perfil', logout: 'Sair', login: 'Entrar / Registrar' },
        footer: '© 2025 MiMiCheck. Feito com ❤️ em DACH.'
      },
      anspruchsAnalyse: {
        title: 'Análise de Elegibilidade IA',
        subtitle: 'Deixe nossa IA analisar a quais subsídios você tem direito',
        cta: {
          ready: 'Pronto para sua análise pessoal?',
          description: 'Nossa IA analisa seu perfil e determina a quais benefícios sociais e subsídios você provavelmente tem direito. Você verá então valores concretos e os próximos passos.',
          button: 'Analisar Elegibilidade Agora',
          analyzing: 'Analisando Elegibilidade...'
        },
        results: {
          total: 'Benefício Mensal Total Estimado',
          programs: 'Programas Elegíveis',
          match: 'Correspondência',
          amount: 'Valor Mensal Estimado',
          reason: 'Justificativa:',
          docs: 'Documentos Necessários:',
          steps: 'Próximos Passos:',
          download: 'Baixar Formulário Oficial',
          recommendations: 'Recomendações',
          retry: 'Analisar Novamente',
          pdf: 'Resultado como PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Auxílio Moradia (Wohngeld)',
              reasoning: 'Com base em sua renda e situação de moradia, você tem grandes chances de receber auxílio moradia.',
              requiredDocuments: ['Contrato de Aluguel', 'Comprovantes de Renda (últimos 12 meses)', 'Identidade'],
              nextSteps: ['Baixar Formulário', 'Compilar Documentos', 'Enviar ao Departamento de Habitação']
            },
            {
              programName: 'Abono Família (Kindergeld)',
              reasoning: 'Você tem direito ao abono família para seus filhos até 18 anos (possivelmente mais se estiverem estudando).',
              requiredDocuments: ['Certidão de Nascimento da Criança', 'ID Fiscal', 'Certificado de Residência'],
              nextSteps: ['Inscrever-se no Escritório de Benefícios Familiares', 'Enviar Certidão de Nascimento', 'Aguardar Aprovação']
            },
            {
              programName: 'Renda Básica (Bürgergeld)',
              reasoning: 'Com baixa renda, você pode solicitar apoio de renda básica adicional.',
              requiredDocuments: ['Identidade', 'Comprovantes de Renda', 'Certificado de Aluguel', 'Extratos Bancários'],
              nextSteps: ['Marcar Consulta no Jobcenter', 'Preencher Inscrição', 'Apresentar Documentos']
            }
          ],
          recommendations: [
            'Complete seu perfil para análises mais precisas',
            'Prepare todos os documentos com antecedência',
            'Use nosso assistente de preenchimento por IA para solicitações mais rápidas',
            'Envie várias solicitações em paralelo para maximizar suas chances'
          ]
        }
      },
      uploadPage: {
        back: 'Voltar',
        secureTransfer: 'Transferência Segura',
        title: 'Carregar',
        titleHighlight: 'Documento',
        subtitle: 'Analisamos sua fatura de despesas ou contrato de aluguel em busca de erros e potencial de economia.',
        steps: {
          upload: { title: 'Carregar Documento', description: 'Transferência Segura...' },
          analysis: { title: 'Análise IA', description: 'Verificando Conteúdo e Estrutura...' },
          extraction: { title: 'Extração de Dados', description: 'Identificando Itens de Custo...' },
          legal: { title: 'Verificação Legal', description: 'Comparação com Lei de Locação...' },
          report: { title: 'Criar Relatório', description: 'Finalizando Resultados...' }
        },
        features: {
          formats: { title: 'Todos os Formatos', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'Compatível com RGPD', desc: 'Criptografado' },
          ai: { title: 'Análise IA', desc: 'Resultado Instantâneo' }
        },
        errors: {
          uploadFailed: 'Falha no envio',
          unexpected: 'Ocorreu um erro inesperado.'
        }
      },
      antraegePage: {
        title: 'Seus Direitos',
        subtitle: 'Nossa IA encontrou esses subsídios para você com base em seu perfil.',
        noProfile: {
          title: 'Completar Perfil',
          text: 'Complete seu perfil para que nossa IA possa encontrar subsídios adequados para você.',
          button: 'Completar Perfil'
        },
        searchPlaceholder: 'Buscar solicitações (ex. Auxílio Moradia)...',
        filter: { all: 'Tudo' },
        categories: {
          social: 'Segurança Básica & Social',
          family: 'Família & Crianças',
          housing: 'Habitação & Aluguel',
          education: 'Educação & Treinamento',
          retirement: 'Aposentadoria & Idade',
          health: 'Saúde & Cuidado'
        },
        card: {
          match: 'Correspondência',
          amount: 'Valor Estimado',
          duration: 'Tempo de Processamento',
          button: 'Solicitar Agora'
        },
        fallback: {
          wohngeld: { name: 'Auxílio Moradia', desc: 'Subsídio estatal para aluguel para famílias de baixa renda.' },
          kindergeld: { name: 'Abono Família', desc: 'Apoio mensal para todas as famílias com crianças.' },
          buergergeld: { name: 'Renda Básica', desc: 'Segurança básica para candidatos a emprego para garantir seu sustento.' },
          bafoeg: { name: 'Bolsa Estudante', desc: 'Apoio estatal para alunos e estudantes.' }
        }
      },
      contactPage: {
        title: 'Contato & Suporte',
        subtitle: 'Estamos aqui para você. Seja para perguntas técnicas, feedback ou parcerias.',
        liveChat: {
          title: 'Chat ao Vivo',
          desc: 'Nosso assistente de IA "Piloto de Burocracia" está disponível 24/7.',
          button: 'Abrir Chat'
        },
        contact: {
          title: 'Contato',
          response: 'Resposta em 24h'
        },
        location: {
          title: 'Localização',
          country: 'Alemanha'
        },
        form: {
          title: 'Escreva-nos',
          name: 'Nome',
          namePlaceholder: 'Seu Nome',
          email: 'E-mail',
          emailPlaceholder: 'seu@email.com',
          message: 'Mensagem',
          messagePlaceholder: 'Como podemos ajudar?',
          submit: 'Enviar Mensagem',
          submitting: 'Enviando...',
          successTitle: 'Mensagem enviada!',
          successText: 'Obrigado pela sua mensagem. Entraremos em contato o mais breve possível.',
          newMsg: 'Escrever nova mensagem'
        }
      },
      impressumPage: {
        title: 'Aviso Legal',
        subtitle: 'Informações legais de acordo com § 5 TMG',
        provider: 'Informações do Provedor',
        company: 'Empresa',
        contact: 'Contato',
        responsible: 'Responsável pelo Conteúdo',
        register: 'Registro',
        registerText: 'Entrada no registro comercial.\nTribunal de Registro: [Adicionar Tribunal]\nNúmero de Registro: [Adicionar HRB]',
        disclaimer: {
          title: 'Isenção de Responsabilidade',
          contentTitle: 'Responsabilidade pelo Conteúdo',
          content: 'O conteúdo de nossas páginas foi criado com o maior cuidado. No entanto, não podemos garantir a precisão, integridade e atualidade do conteúdo. O uso de recomendações de IA é por sua conta e risco.',
          legalTitle: 'Aconselhamento Jurídico',
          legal: 'MiMiCheck não constitui aconselhamento jurídico. Para questões legais, consulte um advogado ou consultor fiscal qualificado.'
        }
      },
      datenschutzPage: {
        title: 'Política de Privacidade',
        subtitle: 'De acordo com Art. 13, 14 RGPD • Status: Janeiro 2025',
        security: {
          title: 'Seus dados estão seguros',
          text: 'Levamos a proteção de seus dados pessoais muito a sério e tratamos seus dados confidencialmente e de acordo com os regulamentos legais de proteção de dados e esta política de privacidade.'
        },
        collection: {
          title: 'Quais dados coletamos',
          google: { title: 'Login do Google:', text: 'Nome, endereço de e-mail (para criação de conta)' },
          profile: { title: 'Dados do Perfil:', text: 'Renda, estado civil, situação de moradia (para verificação de elegibilidade)' },
          docs: { title: 'Documentos:', text: 'Contas de serviços públicos (para análise legal)' }
        },
        ai: {
          title: 'IA e Processamento de Dados',
          purpose: { title: 'Propósito:', text: 'Verificação automática de reivindicações de elegibilidade e contas de serviços públicos' },
          anon: { title: 'Anonimização:', text: 'Os dados são pseudonimizados para análise de IA' },
          noShare: { title: 'Sem Compartilhamento:', text: 'Seus dados não são vendidos a terceiros' }
        },
        rights: {
          title: 'Seus Direitos',
          info: { title: 'Informação', text: 'Você tem o direito a informações sobre seus dados armazenados.' },
          delete: { title: 'Exclusão', text: 'Você pode solicitar a exclusão de seus dados a qualquer momento.' },
          revoke: { title: 'Revogação', text: 'Os consentimentos podem ser revogados a qualquer momento.' }
        },
        contact: {
          title: 'Contato Oficial de Proteção de Dados',
          text: 'Para perguntas sobre proteção de dados, entre em contato conosco em:'
        }
      },
      agbPage: {
        title: 'Termos e Condições Gerais',
        subtitle: 'Status: Janeiro 2025',
        scope: {
          title: '§ 1 Escopo e Objeto do Contrato',
          content1: 'Estes T&C regem o uso da plataforma MiMiCheck.',
          content2: 'O objeto é o fornecimento de software apoiado por IA para analisar reivindicações de benefícios estatais e verificar contas de serviços públicos.'
        },
        duties: {
          title: '§ 2 Obrigações do Usuário',
          content1: 'O usuário é responsável pela precisão dos dados inseridos. Informações incorretas podem levar a resultados incorretos.',
          content2: 'Os dados de acesso devem ser mantidos em segredo.'
        },
        liability: {
          title: '§ 3 Limitação de Responsabilidade',
          content1: 'MiMiCheck não assume garantia pela exatidão dos resultados da análise. A plataforma não constitui aconselhamento jurídico ou fiscal.',
          content2: 'A responsabilidade por negligência leve é excluída.'
        }
      },
      onboardingPage: {
        loading: 'Carregando perfil...',
        welcome: 'Bem-vindo ao MiMiCheck',
        step: 'Passo {{current}} de {{total}}',
        error: 'Erro ao salvar. Tente novamente.',
        steps: {
          basics: {
            title: 'Dados Básicos',
            firstName: 'Nome',
            lastName: 'Sobrenome',
            birthDate: 'Data de Nascimento',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} de 3 campos preenchidos'
          },
          living: {
            title: 'Situação de Moradia',
            type: 'Tipo de Moradia',
            select: 'Por favor selecione',
            rent: '🏠 Aluguel',
            own: '🏡 Própria'
          },
          consent: {
            title: 'Consentimento',
            text: 'Aceito a <1>Política de Privacidade</1> e concordo com o processamento dos meus dados de acordo com o RGPD.'
          }
        },
        buttons: {
          back: 'Voltar',
          next: 'Próximo',
          finish: 'Concluir'
        }
      },
      lebenslagenPage: {
        loading: 'Carregando dados do formulário...',
        title: 'Perfil Completo',
        subtitle: 'Para processos de IA totalmente automatizados e solicitação',
        validationErrorTitle: 'Erros de validação:',
        autoSave: 'O perfil é salvo automaticamente',
        buttons: {
          save: 'Salvar',
          saving: 'Salvando...',
          saved: 'Salvo!'
        },
        tabs: {
          personal: 'Pessoal',
          living: 'Moradia',
          finance: 'Finanças',
          authorities: 'Autoridades',
          privacy: 'Privacidade'
        },
        sections: {
          personal: {
            title: 'Dados Pessoais Básicos',
            firstName: 'Nome *',
            lastName: 'Sobrenome *',
            birthDate: 'Data de Nascimento',
            maritalStatus: 'Estado Civil',
            employmentStatus: 'Situação Profissional',
            householdSize: 'Tamanho da Família',
            childrenCount: 'Número de Filhos',
            specialCircumstances: 'Circunstâncias Especiais',
            singleParent: 'Monoparental',
            disability: 'Deficiência Grave',
            careNeed: 'Necessidade de Cuidados',
            student: 'Estudante',
            chronicIllness: 'Doença Crônica',
            disabilityDegree: 'Grau de Deficiência (%)',
            careLevel: 'Nível de Cuidado (1-5)',
            options: {
              select: 'Por favor selecione',
              single: 'Solteiro(a)',
              married: 'Casado(a)',
              partnership: 'União Estável',
              widowed: 'Viúvo(a)',
              divorced: 'Divorciado(a)',
              employed: 'Empregado',
              unemployed: 'Desempregado',
              selfEmployed: 'Autônomo',
              student: 'Estudante',
              retired: 'Aposentado',
              parentalLeave: 'Licença Parental',
              incapacitated: 'Incapacitado'
            }
          },
          living: {
            title: 'Situação de Moradia',
            street: 'Rua',
            houseNumber: 'Número',
            zip: 'CEP *',
            city: 'Cidade *',
            state: 'Estado',
            type: 'Tipo de Moradia *',
            area: 'Área (m²)',
            rentCold: 'Aluguel Frio (€/Mês)',
            utilities: 'Despesas (€/Mês)',
            heating: 'Aquecimento (€/Mês)',
            options: {
              rent: 'Aluguel',
              ownPaid: 'Própria (Quitada)',
              ownCredit: 'Própria com Crédito',
              socialHousing: 'Habitação Social'
            }
          },
          finance: {
            title: 'Renda e Finanças',
            netIncome: 'Renda Líquida Mensal Total (€) *',
            detailsTitle: 'Detalhes da Renda (Opcional)',
            salaryEmployed: 'Salário (Empregado)',
            incomeSelfEmployed: 'Renda (Autônomo)',
            pension: 'Pensão',
            unemploymentBenefit: 'Seguro Desemprego',
            childBenefit: 'Benefício Infantil',
            parentalBenefit: 'Benefício Parental',
            alimony: 'Pensão Alimentícia',
            otherIncome: 'Outras Rendas',
            assets: 'Patrimônio Total (€)',
            assetsHint: 'Poupança, Ações, Imóveis, etc.',
            insuranceTitle: 'Seguro Saúde',
            insuranceType: 'Tipo de Seguro',
            insuranceName: 'Nome do Seguro',
            insurancePlaceholder: 'ex. AOK, TK',
            options: {
              public: 'Público',
              private: 'Privado',
              none: 'Nenhum'
            }
          },
          authorities: {
            title: 'Dados de Autoridades (Auto-Solicitação)',
            info: 'Estes dados são opcionais e necessários apenas para solicitação automática. Todos os dados são armazenados criptografados.',
            taxId: 'Número de Identificação Fiscal',
            taxIdHint: '11 dígitos',
            socialSecurityId: 'Número de Segurança Social',
            socialSecurityIdHint: '12 caracteres',
            iban: 'IBAN (para pagamentos)',
            ibanHint: 'Necessário para pagamentos diretos de fundos',
            consentTitle: 'Procurações e Consentimento',
            autoApply: 'Permitir solicitação automática',
            autoApplyHint: 'A IA pode apresentar solicitações em meu nome',
            authorityPower: 'Conceder procuração a autoridades',
            authorityPowerHint: 'A plataforma pode obter informações de autoridades'
          }
        },
        validation: {
          required: '{{field}} é obrigatório',
          zip: 'CEP deve ter 5 dígitos',
          minLength: '{{field}} deve ter pelo menos {{min}} caracteres',
          number: '{{field}} deve ser um número',
          min: '{{field}} deve ser pelo menos {{min}}',
          max: '{{field}} deve ser no máximo {{max}}',
          onlyDisability: 'Apenas com deficiência grave',
          onlyCare: 'Apenas com necessidade de cuidados'
        }
      }
    }
  },
  it: {
    translation: {
      appTitle: 'Spacca Spese',
      nav: { onboarding: 'Completa profilo' },
      upload: { title: 'Carica', progress: 'Analisi in corso…' },
      abrechnungen: { title: 'Fatture', filter: 'Filtro' },
      notifications: { title: 'Notifiche', empty: 'Nessun messaggio' },
      dashboard: {
        greeting: { morning: 'Buongiorno', day: 'Buon Pomeriggio', evening: 'Buonasera' },
        hero: { secure: 'Sicuro & Crittografato', easy: 'facile', subtitle: 'MiMiCheck analizza i tuoi documenti con l\'IA.', ctaUpload: 'Nuova Fattura', ctaAntraege: 'Le Mie Richieste' },
        stats: { total: 'TOTALE', active: 'ATTIVO', potential: 'POTENZIALE', savings: 'Ø Risparmio/Anno', processing: 'In Elaborazione', abrechnungen: 'Fatture' },
        activity: { title: 'Attività Recente', viewAll: 'Vedi Tutto', emptyTitle: 'Ancora nessuna fattura', emptyText: 'Inizia ora e lasciaci analizzare i tuoi documenti!', createFirst: 'Crea Prima Fattura' },
        status: { completed: 'Completato', processing: 'In Elaborazione', pending: 'In Attesa', error: 'Errore' },
        tabs: {
          title: 'Il Tuo Pannello Benefici',
          subtitle: 'Compila il profilo, avvia l\'analisi AI, trova le domande adatte.',
          overview: 'Panoramica',
          profile: 'Il Mio Profilo',
          applications: 'Le Mie Domande',
          profileStatus: 'Stato del Profilo',
          ready: 'Pronto',
          incomplete: 'Incompleto',
          potentialSavings: 'Risparmio Potenziale',
          matchingApps: 'Domande Corrispondenti',
          perMonth: 'al mese',
          completeProfile: 'Completa Profilo',
          completeProfileText: 'Compila il tuo profilo affinché la nostra AI possa trovare benefici e domande adatte per te.',
          fillNow: 'Compila Ora',
          analysisComplete: 'Analisi AI Completata',
          foundPrograms: 'Abbiamo trovato {{count}} benefici adatti per te!',
          viewApps: 'Vedi Domande',
          reanalyze: 'Rianalizza',
          analyzing: 'L\'AI sta analizzando il tuo profilo...',
          analyzingWait: 'Questo potrebbe richiedere un momento.',
          profileIncomplete: 'Profilo Incompleto',
          fillProfileFirst: 'Per favore, compila prima il tuo profilo così possiamo trovare domande adatte per te.',
          fillProfile: 'Compila Profilo',
          yourRecommendations: 'Le Tue Raccomandazioni',
          foundBasedOnProfile: 'In base al tuo profilo, abbiamo trovato {{count}} benefici adatti.',
          estimatedPotential: 'Potenziale Stimato',
          match: 'Corrispondenza',
          fillWithAI: 'Compila con AI',
          noRecommendations: 'Nessuna Raccomandazione',
          noRecommendationsText: 'In base al tuo profilo, non abbiamo trovato benefici adatti.',
          analyzeAgain: 'Analizza di Nuovo'
        },
        profileWidget: {
          status: 'Stato del Profilo',
          readyForAnalysis: 'Pronto per Analisi AI',
          completeYourProfile: 'Completa il tuo profilo',
          fields: 'Campi',
          fillSection: 'Compila {{section}}',
          tip: 'Suggerimento: Più completo è il tuo profilo, migliori saranno le raccomandazioni!',
          sections: {
            personal: 'Dati Personali',
            address: 'Contatto e Indirizzo',
            income: 'Reddito',
            living: 'Situazione Abitativa',
            children: 'Figli',
            bank: 'Dati Bancari',
            insurance: 'Assicurazione Sanitaria',
            special: 'Circostanze Speciali',
            partner: 'Partner',
            assets: 'Patrimonio'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Sussidio Casa', 'Assegno Figli', 'Borsa Studio', 'Congedo Parentale'] },
        flow: {
          step1: { title: 'Carica', subtitle: 'Carica Documenti' },
          step2: { title: 'Analisi IA', subtitle: 'Controllo Automatico' },
          step3: { title: 'Approvato', subtitle: 'Ricevi Denaro' },
          tagline: { auto: 'Automatico.', secure: 'Sicuro.', time: 'In 3 Minuti.' }
        }
      },
      chat: {
        initial: 'Ciao! Sono il tuo Pilota della Burocrazia. 👋\nPosso aiutarti con domande, moduli o caricamento della tua fattura. Cosa vorresti fare?',
        title: 'Pilota Burocrazia',
        online: 'Online',
        placeholder: 'Chiedimi qualcosa...',
        error: 'Scusa, ho problemi di connessione al momento.',
        configError: '⚠️ Errore di Configurazione: Chiave API OpenAI mancante o non valida.'
      },
      layout: {
        subtitle: 'Il tuo assistente digitale per le richieste',
        nav: { dashboard: 'Dashboard', upload: 'Carica', antraege: 'Richieste', contact: 'Contatto', impressum: 'Note Legali' },
        profile: { edit: 'Modifica Profilo', logout: 'Esci', login: 'Accedi / Registrati' },
        footer: '© 2025 MiMiCheck. Fatto con ❤️ in DACH.'
      },
      anspruchsAnalyse: {
        title: 'Analisi Idoneità IA',
        subtitle: 'Lascia che la nostra IA analizzi a quali sussidi hai diritto',
        cta: {
          ready: 'Pronto per la tua analisi personale?',
          description: 'La nostra IA analizza il tuo profilo e determina a quali benefici sociali e sussidi hai probabilmente diritto. Vedrai quindi importi concreti e i passaggi successivi.',
          button: 'Analizza Idoneità Ora',
          analyzing: 'Analisi Idoneità in Corso...'
        },
        results: {
          total: 'Beneficio Mensile Totale Stimato',
          programs: 'Programmi Idonei',
          match: 'Corrispondenza',
          amount: 'Importo Mensile Stimato',
          reason: 'Motivazione:',
          docs: 'Documentos Richiesti:',
          steps: 'Passaggi Successivi:',
          download: 'Scarica Modulo Ufficiale',
          recommendations: 'Raccomandazioni',
          retry: 'Analizza di Nuovo',
          pdf: 'Risultato come PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Sussidio Casa (Wohngeld)',
              reasoning: 'In base al tuo reddito e alla tua situazione abitativa, hai alte probabilità di ricevere il sussidio casa.',
              requiredDocuments: ['Contratto di Affitto', 'Dichiarazioni dei Redditi (ultimi 12 mesi)', 'Carta d\'Identità'],
              nextSteps: ['Scarica Modulo', 'Raccogli Documenti', 'Invia all\'Ufficio Alloggi']
            },
            {
              programName: 'Assegno Figli (Kindergeld)',
              reasoning: 'Hai diritto all\'assegno figli per i tuoi figli fino a 18 anni (possibilmente più a lungo se studiano).',
              requiredDocuments: ['Certificato di Nascita del Bambino', 'Codice Fiscale', 'Certificato di Residenza'],
              nextSteps: ['Fai Domanda all\'Ufficio Benefici Familiari', 'Invia Certificato di Nascita', 'Attendi Approvazione']
            },
            {
              programName: 'Reddito di Base (Bürgergeld)',
              reasoning: 'Con un reddito basso, puoi richiedere un sostegno al reddito di base aggiuntivo.',
              requiredDocuments: ['Carta d\'Identità', 'Dichiarazioni dei Redditi', 'Certificato di Affitto', 'Estratti Conto'],
              nextSteps: ['Prendi Appuntamento al Jobcenter', 'Compila Domanda', 'Presenta Documenti']
            }
          ],
          recommendations: [
            'Completa il tuo profilo per analisi più accurate',
            'Prepara tutti i documenti in anticipo',
            'Usa il nostro assistente di compilazione IA per domande più veloci',
            'Invia più domande in parallelo per massimizzare le tue possibilità'
          ]
        }
      },
      uploadPage: {
        back: 'Indietro',
        secureTransfer: 'Trasferimento Sicuro',
        title: 'Carica',
        titleHighlight: 'Documento',
        subtitle: 'Analizziamo la tua bolletta o il contratto di affitto per errori e potenziale di risparmio.',
        steps: {
          upload: { title: 'Carica Documento', description: 'Trasferimento Sicuro...' },
          analysis: { title: 'Analisi IA', description: 'Controllo Contenuto e Struttura...' },
          extraction: { title: 'Estrazione Dati', description: 'Identificazione Voci di Costo...' },
          legal: { title: 'Controllo Legale', description: 'Confronto con Legge Locazione...' },
          report: { title: 'Crea Report', description: 'Finalizzazione Risultati...' }
        },
        features: {
          formats: { title: 'Tutti i Formati', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'Conforme GDPR', desc: 'Crittografato' },
          ai: { title: 'Analisi IA', desc: 'Risultato Immediato' }
        },
        errors: {
          uploadFailed: 'Caricamento fallito',
          unexpected: 'Si è verificato un errore imprevisto.'
        }
      },
      antraegePage: {
        title: 'I Tuoi Diritti',
        subtitle: 'La nostra IA ha trovato questi sussidi per te in base al tuo profilo.',
        noProfile: {
          title: 'Completa Profilo',
          text: 'Completa il tuo profilo in modo che la nostra IA possa trovare sussidi adatti a te.',
          button: 'Completa Profilo'
        },
        searchPlaceholder: 'Cerca richieste (es. Sussidio Casa)...',
        filter: { all: 'Tutto' },
        categories: {
          social: 'Sicurezza di Base & Sociale',
          family: 'Famiglia & Bambini',
          housing: 'Abitazione & Affitto',
          education: 'Istruzione & Formazione',
          retirement: 'Pensione & Anzianità',
          health: 'Salute & Cura'
        },
        card: {
          match: 'Corrispondenza',
          amount: 'Importo Stimato',
          duration: 'Tempo di Elaborazione',
          button: 'Richiedi Ora'
        },
        fallback: {
          wohngeld: { name: 'Sussidio Casa', desc: 'Sussidio statale per l\'affitto per famiglie a basso reddito.' },
          kindergeld: { name: 'Assegno Figli', desc: 'Sostegno mensile per tutte le famiglie con bambini.' },
          buergergeld: { name: 'Reddito di Base', desc: 'Sicurezza di base per chi cerca lavoro per garantire il proprio sostentamento.' },
          bafoeg: { name: 'Borsa Studio', desc: 'Sostegno statale per alunni e studenti.' }
        }
      },
      contactPage: {
        title: 'Contatto & Supporto',
        subtitle: 'Siamo qui per te. Che si tratti di domande tecniche, feedback o partnership.',
        liveChat: {
          title: 'Chat dal Vivo',
          desc: 'Il nostro assistente IA "Pilota Burocrazia" è disponibile 24/7.',
          button: 'Apri Chat'
        },
        contact: {
          title: 'Contatto',
          response: 'Risposta entro 24h'
        },
        location: {
          title: 'Posizione',
          country: 'Germania'
        },
        form: {
          title: 'Scrivici',
          name: 'Nome',
          namePlaceholder: 'Il Tuo Nome',
          email: 'E-mail',
          emailPlaceholder: 'tua@email.com',
          message: 'Messaggio',
          messagePlaceholder: 'Come possiamo aiutarti?',
          submit: 'Invia Messaggio',
          submitting: 'Invio in corso...',
          successTitle: 'Messaggio inviato!',
          successText: 'Grazie per il tuo messaggio. Ti risponderemo il prima possibile.',
          newMsg: 'Scrivi nuovo messaggio'
        }
      },
      impressumPage: {
        title: 'Note Legali',
        subtitle: 'Informazioni legali secondo § 5 TMG',
        provider: 'Informazioni sul Fornitore',
        company: 'Azienda',
        contact: 'Contatto',
        responsible: 'Responsabile dei Contenuti',
        register: 'Registro',
        registerText: 'Iscrizione nel registro di commercio.\nTribunale del Registro: [Aggiungi Tribunale]\nNumero di Registro: [Aggiungi HRB]',
        disclaimer: {
          title: 'Esclusione di Responsabilità',
          contentTitle: 'Responsabilità per i Contenuti',
          content: 'I contenuti delle nostre pagine sono stati creati con la massima cura. Tuttavia, non possiamo garantire l\'accuratezza, la completezza e l\'attualità dei contenuti. L\'uso delle raccomandazioni IA è a proprio rischio.',
          legalTitle: 'Consulenza Legale',
          legal: 'MiMiCheck non costituisce consulenza legale. Per domande legali, consultare un avvocato o un consulente fiscale qualificato.'
        }
      },
      datenschutzPage: {
        title: 'Informativa sulla Privacy',
        subtitle: 'Secondo Art. 13, 14 GDPR • Stato: Gennaio 2025',
        security: {
          title: 'I tuoi dati sono al sicuro',
          text: 'Prendiamo molto sul serio la protezione dei tuoi dati personali e trattiamo i tuoi dati in modo confidenziale e in conformità con le normative legali sulla protezione dei dati e questa informativa sulla privacy.'
        },
        collection: {
          title: 'Quali dati raccogliamo',
          google: { title: 'Login Google:', text: 'Nome, indirizzo email (per creazione account)' },
          profile: { title: 'Dati Profilo:', text: 'Reddito, stato civile, situazione abitativa (per verifica idoneità)' },
          docs: { title: 'Documenti:', text: 'Bollette (per analisi legale)' }
        },
        ai: {
          title: 'IA & Elaborazione Dati',
          purpose: { title: 'Scopo:', text: 'Verifica automatica delle richieste di idoneità e delle bollette' },
          anon: { title: 'Anonimizzazione:', text: 'I dati vengono pseudonimizzati per l\'analisi IA' },
          noShare: { title: 'Nessuna Condivisione:', text: 'I tuoi dati non vengono venduti a terzi' }
        },
        rights: {
          title: 'I Tuoi Diritti',
          info: { title: 'Informazioni', text: 'Hai diritto a informazioni sui tuoi dati memorizzati.' },
          delete: { title: 'Cancellazione', text: 'Puoi richiedere la cancellazione dei tuoi dati in qualsiasi momento.' },
          revoke: { title: 'Revoca', text: 'I consensi possono essere revocati in qualsiasi momento.' }
        },
        contact: {
          title: 'Contatto Responsabile Protezione Dati',
          text: 'Per domande sulla protezione dei dati, contattaci a:'
        }
      },
      agbPage: {
        title: 'Termini e Condizioni Generali',
        subtitle: 'Stato: Gennaio 2025',
        scope: {
          title: '§ 1 Ambito e Oggetto del Contratto',
          content1: 'Questi T&C regolano l\'uso della piattaforma MiMiCheck.',
          content2: 'L\'oggetto è la fornitura di software supportato da IA per analizzare le richieste di benefici statali e controllare le bollette.'
        },
        duties: {
          title: '§ 2 Obblighi dell\'Utente',
          content1: 'L\'utente è responsabile dell\'accuratezza dei dati inseriti. Informazioni errate possono portare a risultati errati.',
          content2: 'I dati di accesso devono essere tenuti segreti.'
        },
        liability: {
          title: '§ 3 Limitazione di Responsabilità',
          content1: 'MiMiCheck non si assume alcuna garanzia per la correttezza dei risultati dell\'analisi. La piattaforma non costituisce consulenza legale o fiscale.',
          content2: 'È esclusa la responsabilità per colpa lieve.'
        }
      },
      onboardingPage: {
        loading: 'Caricamento profilo...',
        welcome: 'Benvenuto su MiMiCheck',
        step: 'Passo {{current}} di {{total}}',
        error: 'Errore durante il salvataggio. Riprova.',
        steps: {
          basics: {
            title: 'Dati di Base',
            firstName: 'Nome',
            lastName: 'Cognome',
            birthDate: 'Data di Nascita',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: '{{count}} di 3 campi compilati'
          },
          living: {
            title: 'Situazione Abitativa',
            type: 'Tipo di Alloggio',
            select: 'Seleziona',
            rent: '🏠 Affitto',
            own: '🏡 Proprietà'
          },
          consent: {
            title: 'Consenso',
            text: 'Accetto la <1>Informativa sulla Privacy</1> e acconsento al trattamento dei miei dati secondo il GDPR.'
          }
        },
        buttons: {
          back: 'Indietro',
          next: 'Avanti',
          finish: 'Finito'
        }
      },
      lebenslagenPage: {
        loading: 'Caricamento dati modulo...',
        title: 'Profilo Completo',
        subtitle: 'Per processi AI completamente automatizzati e presentazione domande',
        validationErrorTitle: 'Errori di convalida:',
        autoSave: 'Il profilo viene salvato automaticamente',
        buttons: {
          save: 'Salva',
          saving: 'Salvataggio...',
          saved: 'Salvato!'
        },
        tabs: {
          personal: 'Personale',
          living: 'Abitazione',
          finance: 'Finanze',
          authorities: 'Autorità',
          privacy: 'Privacy'
        },
        sections: {
          personal: {
            title: 'Dati Personali di Base',
            firstName: 'Nome *',
            lastName: 'Cognome *',
            birthDate: 'Data di Nascita',
            maritalStatus: 'Stato Civile',
            employmentStatus: 'Stato Occupazionale',
            householdSize: 'Dimensione Nucleo Familiare',
            childrenCount: 'Numero di Figli',
            specialCircumstances: 'Circostanze Speciali',
            singleParent: 'Genitore Single',
            disability: 'Disabilità Grave',
            careNeed: 'Bisogno di Assistenza',
            student: 'Studente',
            chronicIllness: 'Malattia Cronica',
            disabilityDegree: 'Grado di Disabilità (%)',
            careLevel: 'Livello di Assistenza (1-5)',
            options: {
              select: 'Seleziona',
              single: 'Celibe/Nubile',
              married: 'Sposato/a',
              partnership: 'Unione Civile',
              widowed: 'Vedovo/a',
              divorced: 'Divorziato/a',
              employed: 'Dipendente',
              unemployed: 'Disoccupato',
              selfEmployed: 'Autonomo',
              student: 'Studente',
              retired: 'Pensionato',
              parentalLeave: 'Congedo Parentale',
              incapacitated: 'Inabile'
            }
          },
          living: {
            title: 'Situazione Abitativa',
            street: 'Via',
            houseNumber: 'Numero Civico',
            zip: 'CAP *',
            city: 'Città *',
            state: 'Stato/Regione',
            type: 'Tipo di Alloggio *',
            area: 'Superficie (m²)',
            rentCold: 'Affitto Base (€/Mese)',
            utilities: 'Spese (€/Mese)',
            heating: 'Riscaldamento (€/Mese)',
            options: {
              rent: 'Affitto',
              ownPaid: 'Proprietà (Pagata)',
              ownCredit: 'Proprietà con Mutuo',
              socialHousing: 'Edilizia Sociale'
            }
          },
          finance: {
            title: 'Reddito e Finanze',
            netIncome: 'Reddito Netto Mensile Totale (€) *',
            detailsTitle: 'Dettagli Reddito (Opzionale)',
            salaryEmployed: 'Stipendio (Dipendente)',
            incomeSelfEmployed: 'Reddito (Autonomo)',
            pension: 'Pensione',
            unemploymentBenefit: 'Sussidio di Disoccupazione',
            childBenefit: 'Assegno Familiare',
            parentalBenefit: 'Assegno Parentale',
            alimony: 'Alimenti',
            otherIncome: 'Altri Redditi',
            assets: 'Patrimonio Totale (€)',
            assetsHint: 'Risparmi, Azioni, Immobili ecc.',
            insuranceTitle: 'Assicurazione Sanitaria',
            insuranceType: 'Tipo di Assicurazione',
            insuranceName: 'Nome Assicurazione',
            insurancePlaceholder: 'es. AOK, TK',
            options: {
              public: 'Pubblica',
              private: 'Privata',
              none: 'Nessuna'
            }
          },
          authorities: {
            title: 'Dati Autorità (Auto-Domande)',
            info: 'Questi dati sono opzionali e necessari solo per la presentazione automatica delle domande. Tutti i dati sono archiviati crittografati.',
            taxId: 'Codice Fiscale',
            taxIdHint: '11 cifre',
            socialSecurityId: 'Numero di Previdenza Sociale',
            socialSecurityIdHint: '12 caratteri',
            iban: 'IBAN (per pagamenti)',
            ibanHint: 'Richiesto per pagamenti diretti di fondi',
            consentTitle: 'Deleghe e Consenso',
            autoApply: 'Consenti presentazione automatica domande',
            autoApplyHint: 'L\'IA può presentare domande alle autorità per mio conto',
            authorityPower: 'Concedi delega autorità',
            authorityPowerHint: 'La piattaforma può ottenere informazioni dalle autorità'
          }
        },
        validation: {
          required: '{{field}} è obbligatorio',
          zip: 'Il CAP deve contenere 5 cifre',
          minLength: '{{field}} deve avere almeno {{min}} caratteri',
          number: '{{field}} deve essere un numero',
          min: '{{field}} deve essere almeno {{min}}',
          max: '{{field}} deve essere al massimo {{max}}',
          onlyDisability: 'Solo con disabilità grave',
          onlyCare: 'Solo con bisogno di assistenza'
        }
      }
    }
  },
  pl: {
    translation: {
      appTitle: 'Pogromca Opłat',
      nav: { onboarding: 'Uzupełnij profil' },
      upload: { title: 'Prześlij', progress: 'Analiza trwa…' },
      abrechnungen: { title: 'Rachunki', filter: 'Filtr' },
      notifications: { title: 'Powiadomienia', empty: 'Brak wiadomości' },
      dashboard: {
        greeting: { morning: 'Dzień Dobry', day: 'Dzień Dobry', evening: 'Dobry Wieczór' },
        hero: { secure: 'Bezpieczne & Szyfrowane', easy: 'łatwe', subtitle: 'MiMiCheck analizuje Twoje dokumenty przy użyciu AI.', ctaUpload: 'Nowy Rachunek', ctaAntraege: 'Moje Wnioski' },
        stats: { total: 'RAZEM', active: 'AKTYWNE', potential: 'POTENCJAŁ', savings: 'Ø Oszczędność/Rok', processing: 'Przetwarzanie', abrechnungen: 'Rachunki' },
        activity: { title: 'Ostatnia Aktywność', viewAll: 'Zobacz Wszystkie', emptyTitle: 'Brak rachunków', emptyText: 'Zacznij teraz i pozwól nam przeanalizować Twoje dokumenty!', createFirst: 'Utwórz Pierwszy Rachunek' },
        status: { completed: 'Zakończono', processing: 'Przetwarzanie', pending: 'Oczekujący', error: 'Błąd' },
        tabs: {
          title: 'Twój Panel Świadczeń',
          subtitle: 'Wypełnij profil, uruchom analizę AI, znajdź odpowiednie wnioski.',
          overview: 'Przegląd',
          profile: 'Mój Profil',
          applications: 'Moje Wnioski',
          profileStatus: 'Status Profilu',
          ready: 'Gotowy',
          incomplete: 'Niekompletny',
          potentialSavings: 'Potencjalne Oszczędności',
          matchingApps: 'Pasujące Wnioski',
          perMonth: 'miesięcznie',
          completeProfile: 'Uzupełnij Profil',
          completeProfileText: 'Wypełnij swój profil, aby nasza AI mogła znaleźć odpowiednie świadczenia i wnioski dla Ciebie.',
          fillNow: 'Wypełnij Teraz',
          analysisComplete: 'Analiza AI Zakończona',
          foundPrograms: 'Znaleźliśmy {{count}} odpowiednich świadczeń dla Ciebie!',
          viewApps: 'Zobacz Wnioski',
          reanalyze: 'Przeanalizuj Ponownie',
          analyzing: 'AI analizuje Twój profil...',
          analyzingWait: 'To może chwilę potrwać.',
          profileIncomplete: 'Profil Niekompletny',
          fillProfileFirst: 'Proszę najpierw wypełnić profil, abyśmy mogli znaleźć odpowiednie wnioski dla Ciebie.',
          fillProfile: 'Wypełnij Profil',
          yourRecommendations: 'Twoje Rekomendacje',
          foundBasedOnProfile: 'Na podstawie Twojego profilu znaleźliśmy {{count}} odpowiednich świadczeń.',
          estimatedPotential: 'Szacowany Potencjał',
          match: 'Dopasowanie',
          fillWithAI: 'Wypełnij z AI',
          noRecommendations: 'Brak Rekomendacji',
          noRecommendationsText: 'Na podstawie Twojego profilu nie znaleźliśmy odpowiednich świadczeń.',
          analyzeAgain: 'Analizuj Ponownie'
        },
        profileWidget: {
          status: 'Status Profilu',
          readyForAnalysis: 'Gotowy do Analizy AI',
          completeYourProfile: 'Uzupełnij swój profil',
          fields: 'Pola',
          fillSection: 'Wypełnij {{section}}',
          tip: 'Wskazówka: Im pełniejszy profil, tym lepsze rekomendacje!',
          sections: {
            personal: 'Dane Osobowe',
            address: 'Kontakt i Adres',
            income: 'Dochód',
            living: 'Sytuacja Mieszkaniowa',
            children: 'Dzieci',
            bank: 'Dane Bankowe',
            insurance: 'Ubezpieczenie Zdrowotne',
            special: 'Szczególne Okoliczności',
            partner: 'Partner',
            assets: 'Majątek'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Dodatek Mieszkaniowy', 'Zasiłek na Dziecko', 'Stypendium', 'Zasiłek Rodzicielski'] },
        flow: {
          step1: { title: 'Prześlij', subtitle: 'Prześlij Dokumenty' },
          step2: { title: 'Analiza AI', subtitle: 'Automatyczne Sprawdzenie' },
          step3: { title: 'Zatwierdzone', subtitle: 'Otrzymaj Pieniądze' },
          tagline: { auto: 'Automatycznie.', secure: 'Bezpiecznie.', time: 'W 3 Minuty.' }
        }
      },
      chat: {
        initial: 'Cześć! Jestem Twoim Pilotem Biurokracji. 👋\nMogę pomóc Ci z wnioskami, formularzami lub przesłaniem rachunku. Co chciałbyś zrobić?',
        title: 'Pilot Biurokracji',
        online: 'Online',
        placeholder: 'Zapytaj mnie o coś...',
        error: 'Przepraszam, mam teraz problemy z połączeniem.',
        configError: '⚠️ Błąd Konfiguracji: Brak klucza API OpenAI lub jest nieprawidłowy.'
      },
      layout: {
        subtitle: 'Twój cyfrowy asystent wniosków',
        nav: { dashboard: 'Pulpit', upload: 'Prześlij', antraege: 'Wnioski', contact: 'Kontakt', impressum: 'Nota Prawna' },
        profile: { edit: 'Edytuj Profil', logout: 'Wyloguj', login: 'Zaloguj / Rejestracja' },
        footer: '© 2025 MiMiCheck. Zrobione z ❤️ w DACH.'
      },
      anspruchsAnalyse: {
        title: 'Analiza Kwalifikowalności AI',
        subtitle: 'Pozwól naszej AI przeanalizować, do jakich dotacji masz prawo',
        cta: {
          ready: 'Gotowy na swoją osobistą analizę?',
          description: 'Nasza AI analizuje Twój profil i określa, do jakich świadczeń socjalnych i dotacji prawdopodobnie masz prawo. Zobaczysz wtedy konkretne kwoty i kolejne kroki.',
          button: 'Analizuj Kwalifikowalność Teraz',
          analyzing: 'Analizowanie Kwalifikowalności...'
        },
        results: {
          total: 'Szacowane Całkowite Miesięczne Świadczenie',
          programs: 'Kwalifikujące się Programy',
          match: 'Dopasowanie',
          amount: 'Szacowana Miesięczna Kwota',
          reason: 'Uzasadnienie:',
          docs: 'Wymagane Dokumenty:',
          steps: 'Kolejne Kroki:',
          download: 'Pobierz Oficjalny Formularz',
          recommendations: 'Rekomendacje',
          retry: 'Analizuj Ponownie',
          pdf: 'Wynik jako PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Dodatek Mieszkaniowy (Wohngeld)',
              reasoning: 'Na podstawie Twoich dochodów i sytuacji mieszkaniowej masz duże szanse na otrzymanie dodatku mieszkaniowego.',
              requiredDocuments: ['Umowa Najmu', 'Zaświadczenia o Dochodach (ostatnie 12 miesięcy)', 'Dowód Osobisty'],
              nextSteps: ['Pobierz Formularz', 'Skompletuj Dokumenty', 'Złóż w Urzędzie Mieszkaniowym']
            },
            {
              programName: 'Zasiłek na Dziecko (Kindergeld)',
              reasoning: 'Masz prawo do zasiłku na dzieci do 18 roku życia (ewentualnie dłużej, jeśli się uczą).',
              requiredDocuments: ['Akt Urodzenia Dziecka', 'NIP', 'Zaświadczenie o Zameldowaniu'],
              nextSteps: ['Złóż wniosek w Kasie Rodzinnej', 'Prześlij Akt Urodzenia', 'Czekaj na Decyzję']
            },
            {
              programName: 'Dochód Podstawowy (Bürgergeld)',
              reasoning: 'Przy niskich dochodach możesz ubiegać się o dodatkowe wsparcie dochodowe.',
              requiredDocuments: ['Dowód Osobisty', 'Zaświadczenia o Dochodach', 'Zaświadczenie o Czynszu', 'Wyciągi Bankowe'],
              nextSteps: ['Umów się na spotkanie w Jobcenter', 'Wypełnij Wniosek', 'Przedłóż Dokumenty']
            }
          ],
          recommendations: [
            'Uzupełnij swój profil dla dokładniejszych analiz',
            'Przygotuj wszystkie dokumenty z wyprzedzeniem',
            'Skorzystaj z naszej pomocy AI przy wypełnianiu dla szybszych wniosków',
            'Złóż kilka wniosków równolegle, aby zmaksymalizować swoje szanse'
          ]
        }
      },
      uploadPage: {
        back: 'Wstecz',
        secureTransfer: 'Bezpieczny Transfer',
        title: 'Prześlij',
        titleHighlight: 'Dokument',
        subtitle: 'Analizujemy Twój rachunek za media lub umowę najmu pod kątem błędów i potencjału oszczędności.',
        steps: {
          upload: { title: 'Prześlij Dokument', description: 'Bezpieczny Transfer...' },
          analysis: { title: 'Analiza AI', description: 'Sprawdzanie Treści i Struktury...' },
          extraction: { title: 'Ekstrakcja Danych', description: 'Identyfikacja Pozycji Kosztów...' },
          legal: { title: 'Kontrola Prawna', description: 'Porównanie z Prawem Najmu...' },
          report: { title: 'Utwórz Raport', description: 'Finalizowanie Wyników...' }
        },
        features: {
          formats: { title: 'Wszystkie Formaty', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'Zgodne z RODO', desc: 'Szyfrowane' },
          ai: { title: 'Analiza AI', desc: 'Natychmiastowy Wynik' }
        },
        errors: {
          uploadFailed: 'Przesyłanie nie powiodło się',
          unexpected: 'Wystąpił nieoczekiwany błąd.'
        }
      },
      antraegePage: {
        title: 'Twoje Uprawnienia',
        subtitle: 'Nasza AI znalazła dla Ciebie te dotacje na podstawie Twojego profilu.',
        noProfile: {
          title: 'Uzupełnij Profil',
          text: 'Uzupełnij swój profil, aby nasza AI mogła znaleźć dla Ciebie odpowiednie dotacje.',
          button: 'Uzupełnij Profil'
        },
        searchPlaceholder: 'Szukaj wniosków (np. Dodatek Mieszkaniowy)...',
        filter: { all: 'Wszystkie' },
        categories: {
          social: 'Zabezpieczenie Podstawowe & Socjalne',
          family: 'Rodzina & Dzieci',
          housing: 'Mieszkanie & Wynajem',
          education: 'Edukacja & Szkolenie',
          retirement: 'Emerytura & Wiek',
          health: 'Zdrowie & Opieka'
        },
        card: {
          match: 'Dopasowanie',
          amount: 'Szacowana Kwota',
          duration: 'Czas Przetwarzania',
          button: 'Złóż Wniosek Teraz'
        },
        fallback: {
          wohngeld: { name: 'Dodatek Mieszkaniowy', desc: 'Państwowa dopłata do czynszu dla gospodarstw domowych o niskich dochodach.' },
          kindergeld: { name: 'Zasiłek na Dziecko', desc: 'Miesięczne wsparcie dla wszystkich rodzin z dziećmi.' },
          buergergeld: { name: 'Dochód Podstawowy', desc: 'Podstawowe zabezpieczenie dla osób poszukujących pracy w celu zapewnienia utrzymania.' },
          bafoeg: { name: 'Stypendium', desc: 'Państwowe wsparcie dla uczniów i studentów.' }
        }
      },
      contactPage: {
        title: 'Kontakt & Wsparcie',
        subtitle: 'Jesteśmy tu dla Ciebie. Niezależnie od pytań technicznych, opinii czy partnerstwa.',
        liveChat: {
          title: 'Czat na Żywo',
          desc: 'Nasz asystent AI "Pilot Biurokracji" jest dostępny 24/7.',
          button: 'Otwórz Czat'
        },
        contact: {
          title: 'Kontakt',
          response: 'Odpowiedź w ciągu 24h'
        },
        location: {
          title: 'Lokalizacja',
          country: 'Niemcy'
        },
        form: {
          title: 'Napisz do nas',
          name: 'Imię',
          namePlaceholder: 'Twoje Imię',
          email: 'E-mail',
          emailPlaceholder: 'twoj@email.com',
          message: 'Wiadomość',
          messagePlaceholder: 'Jak możemy Ci pomóc?',
          submit: 'Wyślij Wiadomość',
          submitting: 'Wysyłanie...',
          successTitle: 'Wiadomość wysłana!',
          successText: 'Dziękujemy za wiadomość. Skontaktujemy się z Tobą jak najszybciej.',
          newMsg: 'Napisz nową wiadomość'
        }
      },
      impressumPage: {
        title: 'Nota Prawna',
        subtitle: 'Informacje prawne zgodnie z § 5 TMG',
        provider: 'Informacje o Dostawcy',
        company: 'Firma',
        contact: 'Kontakt',
        responsible: 'Odpowiedzialny za Treść',
        register: 'Rejestr',
        registerText: 'Wpis do rejestru handlowego.\nSąd Rejestrowy: [Dodaj Sąd]\nNumer Rejestru: [Dodaj HRB]',
        disclaimer: {
          title: 'Wyłączenie Odpowiedzialności',
          contentTitle: 'Odpowiedzialność za Treść',
          content: 'Treści naszych stron zostały przygotowane z najwyższą starannością. Nie możemy jednak zagwarantować dokładności, kompletności i aktualności treści. Korzystanie z rekomendacji AI odbywa się na własne ryzyko.',
          legalTitle: 'Porada Prawna',
          legal: 'MiMiCheck nie stanowi porady prawnej. W przypadku pytań prawnych prosimy o kontakt z wykwalifikowanym prawnikiem lub doradcą podatkowym.'
        }
      },
      datenschutzPage: {
        title: 'Polityka Prywatności',
        subtitle: 'Zgodnie z Art. 13, 14 RODO • Stan: Styczeń 2025',
        security: {
          title: 'Twoje dane są bezpieczne',
          text: 'Traktujemy ochronę Twoich danych osobowych bardzo poważnie i traktujemy Twoje dane poufnie oraz zgodnie z ustawowymi przepisami o ochronie danych i niniejszą polityką prywatności.'
        },
        collection: {
          title: 'Jakie dane zbieramy',
          google: { title: 'Logowanie Google:', text: 'Imię, adres e-mail (do utworzenia konta)' },
          profile: { title: 'Dane Profilowe:', text: 'Dochód, stan cywilny, sytuacja mieszkaniowa (do sprawdzenia kwalifikowalności)' },
          docs: { title: 'Dokumenty:', text: 'Rachunki za media (do analizy prawnej)' }
        },
        ai: {
          title: 'AI i Przetwarzanie Danych',
          purpose: { title: 'Cel:', text: 'Automatyczne sprawdzanie roszczeń kwalifikowalności i rachunków za media' },
          anon: { title: 'Anonimizacja:', text: 'Dane są pseudonimizowane do analizy AI' },
          noShare: { title: 'Brak Udostępniania:', text: 'Twoje dane nie są sprzedawane osobom trzecim' }
        },
        rights: {
          title: 'Twoje Prawa',
          info: { title: 'Informacja', text: 'Masz prawo do informacji o swoich przechowywanych danych.' },
          delete: { title: 'Usunięcie', text: 'Możesz zażądać usunięcia swoich danych w dowolnym momencie.' },
          revoke: { title: 'Odwołanie', text: 'Zgody można odwołać w dowolnym momencie.' }
        },
        contact: {
          title: 'Kontakt z Inspektorem Ochrony Danych',
          text: 'W przypadku pytań dotyczących ochrony danych skontaktuj się z nami pod adresem:'
        }
      },
      agbPage: {
        title: 'Ogólne Warunki Handlowe',
        subtitle: 'Stan: Styczeń 2025',
        scope: {
          title: '§ 1 Zakres i Przedmiot Umowy',
          content1: 'Niniejsze OWH regulują korzystanie z platformy MiMiCheck.',
          content2: 'Przedmiotem jest udostępnienie oprogramowania wspieranego przez AI do analizy roszczeń o świadczenia państwowe i sprawdzania rachunków za media.'
        },
        duties: {
          title: '§ 2 Obowiązki Użytkownika',
          content1: 'Użytkownik odpowiada za poprawność wprowadzonych danych. Błędne informacje mogą prowadzić do błędnych wyników.',
          content2: 'Dane dostępowe muszą być utrzymywane w tajemnicy.'
        },
        liability: {
          title: '§ 3 Ograniczenie Odpowiedzialności',
          content1: 'MiMiCheck nie gwarantuje poprawności wyników analizy. Platforma nie stanowi porady prawnej ani podatkowej.',
          content2: 'Odpowiedzialność za lekkie niedbalstwo jest wykluczona.'
        }
      },
      onboardingPage: {
        loading: 'Ładowanie profilu...',
        welcome: 'Witamy w MiMiCheck',
        step: 'Krok {{current}} z {{total}}',
        error: 'Błąd zapisu. Spróbuj ponownie.',
        steps: {
          basics: {
            title: 'Dane Podstawowe',
            firstName: 'Imię',
            lastName: 'Nazwisko',
            birthDate: 'Data Urodzenia',
            placeholderName: 'Max',
            placeholderLastName: 'Mustermann',
            progress: 'Wypełniono {{count}} z 3 pól'
          },
          living: {
            title: 'Sytuacja Mieszkaniowa',
            type: 'Typ Mieszkania',
            select: 'Wybierz',
            rent: '🏠 Wynajem',
            own: '🏡 Własność'
          },
          consent: {
            title: 'Zgoda',
            text: 'Akceptuję <1>Politykę Prywatności</1> i wyrażam zgodę na przetwarzanie moich danych zgodnie z RODO.'
          }
        },
        buttons: {
          back: 'Wstecz',
          next: 'Dalej',
          finish: 'Zakończ'
        }
      },
      lebenslagenPage: {
        loading: 'Ładowanie danych formularza...',
        title: 'Pełny Profil',
        subtitle: 'Dla w pełni zautomatyzowanych procesów AI i składania wniosków',
        validationErrorTitle: 'Błędy walidacji:',
        autoSave: 'Profil jest zapisywany automatycznie',
        buttons: {
          save: 'Zapisz',
          saving: 'Zapisywanie...',
          saved: 'Zapisano!'
        },
        tabs: {
          personal: 'Osobiste',
          living: 'Mieszkanie',
          finance: 'Finanse',
          authorities: 'Urzędy',
          privacy: 'Prywatność'
        },
        sections: {
          personal: {
            title: 'Podstawowe Dane Osobowe',
            firstName: 'Imię *',
            lastName: 'Nazwisko *',
            birthDate: 'Data Urodzenia',
            maritalStatus: 'Stan Cywilny',
            employmentStatus: 'Status Zatrudnienia',
            householdSize: 'Liczba Osób w Gospodarstwie',
            childrenCount: 'Liczba Dzieci',
            specialCircumstances: 'Szczególne Okoliczności',
            singleParent: 'Samotny Rodzic',
            disability: 'Znaczna Niepełnosprawność',
            careNeed: 'Potrzeba Opieki',
            student: 'Student',
            chronicIllness: 'Choroba Przewlekła',
            disabilityDegree: 'Stopień Niepełnosprawności (%)',
            careLevel: 'Poziom Opieki (1-5)',
            options: {
              select: 'Wybierz',
              single: 'Kawaler/Panna',
              married: 'Żonaty/Zamężna',
              partnership: 'Partnerstwo',
              widowed: 'Wdowiec/Wdowa',
              divorced: 'Rozwiedziony/a',
              employed: 'Zatrudniony',
              unemployed: 'Bezrobotny',
              selfEmployed: 'Samozatrudniony',
              student: 'Student',
              retired: 'Emeryt',
              parentalLeave: 'Urlop Rodzicielski',
              incapacitated: 'Niezdolny do Pracy'
            }
          },
          living: {
            title: 'Sytuacja Mieszkaniowa',
            street: 'Ulica',
            houseNumber: 'Numer Domu',
            zip: 'Kod Pocztowy *',
            city: 'Miasto *',
            state: 'Województwo',
            type: 'Typ Mieszkania *',
            area: 'Powierzchnia (m²)',
            rentCold: 'Czynsz Podstawowy (€/Miesiąc)',
            utilities: 'Media (€/Miesiąc)',
            heating: 'Ogrzewanie (€/Miesiąc)',
            options: {
              rent: 'Wynajem',
              ownPaid: 'Własność (Spłacona)',
              ownCredit: 'Własność z Kredytem',
              socialHousing: 'Mieszkanie Socjalne'
            }
          },
          finance: {
            title: 'Dochody i Finanse',
            netIncome: 'Całkowity Miesięczny Dochód Netto (€) *',
            detailsTitle: 'Szczegóły Dochodów (Opcjonalne)',
            salaryEmployed: 'Wynagrodzenie (Zatrudniony)',
            incomeSelfEmployed: 'Dochód (Samozatrudniony)',
            pension: 'Emerytura',
            unemploymentBenefit: 'Zasiłek dla Bezrobotnych',
            childBenefit: 'Zasiłek Rodzinny',
            parentalBenefit: 'Zasiłek Rodzicielski',
            alimony: 'Alimenty',
            otherIncome: 'Inne Dochody',
            assets: 'Całkowity Majątek (€)',
            assetsHint: 'Oszczędności, Akcje, Nieruchomości itp.',
            insuranceTitle: 'Ubezpieczenie Zdrowotne',
            insuranceType: 'Typ Ubezpieczenia',
            insuranceName: 'Nazwa Ubezpieczyciela',
            insurancePlaceholder: 'np. AOK, TK',
            options: {
              public: 'Publiczne',
              private: 'Prywatne',
              none: 'Brak'
            }
          },
          authorities: {
            title: 'Dane Urzędowe (Auto-Wnioski)',
            info: 'Te dane są opcjonalne i potrzebne tylko do automatycznego składania wniosków. Wszystkie dane są przechowywane w formie zaszyfrowanej.',
            taxId: 'Numer Identyfikacji Podatkowej',
            taxIdHint: '11 cyfr',
            socialSecurityId: 'Numer Ubezpieczenia Społecznego',
            socialSecurityIdHint: '12 znaków',
            iban: 'IBAN (do wypłat)',
            ibanHint: 'Wymagany do bezpośrednich wypłat środków',
            consentTitle: 'Pełnomocnictwa i Zgoda',
            autoApply: 'Zezwól na automatyczne składanie wniosków',
            autoApplyHint: 'AI może składać wnioski do urzędów w moim imieniu',
            authorityPower: 'Udziel pełnomocnictwa urzędowego',
            authorityPowerHint: 'Platforma może uzyskiwać informacje od urzędów'
          }
        },
        validation: {
          required: '{{field}} jest wymagane',
          zip: 'Kod pocztowy musi mieć 5 cyfr',
          minLength: '{{field}} musi mieć co najmniej {{min}} znaków',
          number: '{{field}} musi być liczbą',
          min: '{{field}} musi wynosić co najmniej {{min}}',
          max: '{{field}} może wynosić maksymalnie {{max}}',
          onlyDisability: 'Tylko przy znacznej niepełnosprawności',
          onlyCare: 'Tylko przy potrzebie opieki'
        }
      }
    }
  },
  ru: {
    translation: {
      appTitle: 'Убийца Расходов',
      nav: { onboarding: 'Заполнить профиль' },
      upload: { title: 'Загрузить', progress: 'Анализ…' },
      abrechnungen: { title: 'Счета', filter: 'Фильтр' },
      notifications: { title: 'Уведомления', empty: 'Нет сообщений' },
      dashboard: {
        greeting: { morning: 'Доброе утро', day: 'Добрый день', evening: 'Добрый вечер' },
        hero: { secure: 'Безопасно & Зашифровано', easy: 'легко', subtitle: 'MiMiCheck анализирует ваши документы с помощью ИИ.', ctaUpload: 'Новый Счет', ctaAntraege: 'Мои Заявки' },
        stats: { total: 'ВСЕГО', active: 'АКТИВНО', potential: 'ПОТЕНЦИАЛ', savings: 'Ø Экономия/Год', processing: 'Обработка', abrechnungen: 'Счета' },
        activity: { title: 'Недавняя Активность', viewAll: 'Посмотреть Все', emptyTitle: 'Счетов пока нет', emptyText: 'Начните сейчас, и мы проанализируем ваши документы!', createFirst: 'Создать Первый Счет' },
        status: { completed: 'Завершено', processing: 'Обработка', pending: 'Ожидание', error: 'Ошибка' },
        tabs: {
          title: 'Ваша Панель Льгот',
          subtitle: 'Заполните профиль, запустите AI-анализ, найдите подходящие заявки.',
          overview: 'Обзор',
          profile: 'Мой Профиль',
          applications: 'Мои Заявки',
          profileStatus: 'Статус Профиля',
          ready: 'Готов',
          incomplete: 'Неполный',
          potentialSavings: 'Потенциальная Экономия',
          matchingApps: 'Подходящие Заявки',
          perMonth: 'в месяц',
          completeProfile: 'Заполнить Профиль',
          completeProfileText: 'Заполните свой профиль, чтобы наш AI мог найти подходящие льготы и заявки для вас.',
          fillNow: 'Заполнить Сейчас',
          analysisComplete: 'AI-Анализ Завершен',
          foundPrograms: 'Мы нашли {{count}} подходящих льгот для вас!',
          viewApps: 'Посмотреть Заявки',
          reanalyze: 'Повторный Анализ',
          analyzing: 'AI анализирует ваш профиль...',
          analyzingWait: 'Это может занять некоторое время.',
          profileIncomplete: 'Профиль Неполный',
          fillProfileFirst: 'Пожалуйста, сначала заполните свой профиль, чтобы мы могли найти подходящие заявки для вас.',
          fillProfile: 'Заполнить Профиль',
          yourRecommendations: 'Ваши Рекомендации',
          foundBasedOnProfile: 'На основе вашего профиля мы нашли {{count}} подходящих льгот.',
          estimatedPotential: 'Расчетный Потенциал',
          match: 'Совпадение',
          fillWithAI: 'Заполнить с AI',
          noRecommendations: 'Нет Рекомендаций',
          noRecommendationsText: 'На основе вашего профиля мы не нашли подходящих льгот.',
          analyzeAgain: 'Анализировать Снова'
        },
        profileWidget: {
          status: 'Статус Профиля',
          readyForAnalysis: 'Готов к AI-Анализу',
          completeYourProfile: 'Заполните свой профиль',
          fields: 'Поля',
          fillSection: 'Заполнить {{section}}',
          tip: 'Совет: Чем полнее ваш профиль, тем лучше рекомендации!',
          sections: {
            personal: 'Личные Данные',
            address: 'Контакт и Адрес',
            income: 'Доход',
            living: 'Жилищная Ситуация',
            children: 'Дети',
            bank: 'Банковские Данные',
            insurance: 'Медицинская Страховка',
            special: 'Особые Обстоятельства',
            partner: 'Партнер',
            assets: 'Активы'
          }
        }
      },
      components: {
        typingHeadline: { words: ['Жилищное пособие', 'Детское пособие', 'Стипендия', 'Родительское пособие'] },
        flow: {
          step1: { title: 'Загрузить', subtitle: 'Загрузить Документы' },
          step2: { title: 'ИИ Анализ', subtitle: 'Автоматическая Проверка' },
          step3: { title: 'Одобрено', subtitle: 'Получить Деньги' },
          tagline: { auto: 'Автоматически.', secure: 'Безопасно.', time: 'За 3 Минуты.' }
        }
      },
      chat: {
        initial: 'Привет! Я твой Бюрократический Пилот. 👋\nЯ могу помочь с заявками, формами или загрузкой счета. Что бы ты хотел сделать?',
        title: 'Бюрократический Пилот',
        online: 'Онлайн',
        placeholder: 'Спроси меня о чем-нибудь...',
        error: 'Извините, у меня проблемы с соединением.',
        configError: '⚠️ Ошибка конфигурации: API-ключ OpenAI отсутствует или недействителен.'
      },
      layout: {
        subtitle: 'Ваш цифровой помощник по заявкам',
        nav: { dashboard: 'Дашборд', upload: 'Загрузить', antraege: 'Заявки', contact: 'Контакты', impressum: 'Импринт' },
        profile: { edit: 'Редактировать профиль', logout: 'Выйти', login: 'Войти / Регистрация' },
        footer: '© 2025 MiMiCheck. Сделано с ❤️ в DACH.'
      },
      anspruchsAnalyse: {
        title: 'ИИ Анализ Права на Пособия',
        subtitle: 'Позвольте нашему ИИ проанализировать, на какие субсидии вы имеете право',
        cta: {
          ready: 'Готовы к персональному анализу?',
          description: 'Наш ИИ анализирует ваш профиль и определяет, на какие социальные пособия и субсидии вы, вероятно, имеете право. Затем вы увидите конкретные суммы и следующие шаги.',
          button: 'Анализировать Право Сейчас',
          analyzing: 'Анализ Права...'
        },
        results: {
          total: 'Ориентировочное Общее Ежемесячное Пособие',
          programs: 'Подходящие Программы',
          match: 'Совпадение',
          amount: 'Ориентировочная Ежемесячная Сумма',
          reason: 'Обоснование:',
          docs: 'Необходимые Документы:',
          steps: 'Следующие Шаги:',
          download: 'Скачать Официальную Форму',
          recommendations: 'Рекомендации',
          retry: 'Анализировать Снова',
          pdf: 'Результат в PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'Жилищное пособие (Wohngeld)',
              reasoning: 'Исходя из вашего дохода и жилищной ситуации, у вас высокие шансы на получение жилищного пособия.',
              requiredDocuments: ['Договор аренды', 'Справки о доходах (за последние 12 месяцев)', 'Удостоверение личности'],
              nextSteps: ['Скачать форму', 'Собрать документы', 'Подать в Жилищное управление']
            },
            {
              programName: 'Детское пособие (Kindergeld)',
              reasoning: 'Вы имеете право на детское пособие на детей до 18 лет (возможно дольше, если они учатся).',
              requiredDocuments: ['Свидетельство о рождении ребенка', 'ИНН', 'Справка о составе семьи'],
              nextSteps: ['Подать заявление в Семейную кассу', 'Отправить свидетельство о рождении', 'Ждать одобрения']
            },
            {
              programName: 'Базовый доход (Bürgergeld)',
              reasoning: 'При низком доходе вы можете подать заявление на дополнительную базовую поддержку дохода.',
              requiredDocuments: ['Удостоверение личности', 'Справки о доходах', 'Справка об аренде', 'Выписки из банка'],
              nextSteps: ['Записаться на прием в Jobcenter', 'Заполнить заявление', 'Предоставить документы']
            }
          ],
          recommendations: [
            'Заполните профиль для более точного анализа',
            'Подготовьте все документы заранее',
            'Используйте наш ИИ-помощник для быстрого заполнения заявлений',
            'Подавайте несколько заявлений параллельно, чтобы увеличить шансы'
          ]
        }
      },
      uploadPage: {
        back: 'Назад',
        secureTransfer: 'Безопасная передача',
        title: 'Загрузить',
        titleHighlight: 'Документ',
        subtitle: 'Мы анализируем ваш счет за коммунальные услуги или договор аренды на наличие ошибок и потенциала экономии.',
        steps: {
          upload: { title: 'Загрузить Документ', description: 'Безопасная передача...' },
          analysis: { title: 'ИИ Анализ', description: 'Проверка содержания и структуры...' },
          extraction: { title: 'Извлечение Данных', description: 'Определение статей расходов...' },
          legal: { title: 'Юридическая Проверка', description: 'Сравнение с законом об аренде...' },
          report: { title: 'Создать Отчет', description: 'Завершение результатов...' }
        },
        features: {
          formats: { title: 'Все Форматы', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'Соответствует GDPR', desc: 'Зашифровано' },
          ai: { title: 'ИИ Анализ', desc: 'Мгновенный Результат' }
        },
        errors: {
          uploadFailed: 'Загрузка не удалась',
          unexpected: 'Произошла непредвиденная ошибка.'
        }
      },
      antraegePage: {
        title: 'Ваши Права',
        subtitle: 'Наш ИИ нашел эти субсидии для вас на основе вашего профиля.',
        noProfile: {
          title: 'Заполнить Профиль',
          text: 'Заполните свой профиль, чтобы наш ИИ мог найти для вас подходящие субсидии.',
          button: 'Заполнить Профиль'
        },
        searchPlaceholder: 'Поиск заявок (напр. Жилищное пособие)...',
        filter: { all: 'Все' },
        categories: {
          social: 'Базовое Обеспечение & Соц.',
          family: 'Семья & Дети',
          housing: 'Жилье & Аренда',
          education: 'Образование & Обучение',
          retirement: 'Пенсия & Возраст',
          health: 'Здоровье & Уход'
        },
        card: {
          match: 'Совпадение',
          amount: 'Ориентировочная Сумма',
          duration: 'Время Обработки',
          button: 'Подать Заявку Сейчас'
        },
        fallback: {
          wohngeld: { name: 'Жилищное пособие', desc: 'Государственная субсидия на аренду для домохозяйств с низким доходом.' },
          kindergeld: { name: 'Детское пособие', desc: 'Ежемесячная поддержка для всех семей с детьми.' },
          buergergeld: { name: 'Базовый доход', desc: 'Базовое обеспечение для ищущих работу для обеспечения средств к существованию.' },
          bafoeg: { name: 'Стипендия', desc: 'Государственная поддержка для учеников и студентов.' }
        }
      },
      contactPage: {
        title: 'Контакты & Поддержка',
        subtitle: 'Мы здесь для вас. Будь то технические вопросы, отзывы или партнерство.',
        liveChat: {
          title: 'Живой Чат',
          desc: 'Наш ИИ-помощник "Бюрократический Пилот" доступен 24/7.',
          button: 'Открыть Чат'
        },
        contact: {
          title: 'Контакты',
          response: 'Ответ в течение 24ч'
        },
        location: {
          title: 'Местоположение',
          country: 'Германия'
        },
        form: {
          title: 'Напишите нам',
          name: 'Имя',
          namePlaceholder: 'Ваше Имя',
          email: 'E-mail',
          emailPlaceholder: 'vashe@email.com',
          message: 'Сообщение',
          messagePlaceholder: 'Чем мы можем помочь?',
          submit: 'Отправить Сообщение',
          submitting: 'Отправка...',
          successTitle: 'Сообщение отправлено!',
          successText: 'Спасибо за ваше сообщение. Мы свяжемся с вами как можно скорее.',
          newMsg: 'Написать новое сообщение'
        }
      },
      impressumPage: {
        title: 'Импринт',
        subtitle: 'Юридическая информация согласно § 5 TMG',
        provider: 'Информация о Провайдере',
        company: 'Компания',
        contact: 'Контакты',
        responsible: 'Ответственный за Контент',
        register: 'Регистрация',
        registerText: 'Запись в торговом реестре.\nРегистрационный суд: [Добавить Суд]\nНомер регистрации: [Добавить HRB]',
        disclaimer: {
          title: 'Отказ от Ответственности',
          contentTitle: 'Ответственность за Контент',
          content: 'Содержание наших страниц было создано с максимальной тщательностью. Однако мы не можем гарантировать точность, полноту и актуальность контента. Использование рекомендаций ИИ осуществляется на ваш страх и риск.',
          legalTitle: 'Юридическая Консультация',
          legal: 'MiMiCheck не является юридической консультацией. По юридическим вопросам обращайтесь к квалифицированному юристу или налоговому консультанту.'
        }
      },
      datenschutzPage: {
        title: 'Политика Конфиденциальности',
        subtitle: 'Согласно ст. 13, 14 GDPR • Статус: Январь 2025',
        security: {
          title: 'Ваши данные в безопасности',
          text: 'Мы очень серьезно относимся к защите ваших персональных данных и обращаемся с вашими данными конфиденциально и в соответствии с законодательными нормами защиты данных и этой политикой конфиденциальности.'
        },
        collection: {
          title: 'Какие данные мы собираем',
          google: { title: 'Вход через Google:', text: 'Имя, адрес электронной почты (для создания аккаунта)' },
          profile: { title: 'Данные профиля:', text: 'Доход, семейное положение, жилищная ситуация (для проверки права на пособия)' },
          docs: { title: 'Документы:', text: 'Счета за коммунальные услуги (для юридического анализа)' }
        },
        ai: {
          title: 'ИИ и Обработка Данных',
          purpose: { title: 'Цель:', text: 'Автоматическая проверка заявлений на пособия и счетов за коммунальные услуги' },
          anon: { title: 'Анонимизация:', text: 'Данные псевдонимизируются для анализа ИИ' },
          noShare: { title: 'Без Передачи:', text: 'Ваши данные не продаются третьим лицам' }
        },
        rights: {
          title: 'Ваши Права',
          info: { title: 'Информация', text: 'Вы имеете право на информацию о ваших сохраненных данных.' },
          delete: { title: 'Удаление', text: 'Вы можете запросить удаление ваших данных в любое время.' },
          revoke: { title: 'Отзыв', text: 'Согласия могут быть отозваны в любое время.' }
        },
        contact: {
          title: 'Контакт с Ответственным за Защиту Данных',
          text: 'По вопросам защиты данных свяжитесь с нами по адресу:'
        }
      },
      agbPage: {
        title: 'Общие Условия',
        subtitle: 'Статус: Январь 2025',
        scope: {
          title: '§ 1 Область применения и Предмет договора',
          content1: 'Эти ОУ регулируют использование платформы MiMiCheck.',
          content2: 'Предметом является предоставление программного обеспечения с поддержкой ИИ для анализа прав на государственные пособия и проверки счетов за коммунальные услуги.'
        },
        duties: {
          title: '§ 2 Обязанности Пользователя',
          content1: 'Пользователь несет ответственность за точность введенных данных. Неверная информация может привести к неверным результатам.',
          content2: 'Данные доступа должны храниться в тайне.'
        },
        liability: {
          title: '§ 3 Ограничение Ответственности',
          content1: 'MiMiCheck не гарантирует правильность результатов анализа. Платформа не является юридической или налоговой консультацией.',
          content2: 'Ответственность за легкую небрежность исключена.'
        }
      },
      onboardingPage: {
        loading: 'Загрузка профиля...',
        welcome: 'Добро пожаловать в MiMiCheck',
        step: 'Шаг {{current}} из {{total}}',
        error: 'Ошибка сохранения. Попробуйте снова.',
        steps: {
          basics: {
            title: 'Основные Данные',
            firstName: 'Имя',
            lastName: 'Фамилия',
            birthDate: 'Дата Рождения',
            placeholderName: 'Макс',
            placeholderLastName: 'Мустерманн',
            progress: 'Заполнено {{count}} из 3 полей'
          },
          living: {
            title: 'Жилищная Ситуация',
            type: 'Тип Жилья',
            select: 'Пожалуйста, выберите',
            rent: '🏠 Аренда',
            own: '🏡 Собственность'
          },
          consent: {
            title: 'Согласие',
            text: 'Я принимаю <1>Политику Конфиденциальности</1> и даю согласие на обработку моих данных в соответствии с GDPR.'
          }
        },
        buttons: {
          back: 'Назад',
          next: 'Далее',
          finish: 'Завершить'
        }
      },
      lebenslagenPage: {
        loading: 'Загрузка данных формы...',
        title: 'Полный Профиль',
        subtitle: 'Для полностью автоматизированных процессов ИИ и подачи заявок',
        validationErrorTitle: 'Ошибки валидации:',
        autoSave: 'Профиль сохраняется автоматически',
        buttons: {
          save: 'Сохранить',
          saving: 'Сохранение...',
          saved: 'Сохранено!'
        },
        tabs: {
          personal: 'Личные',
          living: 'Жилье',
          finance: 'Финансы',
          authorities: 'Органы',
          privacy: 'Конфиденциальность'
        },
        sections: {
          personal: {
            title: 'Основные Личные Данные',
            firstName: 'Имя *',
            lastName: 'Фамилия *',
            birthDate: 'Дата Рождения',
            maritalStatus: 'Семейное Положение',
            employmentStatus: 'Статус Занятости',
            householdSize: 'Размер Домохозяйства',
            childrenCount: 'Количество Детей',
            specialCircumstances: 'Особые Обстоятельства',
            singleParent: 'Одинокий Родитель',
            disability: 'Тяжелая Инвалидность',
            careNeed: 'Нужда в Уходе',
            student: 'Студент',
            chronicIllness: 'Хроническое Заболевание',
            disabilityDegree: 'Степень Инвалидности (%)',
            careLevel: 'Уровень Ухода (1-5)',
            options: {
              select: 'Пожалуйста, выберите',
              single: 'Холост/Не замужем',
              married: 'Женат/Замужем',
              partnership: 'В партнерстве',
              widowed: 'Вдовец/Вдова',
              divorced: 'Разведен/а',
              employed: 'Работающий',
              unemployed: 'Безработный',
              selfEmployed: 'Самозанятый',
              student: 'Студент',
              retired: 'Пенсионер',
              parentalLeave: 'Декретный Отпуск',
              incapacitated: 'Нетрудоспособный'
            }
          },
          living: {
            title: 'Жилищная Ситуация',
            street: 'Улица',
            houseNumber: 'Номер Дома',
            zip: 'Индекс *',
            city: 'Город *',
            state: 'Регион',
            type: 'Тип Жилья *',
            area: 'Площадь (м²)',
            rentCold: 'Аренда (€/Месяц)',
            utilities: 'Коммунальные (€/Месяц)',
            heating: 'Отопление (€/Месяц)',
            options: {
              rent: 'Аренда',
              ownPaid: 'Собственность (Оплачена)',
              ownCredit: 'Собственность в Кредит',
              socialHousing: 'Социальное Жилье'
            }
          },
          finance: {
            title: 'Доходы и Финансы',
            netIncome: 'Общий Ежемесячный Чистый Доход (€) *',
            detailsTitle: 'Детали Доходов (Необязательно)',
            salaryEmployed: 'Зарплата (Работающий)',
            incomeSelfEmployed: 'Доход (Самозанятый)',
            pension: 'Пенсия',
            unemploymentBenefit: 'Пособие по Безработице',
            childBenefit: 'Детское Пособие',
            parentalBenefit: 'Родительское Пособие',
            alimony: 'Алименты',
            otherIncome: 'Другие Доходы',
            assets: 'Общие Активы (€)',
            assetsHint: 'Сбережения, Акции, Недвижимость и т.д.',
            insuranceTitle: 'Медицинское Страхование',
            insuranceType: 'Тип Страхования',
            insuranceName: 'Название Страховой',
            insurancePlaceholder: 'напр. AOK, TK',
            options: {
              public: 'Государственное',
              private: 'Частное',
              none: 'Нет'
            }
          },
          authorities: {
            title: 'Данные Органов (Авто-Заявки)',
            info: 'Эти данные необязательны и нужны только для автоматической подачи заявок. Все данные хранятся в зашифрованном виде.',
            taxId: 'Идентификационный Номер Налогоплательщика',
            taxIdHint: '11 цифр',
            socialSecurityId: 'Номер Социального Страхования',
            socialSecurityIdHint: '12 символов',
            iban: 'IBAN (для выплат)',
            ibanHint: 'Требуется для прямых выплат средств',
            consentTitle: 'Доверенности и Согласие',
            autoApply: 'Разрешить автоматическую подачу заявок',
            autoApplyHint: 'ИИ может подавать заявки в органы от моего имени',
            authorityPower: 'Предоставить доверенность органам',
            authorityPowerHint: 'Платформа может получать информацию от органов'
          }
        },
        validation: {
          required: '{{field}} обязательно',
          zip: 'Индекс должен содержать 5 цифр',
          minLength: '{{field}} должно содержать не менее {{min}} символов',
          number: '{{field}} должно быть числом',
          min: '{{field}} должно быть не менее {{min}}',
          max: '{{field}} должно быть не более {{max}}',
          onlyDisability: 'Только при тяжелой инвалидности',
          onlyCare: 'Только при нужде в уходе'
        }
      }
    }
  },
  ar: {
    translation: {
      appTitle: 'محطم التكاليف',
      nav: { onboarding: 'إكمال الملف الشخصي' },
      upload: { title: 'رفع', progress: 'جاري التحليل…' },
      abrechnungen: { title: 'الفواتير', filter: 'تصفية' },
      notifications: { title: 'إشعارات', empty: 'لا توجد رسائل' },
      dashboard: {
        greeting: { morning: 'صباح الخير', day: 'طاب يومك', evening: 'مساء الخير' },
        hero: { secure: 'آمن ومشفر', easy: 'سهل', subtitle: 'MiMiCheck يحلل مستنداتك باستخدام الذكاء الاصطناعي.', ctaUpload: 'فاتورة جديدة', ctaAntraege: 'طلباتي' },
        stats: { total: 'الإجمالي', active: 'نشط', potential: 'محتمل', savings: 'Ø توفير/سنة', processing: 'قيد المعالجة', abrechnungen: 'فواتير' },
        activity: { title: 'النشاط الأخير', viewAll: 'عرض الكل', emptyTitle: 'لا توجد فواتير بعد', emptyText: 'ابدأ الآن ودعنا نحلل مستنداتك!', createFirst: 'إنشاء أول فاتورة' },
        status: { completed: 'مكتمل', processing: 'قيد المعالجة', pending: 'قيد الانتظار', error: 'خطأ' },
        tabs: {
          title: 'لوحة المزايا الخاصة بك',
          subtitle: 'أكمل ملفك الشخصي، ابدأ تحليل الذكاء الاصطناعي، اعثر على الطلبات المناسبة.',
          overview: 'نظرة عامة',
          profile: 'ملفي الشخصي',
          applications: 'طلباتي',
          profileStatus: 'حالة الملف الشخصي',
          ready: 'جاهز',
          incomplete: 'غير مكتمل',
          potentialSavings: 'التوفير المحتمل',
          matchingApps: 'الطلبات المطابقة',
          perMonth: 'شهرياً',
          completeProfile: 'أكمل الملف الشخصي',
          completeProfileText: 'أكمل ملفك الشخصي حتى يتمكن الذكاء الاصطناعي من إيجاد المزايا والطلبات المناسبة لك.',
          fillNow: 'أكمل الآن',
          analysisComplete: 'اكتمل تحليل الذكاء الاصطناعي',
          foundPrograms: 'وجدنا {{count}} مزايا مناسبة لك!',
          viewApps: 'عرض الطلبات',
          reanalyze: 'إعادة التحليل',
          analyzing: 'الذكاء الاصطناعي يحلل ملفك الشخصي...',
          analyzingWait: 'قد يستغرق هذا لحظة.',
          profileIncomplete: 'الملف الشخصي غير مكتمل',
          fillProfileFirst: 'يرجى إكمال ملفك الشخصي أولاً حتى نتمكن من إيجاد الطلبات المناسبة لك.',
          fillProfile: 'أكمل الملف الشخصي',
          yourRecommendations: 'توصياتك',
          foundBasedOnProfile: 'بناءً على ملفك الشخصي، وجدنا {{count}} مزايا مناسبة.',
          estimatedPotential: 'الإمكانية المقدرة',
          match: 'تطابق',
          fillWithAI: 'أكمل بالذكاء الاصطناعي',
          noRecommendations: 'لا توجد توصيات',
          noRecommendationsText: 'بناءً على ملفك الشخصي، لم نتمكن من إيجاد مزايا مناسبة.',
          analyzeAgain: 'تحليل مرة أخرى'
        },
        profileWidget: {
          status: 'حالة الملف الشخصي',
          readyForAnalysis: 'جاهز لتحليل الذكاء الاصطناعي',
          completeYourProfile: 'أكمل ملفك الشخصي',
          fields: 'حقول',
          fillSection: 'أكمل {{section}}',
          tip: 'نصيحة: كلما كان ملفك الشخصي أكثر اكتمالاً، كانت التوصيات أفضل!',
          sections: {
            personal: 'البيانات الشخصية',
            address: 'الاتصال والعنوان',
            income: 'الدخل',
            living: 'الوضع السكني',
            children: 'الأطفال',
            bank: 'البيانات البنكية',
            insurance: 'التأمين الصحي',
            special: 'ظروف خاصة',
            partner: 'الشريك',
            assets: 'الأصول'
          }
        }
      },
      components: {
        typingHeadline: { words: ['إعانة السكن', 'إعانة الطفل', 'منحة دراسية', 'إعانة الوالدين'] },
        flow: {
          step1: { title: 'رفع', subtitle: 'رفع المستندات' },
          step2: { title: 'تحليل الذكاء الاصطناعي', subtitle: 'فحص تلقائي' },
          step3: { title: 'تمت الموافقة', subtitle: 'استلام الأموال' },
          tagline: { auto: 'تلقائياً.', secure: 'آمن.', time: 'في 3 دقائق.' }
        }
      },
      chat: {
        initial: 'مرحباً! أنا دليلك البيروقراطي. 👋\nيمكنني مساعدتك في الطلبات أو النماذج أو رفع فاتورتك. ماذا تود أن تفعل؟',
        title: 'دليل البيروقراطية',
        online: 'متصل',
        placeholder: 'اسألني شيئاً...',
        error: 'عذراً، لدي مشاكل في الاتصال حالياً.',
        configError: '⚠️ خطأ في التكوين: مفتاح OpenAI API مفقود أو غير صالح.'
      },
      layout: {
        subtitle: 'مساعدك الرقمي للطلبات',
        nav: { dashboard: 'لوحة التحكم', upload: 'رفع', antraege: 'الطلبات', contact: 'اتصل بنا', impressum: 'البيانات القانونية' },
        profile: { edit: 'تعديل الملف الشخصي', logout: 'تسجيل الخروج', login: 'تسجيل الدخول / التسجيل' },
        footer: '© 2025 MiMiCheck. صنع بـ ❤️ في DACH.'
      },
      anspruchsAnalyse: {
        title: 'تحليل الأهلية بالذكاء الاصطناعي',
        subtitle: 'دع ذكاءنا الاصطناعي يحلل الدعم الذي يحق لك الحصول عليه',
        cta: {
          ready: 'جاهز لتحليلك الشخصي؟',
          description: 'يحلل ذكاؤنا الاصطناعي ملفك الشخصي ويحدد المزايا الاجتماعية والدعم الذي من المحتمل أن تكون مؤهلاً له. سترى بعد ذلك مبالغ محددة والخطوات التالية.',
          button: 'تحليل الأهلية الآن',
          analyzing: 'جاري تحليل الأهلية...'
        },
        results: {
          total: 'إجمالي المزايا الشهرية المقدرة',
          programs: 'البرامج المؤهلة',
          match: 'تطابق',
          amount: 'المبلغ الشهري المقدر',
          reason: 'السبب:',
          docs: 'المستندات المطلوبة:',
          steps: 'الخطوات التالية:',
          download: 'تحميل النموذج الرسمي',
          recommendations: 'توصيات',
          retry: 'تحليل مرة أخرى',
          pdf: 'النتيجة كملف PDF'
        },
        fallback: {
          programs: [
            {
              programName: 'إعانة السكن (Wohngeld)',
              reasoning: 'بناءً على دخلك ووضعك السكني، لديك فرصة كبيرة للحصول على إعانة السكن.',
              requiredDocuments: ['عقد الإيجار', 'بيانات الدخل (آخر 12 شهراً)', 'بطاقة الهوية'],
              nextSteps: ['تحميل النموذج', 'تجميع المستندات', 'التقديم في مكتب الإسكان']
            },
            {
              programName: 'إعانة الطفل (Kindergeld)',
              reasoning: 'يحق لك الحصول على إعانة الطفل لأطفالك حتى سن 18 عاماً (ربما لفترة أطول إذا كانوا يدرسون).',
              requiredDocuments: ['شهادة ميلاد الطفل', 'الرقم الضريبي', 'شهادة الأسرة'],
              nextSteps: ['التقديم في مكتب المزايا العائلية', 'إرسال شهادة الميلاد', 'انتظار الموافقة']
            },
            {
              programName: 'الدخل الأساسي (Bürgergeld)',
              reasoning: 'مع الدخل المنخفض، يمكنك التقدم بطلب للحصول على دعم الدخل الأساسي الإضافي.',
              requiredDocuments: ['بطاقة الهوية', 'بيانات الدخل', 'شهادة الإيجار', 'كشوف الحسابات البنكية'],
              nextSteps: ['تحديد موعد في مركز العمل', 'ملء الطلب', 'تقديم المستندات']
            }
          ],
          recommendations: [
            'أكمل ملفك الشخصي للحصول على تحليلات أكثر دقة',
            'جهز جميع المستندات مسبقاً',
            'استخدم مساعد الملء بالذكاء الاصطناعي لطلبات أسرع',
            'قدم طلبات متعددة بالتوازي لزيادة فرصك'
          ]
        }
      },
      uploadPage: {
        back: 'رجوع',
        secureTransfer: 'نقل آمن',
        title: 'رفع',
        titleHighlight: 'المستند',
        subtitle: 'نحن نحلل فاتورة الخدمات أو عقد الإيجار الخاص بك بحثاً عن الأخطاء وإمكانية التوفير.',
        steps: {
          upload: { title: 'رفع المستند', description: 'نقل آمن...' },
          analysis: { title: 'تحليل الذكاء الاصطناعي', description: 'فحص المحتوى والهيكل...' },
          extraction: { title: 'استخراج البيانات', description: 'تحديد بنود التكلفة...' },
          legal: { title: 'الفحص القانوني', description: 'مقارنة مع قانون الإيجار...' },
          report: { title: 'إنشاء تقرير', description: 'إنهاء النتائج...' }
        },
        features: {
          formats: { title: 'جميع التنسيقات', desc: 'PDF, JPG, PNG' },
          gdpr: { title: 'متوافق مع اللائحة العامة لحماية البيانات', desc: 'مشفر' },
          ai: { title: 'تحليل الذكاء الاصطناعي', desc: 'نتيجة فورية' }
        },
        errors: {
          uploadFailed: 'فشل الرفع',
          unexpected: 'حدث خطأ غير متوقع.'
        }
      },
      antraegePage: {
        title: 'حقوقك',
        subtitle: 'وجد ذكاؤنا الاصطناعي هذه الإعانات لك بناءً على ملفك الشخصي.',
        noProfile: {
          title: 'إكمال الملف الشخصي',
          text: 'أكمل ملفك الشخصي حتى يتمكن ذكاؤنا الاصطناعي من العثور على إعانات مناسبة لك.',
          button: 'إكمال الملف الشخصي'
        },
        searchPlaceholder: 'البحث عن طلبات (مثل إعانة السكن)...',
        filter: { all: 'الكل' },
        categories: {
          social: 'الضمان الأساسي & الاجتماعي',
          family: 'الأسرة & الأطفال',
          housing: 'السكن & الإيجار',
          education: 'التعليم & التدريب',
          retirement: 'التقاعد & العمر',
          health: 'الصحة & الرعاية'
        },
        card: {
          match: 'تطابق',
          amount: 'المبلغ المقدر',
          duration: 'وقت المعالجة',
          button: 'قدم الآن'
        },
        fallback: {
          wohngeld: { name: 'إعانة السكن', desc: 'دعم حكومي للإيجار للأسر ذات الدخل المنخفض.' },
          kindergeld: { name: 'إعانة الطفل', desc: 'دعم شهري لجميع الأسر التي لديها أطفال.' },
          buergergeld: { name: 'الدخل الأساسي', desc: 'ضمان أساسي للباحثين عن عمل لتأمين معيشتهم.' },
          bafoeg: { name: 'منحة دراسية', desc: 'دعم حكومي للتلاميذ والطلاب.' }
        }
      },
      contactPage: {
        title: 'اتصل بنا & الدعم',
        subtitle: 'نحن هنا من أجلك. سواء كانت أسئلة فنية أو ملاحظات أو شراكات.',
        liveChat: {
          title: 'دردشة مباشرة',
          desc: 'مساعد الذكاء الاصطناعي "دليل البيروقراطية" متاح لك 24/7.',
          button: 'فتح الدردشة'
        },
        contact: {
          title: 'اتصل بنا',
          response: 'الرد خلال 24 ساعة'
        },
        location: {
          title: 'الموقع',
          country: 'ألمانيا'
        },
        form: {
          title: 'اكتب لنا',
          name: 'الاسم',
          namePlaceholder: 'اسمك',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'your@email.com',
          message: 'الرسالة',
          messagePlaceholder: 'كيف يمكننا مساعدتك؟',
          submit: 'إرسال الرسالة',
          submitting: 'جاري الإرسال...',
          successTitle: 'تم إرسال الرسالة!',
          successText: 'شكراً لرسالتك. سنعود إليك في أقرب وقت ممكن.',
          newMsg: 'كتابة رسالة جديدة'
        }
      },
      impressumPage: {
        title: 'البيانات القانونية',
        subtitle: 'معلومات قانونية وفقاً لـ § 5 TMG',
        provider: 'معلومات المزود',
        company: 'الشركة',
        contact: 'اتصل بنا',
        responsible: 'مسؤول عن المحتوى',
        register: 'سجل تجاري',
        registerText: 'القيد في السجل التجاري.\nمحكمة التسجيل: [أضف المحكمة]\nرقم التسجيل: [أضف HRB]',
        disclaimer: {
          title: 'إخلاء المسؤولية',
          contentTitle: 'المسؤولية عن المحتوى',
          content: 'تم إنشاء محتويات صفحاتنا بعناية فائقة. ومع ذلك، لا يمكننا ضمان دقة واكتمال وحداثة المحتوى. استخدام توصيات الذكاء الاصطناعي يكون على مسؤوليتك الخاصة.',
          legalTitle: 'المشورة القانونية',
          legal: 'MiMiCheck لا تشكل مشورة قانونية. للأسئلة القانونية، يرجى استشارة محامٍ مؤهل أو مستشار ضريبي.'
        }
      },
      datenschutzPage: {
        title: 'سياسة الخصوصية',
        subtitle: 'وفقاً للمادة 13، 14 من اللائحة العامة لحماية البيانات • الحالة: يناير 2025',
        security: {
          title: 'بياناتك آمنة',
          text: 'نحن نأخذ حماية بياناتك الشخصية على محمل الجد ونتعامل مع بياناتك بسرية ووفقاً للوائح حماية البيانات القانونية وسياسة الخصوصية هذه.'
        },
        collection: {
          title: 'ما هي البيانات التي نجمعها',
          google: { title: 'تسجيل الدخول عبر Google:', text: 'الاسم، عنوان البريد الإلكتروني (لإنشاء الحساب)' },
          profile: { title: 'بيانات الملف الشخصي:', text: 'الدخل، الحالة الاجتماعية، الوضع السكني (للتحقق من الأهلية)' },
          docs: { title: 'المستندات:', text: 'فواتير الخدمات (للتحليل القانوني)' }
        },
        ai: {
          title: 'الذكاء الاصطناعي ومعالجة البيانات',
          purpose: { title: 'الغرض:', text: 'التحقق التلقائي من مطالبات الأهلية وفواتير الخدمات' },
          anon: { title: 'إخفاء الهوية:', text: 'يتم استخدام أسماء مستعارة للبيانات لتحليل الذكاء الاصطناعي' },
          noShare: { title: 'لا مشاركة:', text: 'لا يتم بيع بياناتك لأطراف ثالثة' }
        },
        rights: {
          title: 'حقوقك',
          info: { title: 'معلومات', text: 'لديك الحق في الحصول على معلومات حول بياناتك المخزنة.' },
          delete: { title: 'حذف', text: 'يمكنك طلب حذف بياناتك في أي وقت.' },
          revoke: { title: 'إلغاء', text: 'يمكن إلغاء الموافقات في أي وقت.' }
        },
        contact: {
          title: 'الاتصال بمسؤول حماية البيانات',
          text: 'للأسئلة حول حماية البيانات، اتصل بنا على:'
        }
      },
      agbPage: {
        title: 'الشروط والأحكام العامة',
        subtitle: 'الحالة: يناير 2025',
        scope: {
          title: '§ 1 النطاق وموضوع العقد',
          content1: 'تحكم هذه الشروط والأحكام استخدام منصة MiMiCheck.',
          content2: 'الموضوع هو توفير برنامج مدعوم بالذكاء الاصطناعي لتحليل المطالبات بالمزايا الحكومية وفحص فواتير الخدمات.'
        },
        duties: {
          title: '§ 2 التزامات المستخدم',
          content1: 'المستخدم مسؤول عن دقة البيانات المدخلة. المعلومات غير الصحيحة يمكن أن تؤدي إلى نتائج غير صحيحة.',
          content2: 'يجب الحفاظ على سرية بيانات الوصول.'
        },
        liability: {
          title: '§ 3 تحديد المسؤولية',
          content1: 'لا تضمن MiMiCheck صحة نتائج التحليل. المنصة لا تشكل مشورة قانونية أو ضريبية.',
          content2: 'يتم استبعاد المسؤولية عن الإهمال البسيط.'
        }
      },
      onboardingPage: {
        loading: 'تحميل الملف الشخصي...',
        welcome: 'مرحبًا بك في MiMiCheck',
        step: 'الخطوة {{current}} من {{total}}',
        error: 'خطأ في الحفظ. حاول مرة أخرى.',
        steps: {
          basics: {
            title: 'البيانات الأساسية',
            firstName: 'الاسم الأول',
            lastName: 'اسم العائلة',
            birthDate: 'تاريخ الميلاد',
            placeholderName: 'ماكس',
            placeholderLastName: 'موسترمان',
            progress: 'تم ملء {{count}} من 3 حقول'
          },
          living: {
            title: 'الوضع السكني',
            type: 'نوع السكن',
            select: 'يرجى الاختيار',
            rent: '🏠 إيجار',
            own: '🏡 ملكية'
          },
          consent: {
            title: 'موافق',
            text: 'أوافق على <1>سياسة الخصوصية</1> وأوافق على معالجة بياناتي وفقًا للائحة العامة لحماية البيانات.'
          }
        },
        buttons: {
          back: 'رجوع',
          next: 'التالي',
          finish: 'إنهاء'
        }
      },
      lebenslagenPage: {
        loading: 'تحميل بيانات النموذج...',
        title: 'الملف الشخصي الكامل',
        subtitle: 'لعمليات الذكاء الاصطناعي المؤتمتة بالكامل وتقديم الطلبات',
        validationErrorTitle: 'أخطاء التحقق:',
        autoSave: 'يتم حفظ الملف الشخصي تلقائيًا',
        buttons: {
          save: 'حفظ',
          saving: 'جاري الحفظ...',
          saved: 'تم الحفظ!'
        },
        tabs: {
          personal: 'شخصي',
          living: 'السكن',
          finance: 'المالية',
          authorities: 'السلطات',
          privacy: 'الخصوصية'
        },
        sections: {
          personal: {
            title: 'البيانات الشخصية الأساسية',
            firstName: 'الاسم الأول *',
            lastName: 'اسم العائلة *',
            birthDate: 'تاريخ الميلاد',
            maritalStatus: 'الحالة الاجتماعية',
            employmentStatus: 'حالة التوظيف',
            householdSize: 'حجم الأسرة',
            childrenCount: 'عدد الأطفال',
            specialCircumstances: 'ظروف خاصة',
            singleParent: 'والد وحيد',
            disability: 'إعاقة شديدة',
            careNeed: 'بحاجة إلى رعاية',
            student: 'طالب',
            chronicIllness: 'مرض مزمن',
            disabilityDegree: 'درجة الإعاقة (%)',
            careLevel: 'مستوى الرعاية (1-5)',
            options: {
              select: 'يرجى الاختيار',
              single: 'أعزب/عزباء',
              married: 'متزوج/ة',
              partnership: 'شراكة',
              widowed: 'أرمل/ة',
              divorced: 'مطلق/ة',
              employed: 'موظف',
              unemployed: 'عطل عن العمل',
              selfEmployed: 'عمل حر',
              student: 'طالب',
              retired: 'متقاعد',
              parentalLeave: 'إجازة أبوة',
              incapacitated: 'عاجز'
            }
          },
          living: {
            title: 'الوضع السكني',
            street: 'الشارع',
            houseNumber: 'رقم المنزل',
            zip: 'الرمز البريدي *',
            city: 'المدينة *',
            state: 'الولاية',
            type: 'نوع السكن *',
            area: 'المساحة (م²)',
            rentCold: 'الإيجار الأساسي (€/شهر)',
            utilities: 'المرافق (€/شهر)',
            heating: 'التدفئة (€/شهر)',
            options: {
              rent: 'إيجار',
              ownPaid: 'ملكية (مدفوعة)',
              ownCredit: 'ملكية بقرض',
              socialHousing: 'سكن اجتماعي'
            }
          },
          finance: {
            title: 'الدخل والمالية',
            netIncome: 'إجمالي الدخل الصافي الشهري (€) *',
            detailsTitle: 'تفاصيل الدخل (اختياري)',
            salaryEmployed: 'راتب (موظف)',
            incomeSelfEmployed: 'دخل (عمل حر)',
            pension: 'تقاعد',
            unemploymentBenefit: 'إعانة بطالة',
            childBenefit: 'إعانة طفل',
            parentalBenefit: 'إعانة والدية',
            alimony: 'نفقة',
            otherIncome: 'دخل آخر',
            assets: 'إجمالي الأصول (€)',
            assetsHint: 'مدخرات، أسهم، عقارات، إلخ.',
            insuranceTitle: 'التأمين الصحي',
            insuranceType: 'نوع التأمين',
            insuranceName: 'اسم التأمين',
            insurancePlaceholder: 'مثال: AOK, TK',
            options: {
              public: 'عام',
              private: 'خاص',
              none: 'لا يوجد'
            }
          },
          authorities: {
            title: 'بيانات السلطات (للطلبات التلقائية)',
            info: 'هذه البيانات اختيارية ومطلوبة فقط لتقديم الطلبات تلقائيًا. يتم تخزين جميع البيانات مشفرة.',
            taxId: 'رقم التعريف الضريبي',
            taxIdHint: '11 رقمًا',
            socialSecurityId: 'رقم الضمان الاجتماعي',
            socialSecurityIdHint: '12 حرفًا',
            iban: 'IBAN (للمدفوعات)',
            ibanHint: 'مطلوب للمدفوعات المباشرة للأموال',
            consentTitle: 'التوكيلات والموافقة',
            autoApply: 'السماح بتقديم الطلبات تلقائيًا',
            autoApplyHint: 'يمكن للذكاء الاصطناعي تقديم طلبات إلى السلطات نيابة عني',
            authorityPower: 'منح توكيل للسلطات',
            authorityPowerHint: 'يمكن للمنصة الحصول على معلومات من السلطات'
          }
        },
        validation: {
          required: '{{field}} مطلوب',
          zip: 'يجب أن يتكون الرمز البريدي من 5 أرقام',
          minLength: 'يجب أن يحتوي {{field}} على {{min}} حرفًا على الأقل',
          number: 'يجب أن يكون {{field}} رقمًا',
          min: 'يجب أن يكون {{field}} على الأقل {{min}}',
          max: 'يجب أن يكون {{field}} على الأكثر {{max}}',
          onlyDisability: 'فقط مع الإعاقة الشديدة',
          onlyCare: 'فقط مع الحاجة إلى الرعاية'
        }
      }
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'tr', 'es', 'pt', 'it', 'pl', 'ru', 'ar'],
    interpolation: { escapeValue: false },
    detection: { order: ['querystring', 'localStorage', 'navigator'] },
  });

export default i18n;
