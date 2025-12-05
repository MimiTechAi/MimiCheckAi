# Requirements Document

## Introduction

Dieses Dokument beschreibt die Anforderungen für den Beta-Launch von MiMiCheck auf Vercel mit Supabase als Backend. Das Projekt besteht aus zwei Hauptkomponenten, die logisch zusammengeführt werden sollen:

1. **Landing Page** (`mimicheck-landing/`) - React 19, TypeScript, Tailwind v4 - Das schöne Frontend mit Marketing und Auth
2. **Core App** (`src/`) - React 18, JavaScript, Vite - Die Hauptanwendung mit Dashboard und Features

**Ziel:** Beide Anwendungen sollen als einheitliche Beta-Version auf Vercel deployed werden, wobei die Landing Page als Einstiegspunkt dient und zur Core App weiterleitet.

**Supabase Setup:**
- URL: `https://yjjauvmjyhlxcoumwqlj.supabase.co`
- Edge Functions für AI (OpenAI, Claude) und Stripe
- RLS-Policies für Datensicherheit

## Glossary

- **MiMiCheck**: Die Hauptanwendung zur Analyse von Nebenkostenabrechnungen
- **Landing Page**: Marketing-Seite mit Auth-Flow (Port 3000)
- **Core App**: Hauptanwendung mit Dashboard und Features (Port 8005)
- **Supabase**: Backend-as-a-Service für Auth, Datenbank und Storage
- **Vercel**: Hosting-Plattform für das Deployment
- **RLS**: Row Level Security - Supabase Sicherheitsmechanismus
- **Environment Variables**: Konfigurationsvariablen für verschiedene Umgebungen

## Requirements

### Requirement 1: Sicherheitskritische Bereinigung

**User Story:** Als Entwickler möchte ich, dass keine sensiblen Daten im Repository exponiert sind, damit die Anwendung sicher deployed werden kann.

#### Acceptance Criteria

1. WHEN das Repository analysiert wird THEN THE System SHALL keine hardcodierten API-Keys oder Secrets im Quellcode enthalten
2. WHEN Supabase-Credentials benötigt werden THEN THE System SHALL diese ausschließlich aus Umgebungsvariablen laden
3. WHEN alte Build-Artefakte mit exponierten Keys existieren THEN THE System SHALL diese aus dem Repository entfernen
4. WHEN Test-Dateien mit echten Credentials existieren THEN THE System SHALL diese durch Platzhalter ersetzen

### Requirement 2: Environment-Konfiguration

**User Story:** Als Entwickler möchte ich eine klare Trennung zwischen Development und Production Umgebungen, damit das Deployment reibungslos funktioniert.

#### Acceptance Criteria

1. WHEN die Anwendung gestartet wird THEN THE System SHALL alle erforderlichen Umgebungsvariablen validieren
2. WHEN eine Umgebungsvariable fehlt THEN THE System SHALL eine aussagekräftige Fehlermeldung anzeigen
3. WHEN auf Vercel deployed wird THEN THE System SHALL die korrekten Production-URLs verwenden
4. WHEN die Landing Page deployed wird THEN THE System SHALL eine `.env.example` mit allen benötigten Variablen bereitstellen

### Requirement 3: Vercel Deployment Konfiguration

**User Story:** Als Entwickler möchte ich beide Anwendungen (Landing Page und Core App) auf Vercel deployen können, damit die Beta-Version öffentlich zugänglich ist.

#### Acceptance Criteria

1. WHEN die Landing Page deployed wird THEN THE System SHALL eine funktionierende `vercel.json` Konfiguration verwenden
2. WHEN die Core App deployed wird THEN THE System SHALL eine separate `vercel.json` im Root-Verzeichnis haben
3. WHEN SPA-Routing verwendet wird THEN THE System SHALL alle Routen korrekt auf `index.html` umleiten
4. WHEN Security Headers konfiguriert werden THEN THE System SHALL CSP, X-Frame-Options und andere Sicherheitsheader setzen

### Requirement 4: Supabase Integration Validierung

**User Story:** Als Benutzer möchte ich mich sicher anmelden und meine Daten speichern können, damit ich die Anwendung nutzen kann.

#### Acceptance Criteria

1. WHEN ein Benutzer sich registriert THEN THE System SHALL automatisch ein User-Profil in der `users` Tabelle erstellen
2. WHEN ein Benutzer eingeloggt ist THEN THE System SHALL nur seine eigenen Daten anzeigen (RLS)
3. WHEN die Auth-Session abläuft THEN THE System SHALL den Token automatisch erneuern
4. WHEN die Supabase-Verbindung fehlschlägt THEN THE System SHALL eine benutzerfreundliche Fehlermeldung anzeigen

### Requirement 5: Code-Bereinigung und Duplikate

**User Story:** Als Entwickler möchte ich einen sauberen Codebase ohne Duplikate, damit die Wartung einfacher ist.

#### Acceptance Criteria

1. WHEN duplizierte Dateien existieren (z.B. `file.jsx` und `file 2.jsx`) THEN THE System SHALL nur die aktuelle Version behalten
2. WHEN ungenutzte Abhängigkeiten existieren THEN THE System SHALL diese aus `package.json` entfernen
3. WHEN Debug-Code (console.log mit sensiblen Daten) existiert THEN THE System SHALL diesen entfernen oder durch Logger ersetzen
4. WHEN der DEV_MODE Bypass in Auth existiert THEN THE System SHALL diesen für Production deaktivieren

### Requirement 6: Build und Performance Optimierung

**User Story:** Als Benutzer möchte ich eine schnell ladende Anwendung, damit ich eine gute User Experience habe.

#### Acceptance Criteria

1. WHEN die Anwendung gebaut wird THEN THE System SHALL keine Build-Fehler oder Warnungen produzieren
2. WHEN die Anwendung geladen wird THEN THE System SHALL Code-Splitting für große Bibliotheken verwenden
3. WHEN statische Assets geladen werden THEN THE System SHALL korrektes Caching mit immutable Headers verwenden
4. WHEN die Bundle-Größe analysiert wird THEN THE System SHALL unter 1MB für den initialen Load bleiben

### Requirement 7: Auth-Flow Integration

**User Story:** Als Benutzer möchte ich nahtlos zwischen Landing Page und Core App wechseln können, damit ich eine konsistente Erfahrung habe.

#### Acceptance Criteria

1. WHEN ein Benutzer sich auf der Landing Page anmeldet THEN THE System SHALL ihn zur Core App weiterleiten
2. WHEN ein Benutzer nicht eingeloggt ist und eine geschützte Route aufruft THEN THE System SHALL ihn zur Auth-Seite weiterleiten
3. WHEN ein Benutzer sich abmeldet THEN THE System SHALL die Session vollständig löschen
4. WHEN die Auth-Bridge verwendet wird THEN THE System SHALL die Session zwischen beiden Apps synchronisieren

### Requirement 8: Dokumentation und Deployment-Anleitung

**User Story:** Als Entwickler möchte ich eine klare Deployment-Anleitung, damit ich die Anwendung reproduzierbar deployen kann.

#### Acceptance Criteria

1. WHEN ein neuer Entwickler das Projekt klont THEN THE System SHALL eine vollständige README mit Setup-Anleitung bereitstellen
2. WHEN auf Vercel deployed wird THEN THE System SHALL eine Schritt-für-Schritt Anleitung für die Konfiguration haben
3. WHEN Umgebungsvariablen gesetzt werden müssen THEN THE System SHALL eine Liste aller erforderlichen Variablen dokumentieren
4. WHEN Supabase konfiguriert wird THEN THE System SHALL die erforderlichen Migrations und RLS-Policies dokumentieren
