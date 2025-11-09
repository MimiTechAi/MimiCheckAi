# 📋 IMPLEMENTIERUNGS-TASKS

> Diese Tasks können direkt als GitHub Issues angelegt werden  
> Nutze die Labels: `sprint-1`, `sprint-2`, `sprint-3`, `backend`, `frontend`, `security`, `documentation`

---

## 🚀 SPRINT 1: MVP-Core (1-2 Wochen)

### Backend Setup

#### #1: MIMITECH Projekt initialisieren
**Labels:** `sprint-1`, `backend`, `setup`  
**Assignee:** Backend-Dev  
**Story Points:** 3

**Beschreibung:**
- [ ] MIMITECH Account/Projekt anlegen
- [ ] App-ID generieren
- [ ] Domains konfigurieren
- [ ] Auth aktivieren
- [ ] Test-User anlegen

**Akzeptanzkriterien:**
- Login funktioniert im Frontend
- Session wird korrekt verwaltet

---

#### #2: File Upload Function entwickeln
**Labels:** `sprint-1`, `backend`, `storage`  
**Story Points:** 5

**Beschreibung:**
- [ ] Function `uploadFile(file)` implementieren
- [ ] S3/Object Storage anbinden
- [ ] File-Type-Validierung (PDF, JPG, PNG)
- [ ] Size-Limit (10MB) durchsetzen
- [ ] Datei-URL zurückgeben

**Akzeptanzkriterien:**
- Upload funktioniert für PDFs
- Fehler bei falschen Formaten
- Files sind über URL abrufbar

---

#### #3: PDF-Analyse Function entwickeln
**Labels:** `sprint-1`, `backend`, `ai`  
**Story Points:** 8

**Beschreibung:**
- [ ] Function `analyzePdfFields(pdfUrl)` implementieren
- [ ] PDF Text-Extraktion (PyPDF2/pdfplumber)
- [ ] OCR für Scans (Tesseract/AWS Textract)
- [ ] Feld-Erkennung (Regex/NER)
- [ ] JSON-Output: `{fields: [...], confidence: 0.85}`

**Akzeptanzkriterien:**
- Textbasierte PDFs werden extrahiert
- Gescannte PDFs werden erkannt (OCR)
- Mindestens 80% Genauigkeit bei Test-PDFs

---

#### #4: LLM-Analyse Function entwickeln
**Labels:** `sprint-1`, `backend`, `ai`  
**Story Points:** 8

**Beschreibung:**
- [ ] Function `llmAnalyzeAbrechnung(fileUrl, extractedData)` implementieren
- [ ] OpenAI API Integration
- [ ] Prompt Engineering (System + User)
- [ ] Reflection-Mechanismus (K=3)
- [ ] Output: `{savings: 450.75, confidence: 0.82, findings: [...]}`

**Akzeptanzkriterien:**
- LLM-Call funktioniert
- Rückforderungspotential wird berechnet
- Findings sind verständlich

---

#### #5: Report-Generation Function entwickeln
**Labels:** `sprint-1`, `backend`, `reporting`  
**Story Points:** 5

**Beschreibung:**
- [ ] Function `generateReport(analyseId)` implementieren
- [ ] HTML-Template erstellen
- [ ] PDF-Generierung (Playwright/wkhtmltopdf)
- [ ] Report-Upload zu Storage
- [ ] URL zurückgeben

**Akzeptanzkriterien:**
- HTML-Report wird generiert
- PDF-Download funktioniert
- Design ist responsive

---

#### #6: Stripe Checkout Function
**Labels:** `sprint-1`, `backend`, `billing`  
**Story Points:** 5

**Beschreibung:**
- [ ] Function `createStripeCheckoutSession(plan)` implementieren
- [ ] Stripe API Integration
- [ ] Price-IDs konfigurieren
- [ ] Success/Cancel URLs setzen
- [ ] Checkout-URL zurückgeben

**Akzeptanzkriterien:**
- Checkout-Flow funktioniert
- Test-Zahlung erfolgreich

---

#### #7: Stripe Portal Function
**Labels:** `sprint-1`, `backend`, `billing`  
**Story Points:** 3

**Beschreibung:**
- [ ] Function `createStripePortalSession()` implementieren
- [ ] Customer-ID aus Session holen
- [ ] Portal-URL zurückgeben

**Akzeptanzkriterien:**
- Portal öffnet sich
- Abo-Management funktioniert

---

### Frontend Integration

#### #8: MIMITECH Client Setup
**Labels:** `sprint-1`, `frontend`, `setup`  
**Story Points:** 3

**Beschreibung:**
- [ ] `src/api/mimitechClient.js` fixen
- [ ] Environment Variables einrichten
- [ ] Guard gegen `undefined` implementieren
- [ ] Fallback auf `/api/*` vorbereiten

**Akzeptanzkriterien:**
- Keine Console-Errors mehr
- Client initialisiert korrekt

---

#### #9: Upload-Flow verdrahten
**Labels:** `sprint-1`, `frontend`, `feature`  
**Story Points:** 5

**Beschreibung:**
- [ ] Upload-Component überarbeiten
- [ ] File-Picker implementieren
- [ ] Progress-Indicator
- [ ] Statusänderungen visualisieren (uploading → processing → done)
- [ ] Error-Handling

**Akzeptanzkriterien:**
- Upload funktioniert End-to-End
- States werden korrekt angezeigt

---

#### #10: Analyse-Anzeige implementieren
**Labels:** `sprint-1`, `frontend`, `feature`  
**Story Points:** 5

**Beschreibung:**
- [ ] Polling-Mechanismus für Status
- [ ] Ergebnis-Darstellung (Savings, Findings)
- [ ] Confidence-Score anzeigen
- [ ] "Bericht herunterladen" Button

**Akzeptanzkriterien:**
- Analyseergebnis erscheint nach Verarbeitung
- Download funktioniert

---

#### #11: Billing UI implementieren
**Labels:** `sprint-1`, `frontend`, `feature`  
**Story Points:** 3

**Beschreibung:**
- [ ] Pricing-Seite anpassen
- [ ] Checkout-Button verlinken
- [ ] Portal-Link im Profil
- [ ] Plan-Badge im Header

**Akzeptanzkriterien:**
- Checkout funktioniert
- Portal ist erreichbar

---

### Testing & Docs

#### #12: E2E-Test Upload → Bericht
**Labels:** `sprint-1`, `testing`  
**Story Points:** 3

**Beschreibung:**
- [ ] Test-Script schreiben (Playwright/Cypress)
- [ ] Upload simulieren
- [ ] Status-Polling testen
- [ ] Download prüfen

**Akzeptanzkriterien:**
- Test läuft durch
- Kein manuelles Eingreifen nötig

---

#### #13: Sprint 1 Dokumentation
**Labels:** `sprint-1`, `documentation`  
**Story Points:** 2

**Beschreibung:**
- [ ] Setup-Anleitung aktualisieren
- [ ] API-Docs schreiben
- [ ] Environment-Variables dokumentieren

---

## 🔒 SPRINT 2: Qualität & Compliance (1-2 Wochen)

### Sicherheit

#### #14: Virenscan implementieren
**Labels:** `sprint-2`, `backend`, `security`  
**Story Points:** 5

**Beschreibung:**
- [ ] ClamAV oder Cloud-Scanner integrieren
- [ ] Upload-Pipeline erweitern
- [ ] Quarantäne bei Verdacht
- [ ] User-Feedback

---

#### #15: Rate Limiting
**Labels:** `sprint-2`, `backend`, `security`  
**Story Points:** 3

**Beschreibung:**
- [ ] Rate-Limit-Middleware
- [ ] 100 Requests/Minute
- [ ] 429-Response mit Retry-After

---

#### #16: CSRF-Schutz
**Labels:** `sprint-2`, `backend`, `security`  
**Story Points:** 3

**Beschreibung:**
- [ ] CSRF-Token generieren
- [ ] Token-Validierung in Forms
- [ ] Cookie-basierte Tokens

---

### DSGVO

#### #17: Consent-Banner
**Labels:** `sprint-2`, `frontend`, `compliance`  
**Story Points:** 3

**Beschreibung:**
- [ ] Cookie-Banner implementieren
- [ ] Opt-in für Analytics
- [ ] Tracking disabled by default

---

#### #18: Löschjob implementieren
**Labels:** `sprint-2`, `backend`, `compliance`  
**Story Points:** 5

**Beschreibung:**
- [ ] Cronjob für Datenlöschung
- [ ] 90 Tage nach letzter Aktivität
- [ ] Soft-Delete → Hard-Delete
- [ ] Logging

---

#### #19: Datenschutz-Seiten aktualisieren
**Labels:** `sprint-2`, `frontend`, `compliance`  
**Story Points:** 2

**Beschreibung:**
- [ ] Datenschutzerklärung ergänzen
- [ ] AVV-Template
- [ ] Impressum prüfen

---

### Monitoring

#### #20: OpenTelemetry Integration
**Labels:** `sprint-2`, `backend`, `observability`  
**Story Points:** 5

**Beschreibung:**
- [ ] OTEL SDK integrieren
- [ ] Traces für Requests
- [ ] Metrics (Latency, Errors)
- [ ] Export zu Grafana/Loki

---

#### #21: Error Boundaries
**Labels:** `sprint-2`, `frontend`, `stability`  
**Story Points:** 3

**Beschreibung:**
- [ ] React Error Boundaries
- [ ] Fallback-UI
- [ ] Sentry Integration (optional)

---

#### #22: Dashboard erstellen
**Labels:** `sprint-2`, `backend`, `observability`  
**Story Points:** 5

**Beschreibung:**
- [ ] Grafana Dashboard
- [ ] Request-Rate
- [ ] Error-Rate
- [ ] Latency p50/p95/p99

---

## ⚡ SPRINT 3: Performance & Skalierung (1-2 Wochen)

### Backend Optimierung

#### #23: Background Jobs (Stufe B)
**Labels:** `sprint-3`, `backend`, `performance`  
**Story Points:** 8

**Beschreibung:**
- [ ] FastAPI-Gateway aufsetzen
- [ ] Redis-Queue
- [ ] Celery/RQ Worker
- [ ] Async PDF-Processing

---

#### #24: Caching implementieren
**Labels:** `sprint-3`, `backend`, `performance`  
**Story Points:** 5

**Beschreibung:**
- [ ] Redis für häufige Abfragen
- [ ] Cache-Invalidierung
- [ ] TTL setzen

---

#### #25: Database Optimierung
**Labels:** `sprint-3`, `backend`, `performance`  
**Story Points:** 5

**Beschreibung:**
- [ ] Indices anlegen
- [ ] N+1 Queries vermeiden
- [ ] Connection Pooling

---

### AI/LLM Tuning

#### #26: Prompt-Engineering
**Labels:** `sprint-3`, `backend`, `ai`  
**Story Points:** 5

**Beschreibung:**
- [ ] Reflection-Prompts optimieren
- [ ] Few-Shot Examples hinzufügen
- [ ] Confidence-Kalibrierung

---

#### #27: PDF-Parser-Heuristiken
**Labels:** `sprint-3`, `backend`, `ai`  
**Story Points:** 5

**Beschreibung:**
- [ ] Layout-Erkennung verbessern
- [ ] Tabellen-Extraktion
- [ ] Multi-Page-Handling

---

### Frontend Performance

#### #28: Code-Splitting
**Labels:** `sprint-3`, `frontend`, `performance`  
**Story Points:** 3

**Beschreibung:**
- [ ] Route-based Splitting
- [ ] Lazy Loading
- [ ] Bundle-Analyse

---

#### #29: Image-Optimierung
**Labels:** `sprint-3`, `frontend`, `performance`  
**Story Points:** 2

**Beschreibung:**
- [ ] Bilder komprimieren
- [ ] WebP-Format
- [ ] Lazy Loading

---

## 📦 DEPLOYMENT

#### #30: CI/CD Pipeline
**Labels:** `deployment`, `devops`  
**Story Points:** 8

**Beschreibung:**
- [ ] GitHub Actions Setup
- [ ] Build + Test + Deploy
- [ ] Environment Secrets
- [ ] Rollback-Strategie

---

#### #31: Production Deployment
**Labels:** `deployment`, `devops`  
**Story Points:** 8

**Beschreibung:**
- [ ] Domain + TLS konfigurieren
- [ ] Prod-Secrets setzen
- [ ] Monitoring aktivieren
- [ ] Backup-Strategie

---

## 📊 ZUSAMMENFASSUNG

### Story Points
- **Sprint 1:** 50 SP (1-2 Wochen)
- **Sprint 2:** 34 SP (1-2 Wochen)
- **Sprint 3:** 36 SP (1-2 Wochen)
- **Deployment:** 16 SP

**Gesamt:** ~136 Story Points (~6-8 Wochen bei 2-3 Devs)

### Prioritäten
🔴 **P0 (Blocker):** #1, #2, #8, #9  
🟠 **P1 (Hoch):** #3, #4, #5, #10, #14, #18  
🟡 **P2 (Mittel):** #6, #7, #11, #15, #20  
🟢 **P3 (Niedrig):** #23-29 (Optimierungen)

---

**Hinweis:** Diese Tasks können direkt in GitHub Issues importiert werden mit den entsprechenden Labels und Milestones (Sprint 1/2/3).
