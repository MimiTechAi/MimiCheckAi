# MimiCheck - Vollständige Verbesserungsliste 2025

## Einleitung

Tiefgehende Analyse des gesamten Projekts aus Sicht eines normalen Benutzers (keine technischen Kenntnisse). Fokus auf UX, Verständlichkeit, Optik und Funktionalität.

## Glossar

- **UX**: User Experience - Benutzererfahrung
- **UI**: User Interface - Benutzeroberfläche
- **CTA**: Call to Action - Handlungsaufforderung

---

# 🔴 KRITISCH - Sofort beheben

## Requirement 1: Bericht-Seite zeigt JSON-Rohdaten

**User Story:** Als normaler Benutzer möchte ich meine Analyse-Ergebnisse in verständlicher Form sehen, damit ich weiß was mit meinem Dokument ist.

#### Acceptance Criteria

1. WHEN ein Bericht angezeigt wird THEN das System SHALL KEINE JSON-Rohdaten anzeigen
2. WHEN ein Bericht angezeigt wird THEN das System SHALL den Dokumenttyp mit Icon und Beschreibung anzeigen
3. WHEN ein Bericht angezeigt wird THEN das System SHALL eine Zusammenfassung in 2-3 Sätzen anzeigen
4. WHEN ein Bericht angezeigt wird THEN das System SHALL wichtige Hinweise als farbige Karten anzeigen
5. WHEN ein Bericht angezeigt wird THEN das System SHALL Handlungsempfehlungen als Checkliste anzeigen
6. WHEN Kostenposten extrahiert wurden THEN das System SHALL sie als übersichtliche Tabelle anzeigen
7. WHEN ein Rückforderungspotential erkannt wurde THEN das System SHALL es prominent mit Euro-Betrag anzeigen

**Aktueller Zustand:**
```jsx
{/* Raw Data (Debug) - MUSS WEG! */}
<pre className="text-xs text-slate-400">
    {JSON.stringify(extractedData, null, 2)}
</pre>
```

**Gewünschter Zustand:**
- Dokumenttyp-Karte mit Icon (📄 Nebenkostenabrechnung, 📋 Mietvertrag, etc.)
- Konfidenz als Fortschrittsbalken (95% sicher)
- Zusammenfassung in einfacher Sprache
- Wichtige Hinweise als farbige Alert-Boxen
- Handlungsempfehlungen als To-Do-Liste
- "Widerspruch erstellen" Button wenn Fehler gefunden

---

## Requirement 2: Upload-Ergebnis zeigt "0€ Ersparnis" immer

**User Story:** Als Benutzer möchte ich realistische Ergebnisse sehen, damit ich der App vertrauen kann.

#### Acceptance Criteria

1. WHEN eine Analyse abgeschlossen ist THEN das System SHALL das tatsächliche Rückforderungspotential berechnen
2. WHEN kein Rückforderungspotential besteht THEN das System SHALL "Keine Auffälligkeiten gefunden" anzeigen
3. WHEN Rückforderungspotential besteht THEN das System SHALL den Betrag mit Begründung anzeigen
4. WHEN die KI Fehler findet THEN das System SHALL sie in der analysis_results speichern

**Aktueller Zustand:**
```jsx
const savings = abrechnung?.rueckforderung_potential || 0;
// Zeigt immer 0€ weil rueckforderung_potential nie gesetzt wird
```

---

## Requirement 3: Home-Seite ist leer/unfertig

**User Story:** Als neuer Besucher möchte ich sofort verstehen was MimiCheck macht, damit ich mich registrieren möchte.

#### Acceptance Criteria

1. WHEN ein Besucher die Home-Seite öffnet THEN das System SHALL eine ansprechende Hero-Section anzeigen
2. WHEN ein Besucher die Home-Seite öffnet THEN das System SHALL die 3 Hauptfunktionen erklären
3. WHEN ein Besucher die Home-Seite öffnet THEN das System SHALL Vertrauenselemente anzeigen (DSGVO, Sicherheit)
4. WHEN ein Besucher die Home-Seite öffnet THEN das System SHALL einen klaren CTA zum Registrieren haben

**Aktueller Zustand:**
```jsx
<div className="rounded-2xl h-72 bg-slate-900/90">
    <span className="opacity-60">Interactive 3D / Hero Canvas</span>
</div>
// Nur Platzhalter!
```

---

# 🟠 HOCH - Diese Woche

## Requirement 4: Fehlende Benutzerführung nach Upload

**User Story:** Als Benutzer möchte ich nach dem Upload wissen was als nächstes passiert, damit ich nicht verloren bin.

#### Acceptance Criteria

1. WHEN ein Upload abgeschlossen ist THEN das System SHALL einen "Nächste Schritte" Bereich anzeigen
2. WHEN Fehler gefunden wurden THEN das System SHALL einen "Widerspruch erstellen" Button anzeigen
3. WHEN keine Fehler gefunden wurden THEN das System SHALL "Alles in Ordnung" mit Erklärung anzeigen
4. WHEN der Benutzer Premium braucht THEN das System SHALL einen sanften Upgrade-Hinweis zeigen

---

## Requirement 5: Abrechnungen-Liste zeigt keine extrahierten Daten

**User Story:** Als Benutzer möchte ich in der Übersicht sehen was in meinen Dokumenten steht, damit ich sie unterscheiden kann.

#### Acceptance Criteria

1. WHEN Abrechnungen aufgelistet werden THEN das System SHALL den Dokumenttyp anzeigen
2. WHEN Abrechnungen aufgelistet werden THEN das System SHALL den Zeitraum anzeigen
3. WHEN Abrechnungen aufgelistet werden THEN das System SHALL den Verwalter/Absender anzeigen
4. WHEN Abrechnungen aufgelistet werden THEN das System SHALL den Gesamtbetrag anzeigen

**Aktueller Zustand:**
- Zeigt nur Dateiname und Datum
- Keine extrahierten Informationen sichtbar

---

## Requirement 6: KI-Assistent hat keine Kontext-Awareness

**User Story:** Als Benutzer möchte ich dass der Assistent meine hochgeladenen Dokumente kennt, damit er mir spezifisch helfen kann.

#### Acceptance Criteria

1. WHEN der Assistent geöffnet wird THEN das System SHALL die letzten Analysen als Kontext laden
2. WHEN der Benutzer nach seiner Abrechnung fragt THEN das System SHALL auf die extrahierten Daten zugreifen
3. WHEN der Benutzer einen Widerspruch will THEN das System SHALL einen personalisierten Musterbrief generieren

---

## Requirement 7: Profil-Vollständigkeit wird nicht genutzt

**User Story:** Als Benutzer möchte ich wissen warum ich mein Profil ausfüllen soll, damit ich motiviert bin.

#### Acceptance Criteria

1. WHEN das Profil unvollständig ist THEN das System SHALL erklären welche Vorteile ein vollständiges Profil hat
2. WHEN das Profil vollständig ist THEN das System SHALL automatisch passende Förderungen vorschlagen
3. WHEN Förderungen gefunden werden THEN das System SHALL den geschätzten Betrag anzeigen

---

# 🟡 MITTEL - Diesen Monat

## Requirement 8: Keine Fortschrittsanzeige bei langer Analyse

**User Story:** Als Benutzer möchte ich wissen wie lange die Analyse noch dauert, damit ich nicht denke die App hängt.

#### Acceptance Criteria

1. WHEN eine Analyse läuft THEN das System SHALL einen Fortschrittsbalken anzeigen
2. WHEN eine Analyse läuft THEN das System SHALL den aktuellen Schritt beschreiben
3. WHEN eine Analyse länger als 10 Sekunden dauert THEN das System SHALL eine Zeitschätzung anzeigen

---

## Requirement 9: Keine Offline-Unterstützung

**User Story:** Als mobiler Benutzer möchte ich meine Daten auch ohne Internet sehen können.

#### Acceptance Criteria

1. WHEN keine Internetverbindung besteht THEN das System SHALL gecachte Daten anzeigen
2. WHEN keine Internetverbindung besteht THEN das System SHALL einen Offline-Hinweis anzeigen
3. WHEN die Verbindung wiederhergestellt wird THEN das System SHALL automatisch synchronisieren

---

## Requirement 10: Keine Push-Benachrichtigungen

**User Story:** Als Benutzer möchte ich benachrichtigt werden wenn meine Analyse fertig ist.

#### Acceptance Criteria

1. WHEN eine Analyse abgeschlossen ist THEN das System SHALL eine Browser-Benachrichtigung senden können
2. WHEN eine Frist naht THEN das System SHALL eine Erinnerung senden können
3. WHEN neue Förderungen verfügbar sind THEN das System SHALL informieren können

---

## Requirement 11: Keine Dokumenten-Vorschau

**User Story:** Als Benutzer möchte ich mein hochgeladenes Dokument sehen können, damit ich weiß welches es ist.

#### Acceptance Criteria

1. WHEN ein Dokument hochgeladen wurde THEN das System SHALL eine Vorschau anzeigen können
2. WHEN ein PDF hochgeladen wurde THEN das System SHALL die erste Seite als Thumbnail zeigen
3. WHEN ein Bild hochgeladen wurde THEN das System SHALL es verkleinert anzeigen

---

## Requirement 12: Keine Mehrsprachigkeit

**User Story:** Als nicht-deutschsprachiger Benutzer möchte ich die App in meiner Sprache nutzen.

#### Acceptance Criteria

1. WHEN ein Benutzer Englisch bevorzugt THEN das System SHALL englische Texte anzeigen
2. WHEN ein Benutzer Türkisch bevorzugt THEN das System SHALL türkische Texte anzeigen
3. WHEN die Sprache gewechselt wird THEN das System SHALL sofort umschalten

**Aktueller Stand:** i18next ist konfiguriert, aber viele Texte sind hardcoded auf Deutsch

---

# 🟢 NIEDRIG - Backlog

## Requirement 13: Keine Dark/Light Mode Toggle

**User Story:** Als Benutzer möchte ich zwischen hellem und dunklem Design wechseln können.

#### Acceptance Criteria

1. WHEN der Benutzer Dark Mode wählt THEN das System SHALL ein dunkles Design anzeigen
2. WHEN der Benutzer Light Mode wählt THEN das System SHALL ein helles Design anzeigen
3. WHEN der Benutzer System wählt THEN das System SHALL dem Betriebssystem folgen

**Aktueller Stand:** next-themes ist installiert, aber nicht implementiert

---

## Requirement 14: Keine Tastaturnavigation

**User Story:** Als Benutzer mit Einschränkungen möchte ich die App mit der Tastatur bedienen können.

#### Acceptance Criteria

1. WHEN Tab gedrückt wird THEN das System SHALL zum nächsten Element springen
2. WHEN Enter gedrückt wird THEN das System SHALL das fokussierte Element aktivieren
3. WHEN Escape gedrückt wird THEN das System SHALL Dialoge schließen

---

## Requirement 15: Keine Druckansicht

**User Story:** Als Benutzer möchte ich meinen Bericht ausdrucken können, damit ich ihn meinem Vermieter zeigen kann.

#### Acceptance Criteria

1. WHEN der Benutzer drucken will THEN das System SHALL eine druckoptimierte Ansicht anzeigen
2. WHEN gedruckt wird THEN das System SHALL nur relevante Inhalte drucken
3. WHEN gedruckt wird THEN das System SHALL das MimiCheck Logo als Wasserzeichen haben

---

## Requirement 16: Keine Export-Funktion

**User Story:** Als Benutzer möchte ich meine Daten exportieren können, damit ich sie woanders nutzen kann.

#### Acceptance Criteria

1. WHEN der Benutzer exportieren will THEN das System SHALL PDF-Export anbieten
2. WHEN der Benutzer exportieren will THEN das System SHALL CSV-Export für Tabellen anbieten
3. WHEN der Benutzer exportieren will THEN das System SHALL alle seine Daten als ZIP anbieten (DSGVO)

---

# 📊 OPTISCHE VERBESSERUNGEN

## Requirement 17: Inkonsistentes Design

**User Story:** Als Benutzer möchte ich ein einheitliches Design sehen, damit die App professionell wirkt.

#### Acceptance Criteria

1. WHEN Buttons angezeigt werden THEN das System SHALL einheitliche Farben verwenden
2. WHEN Karten angezeigt werden THEN das System SHALL einheitliche Abstände verwenden
3. WHEN Icons angezeigt werden THEN das System SHALL einheitliche Größen verwenden
4. WHEN Texte angezeigt werden THEN das System SHALL einheitliche Schriftgrößen verwenden

**Gefundene Inkonsistenzen:**
- Manche Buttons: `bg-emerald-600`, andere: `bg-blue-600`, andere: `bg-cyan-500`
- Manche Karten: `rounded-xl`, andere: `rounded-2xl`
- Manche Texte: `text-slate-400`, andere: `text-white/60`

---

## Requirement 18: Fehlende Ladeanimationen

**User Story:** Als Benutzer möchte ich ansprechende Ladeanimationen sehen, damit die Wartezeit angenehmer ist.

#### Acceptance Criteria

1. WHEN Daten geladen werden THEN das System SHALL eine Skeleton-Animation anzeigen
2. WHEN ein Button geklickt wird THEN das System SHALL einen Lade-Spinner anzeigen
3. WHEN eine Seite wechselt THEN das System SHALL eine sanfte Übergangsanimation zeigen

---

## Requirement 19: Keine Erfolgs-Feedback

**User Story:** Als Benutzer möchte ich wissen wenn etwas geklappt hat, damit ich sicher bin.

#### Acceptance Criteria

1. WHEN Daten gespeichert wurden THEN das System SHALL eine Erfolgs-Nachricht anzeigen
2. WHEN ein Upload abgeschlossen ist THEN das System SHALL eine Bestätigung anzeigen
3. WHEN eine Aktion erfolgreich war THEN das System SHALL ein grünes Häkchen anzeigen

---

## Requirement 20: Mobile Optimierung unvollständig

**User Story:** Als mobiler Benutzer möchte ich die App bequem auf meinem Handy nutzen können.

#### Acceptance Criteria

1. WHEN auf einem Handy geöffnet THEN das System SHALL alle Elemente lesbar anzeigen
2. WHEN auf einem Handy geöffnet THEN das System SHALL Touch-freundliche Buttons haben
3. WHEN auf einem Handy geöffnet THEN das System SHALL keine horizontale Scrollbar haben
4. WHEN auf einem Handy geöffnet THEN das System SHALL die Navigation als Hamburger-Menü zeigen

---

# 📋 ZUSAMMENFASSUNG

| Priorität | Anzahl | Bereich |
|-----------|--------|---------|
| 🔴 KRITISCH | 3 | UX/Funktionalität |
| 🟠 HOCH | 4 | UX/Features |
| 🟡 MITTEL | 5 | Features |
| 🟢 NIEDRIG | 4 | Nice-to-have |
| 📊 OPTIK | 4 | Design |

## Sofort-Maßnahmen (Top 3)

1. ✅ **Bericht-Seite komplett überarbeiten** - JSON entfernt, benutzerfreundliche Darstellung mit Dokumenttyp-Icons, Konfidenz-Balken, Zusammenfassung, Hinweise als Karten, Kostenposten-Tabelle, Drucken-Button
2. ✅ **Rückforderungspotential berechnen** - Neue Edge Function `calculate-refund-potential` deployed, analysiert Nebenkostenabrechnungen auf Fehler (Verwaltungskosten, Reparaturen, Leerstand, Fristen), berechnet Rückforderungsbetrag mit KI
3. ✅ **Home-Seite fertigstellen** - Hero-Section mit echtem Content, Features-Bereich, Stats, CTA

## Diese Woche

4. ✅ **Upload-Ergebnis verbessern** - Zeigt jetzt gefundene Fehler mit Beträgen, Empfehlungen, Widerspruch-Hinweise
5. ✅ **Abrechnungen-Liste mit extrahierten Daten** - Zeigt jetzt Dokumenttyp, Zeitraum, Absender, Gesamtbetrag, Zusammenfassung, Handlungsbedarf-Warnung
6. ✅ **KI-Assistent mit Dokumenten-Kontext** - Edge Function `ai-chat` erweitert: lädt automatisch die letzten 5 Dokumente des Nutzers als Kontext, OpenAI + Claude Fallback
7. ✅ **Profil-Vervollständigung nach Onboarding** - Fixed: Onboarding speichert jetzt `name`, `vorname`, `nachname`, `onboarding_completed_at` korrekt; ProfilSeite lädt echte Daten und berechnet Vollständigkeit dynamisch; Anträge-Seite prüft auf Profildaten und zeigt Warnung wenn nicht vorhanden
