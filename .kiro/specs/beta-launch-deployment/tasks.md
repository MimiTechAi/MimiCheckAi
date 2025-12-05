# Implementation Plan: MiMiCheck Beta Launch Deployment

## Übersicht
Dieser Plan führt das Projekt schrittweise zum Beta-Launch auf Vercel.

---

- [x] 1. Sicherheitsbereinigung - Hardcodierte Keys entfernen
  - [x] 1.1 Supabase Client ohne Fallback-Keys refactoren
    - Entferne hardcodierte Fallback-URLs und Keys aus `mimicheck-landing/client/src/lib/supabase.ts`
    - Stelle sicher, dass nur `import.meta.env` verwendet wird
    - _Requirements: 1.1, 1.2_
  - [x] 1.2 Test-Dateien mit Platzhaltern versehen
    - Ersetze echte Keys in `CREATE-TEST-USER.js`, `test-auth-flow.js`, `CONFIGURE-SUPABASE.js`
    - Verwende Platzhalter wie `YOUR_SUPABASE_URL` und `YOUR_ANON_KEY`
    - _Requirements: 1.1, 1.4_
  - [x] 1.3 Alte Build-Artefakte entfernen
    - Lösche `public/landing.OLD-3001/` Verzeichnis (enthält kompilierte Keys)
    - _Requirements: 1.3_
  - [x] 1.4 Write property test für Secret-Scanning
    - **Property 1: Keine exponierten Secrets im Quellcode**
    - **Validates: Requirements 1.1**

- [x] 2. Duplizierte Dateien bereinigen
  - [x] 2.1 Identifiziere und lösche `* 2.*` Duplikate
    - Lösche alle Dateien mit ` 2` im Namen (z.B. `Auth 2.jsx`, `supabaseClient 2.js`)
    - Behalte nur die Originaldateien
    - _Requirements: 5.1_
  - [x] 2.2 DEV_MODE Bypass absichern
    - Prüfe `src/pages/Auth.jsx` - DEV_MODE sollte nur bei `localhost` aktiv sein
    - Entferne oder kommentiere den DEV Bypass Button für Production
    - _Requirements: 5.4_

- [x] 3. Vercel Konfiguration erstellen
  - [x] 3.1 Erstelle `vercel.json` im Root-Verzeichnis für Core App
    - Konfiguriere Build-Command, Output-Directory, Rewrites für SPA
    - Füge Security Headers hinzu (X-Frame-Options, CSP, etc.)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 3.2 Aktualisiere `mimicheck-landing/vercel.json`
    - Stelle sicher, dass alle Security Headers konfiguriert sind
    - Füge Cache-Control für Assets hinzu
    - _Requirements: 3.1, 3.4_
  - [x] 3.3 Erstelle `.env.example` Dateien
    - Aktualisiere `.env.example` im Root mit allen benötigten Variablen
    - Aktualisiere `mimicheck-landing/.env.example`
    - _Requirements: 2.4, 8.3_

- [x] 4. Supabase Client Validierung verbessern
  - [x] 4.1 Verbessere Error-Handling in `src/api/supabaseClient.js`
    - Entferne console.log mit Key-Fragmenten
    - Füge klare Fehlermeldungen für fehlende Variablen hinzu
    - Werfe Error in Production wenn Keys fehlen
    - _Requirements: 2.1, 2.2, 4.4_
  - [x] 4.2 Write property test für Environment-Validierung
    - **Property 2: Environment-Variablen-Validierung**
    - **Validates: Requirements 2.1, 2.2**

- [x] 5. Auth-Flow Integration prüfen
  - [x] 5.1 Prüfe ProtectedRoute Komponente
    - Stelle sicher, dass nicht-authentifizierte User zur Auth-Seite weitergeleitet werden
    - Prüfe Redirect-URLs für beide Apps
    - _Requirements: 7.2_
  - [x] 5.2 Aktualisiere Auth-Redirects für Production
    - Setze korrekte Redirect-URLs in `src/pages/Auth.jsx`
    - Konfiguriere `emailRedirectTo` für Supabase Auth
    - _Requirements: 7.1, 7.3_
  - [x] 5.3 Write property test für Protected Route Redirect
    - **Property 3: Protected Route Redirect**
    - **Validates: Requirements 7.2**

- [x] 6. Checkpoint - Build und Tests
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Build-Optimierung und Validierung
  - [x] 7.1 Führe Production Build durch
    - Teste `npm run build` im Root-Verzeichnis
    - Prüfe auf Build-Fehler und Warnungen
    - _Requirements: 6.1_
  - [x] 7.2 Analysiere Bundle-Größe
    - Prüfe dass initialer Load unter 1MB bleibt
    - Verifiziere Code-Splitting funktioniert
    - _Requirements: 6.2, 6.4_
  - [x] 7.3 Führe Landing Page Build durch
    - Teste `pnpm run build` in `mimicheck-landing/`
    - Prüfe auf Build-Fehler
    - _Requirements: 6.1_

- [x] 8. Dokumentation aktualisieren
  - [x] 8.1 Aktualisiere README.md mit Deployment-Anleitung
    - Füge Vercel Deployment Schritte hinzu
    - Dokumentiere alle Environment Variables
    - _Requirements: 8.1, 8.2_
  - [x] 8.2 Erstelle DEPLOYMENT.md
    - Schritt-für-Schritt Anleitung für Vercel
    - Supabase Secrets Konfiguration
    - Domain-Setup
    - _Requirements: 8.2, 8.4_

- [x] 9. Final Checkpoint - Deployment-Bereitschaft
  - Ensure all tests pass, ask the user if questions arise.
