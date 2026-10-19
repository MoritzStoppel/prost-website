# Prost! Website

Kleine Präsentationsseite für **Prost!**, die App, die Bierkultur zum Sammelspiel macht und kleinen Brauereien eine Bühne gibt. Projekt von Julian Rößle, Jannik Thieme und Moritz Stoppel an der Hochschule der Medien Stuttgart (WS 2026/27).

## Lokal starten

Die Seite ist reines HTML und CSS, ohne Build-Schritt.

```bash
npm run dev
```

Danach im Browser http://localhost:8000 öffnen. (Alternativ ohne npm: `python3 -m http.server 8000`.)

## Veröffentlichung

Die Seite wird über GitHub Pages direkt aus dem `main`-Branch ausgeliefert. Jeder Push auf `main` aktualisiert die Seite nach etwa einer Minute.

## Noch offen

- Impressum und Datenschutz: ladungsfähige Anschrift eintragen (in `impressum.html` und `datenschutz.html` orange markiert).
- Vor dem öffentlichen Start die Zeile `<meta name="robots" content="noindex, nofollow">` entfernen, damit Suchmaschinen die Seite finden.
- Die Badges zeigen echte Brauereinamen. Vor einer Nutzung im Marketing mit den Brauereien abstimmen.

## Bildnachweise

Fotos von Unsplash (Unsplash License). Badges: Designentwürfe, mit Adobe Firefly erstellt. HdM-Logo: Hochschule der Medien Stuttgart. Schriften DM Sans und Oswald lokal eingebunden (SIL Open Font License).
