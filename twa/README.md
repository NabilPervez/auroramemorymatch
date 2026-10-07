# Aurora Memory Match – Google Play (TWA) checklist

Package: `com.nabilpervez.auroramemorymatch` · Site: https://auroramemorymatch.netlify.app

## 1. Deploy the PWA changes
Push this branch and let Netlify deploy. Then confirm:
- https://auroramemorymatch.netlify.app/manifest.webmanifest loads, with PNG icons
- https://auroramemorymatch.netlify.app/privacy.html loads
- https://auroramemorymatch.netlify.app/.well-known/assetlinks.json returns JSON (not the app's HTML)

## 2. Build the Android package
**Easiest:** https://www.pwabuilder.com → enter https://auroramemorymatch.netlify.app → Package for stores → Android.
Use package ID `com.nabilpervez.auroramemorymatch`, the colours below, and keep the generated signing key safely.

**Or with Bubblewrap** (needs a JDK + Android SDK, about 1 GB; keep them on D:):
```
cd twa
npx @bubblewrap/cli build
```
The first run asks to create `aurora-upload.keystore`. Back it up and never commit it.

Colours: theme `#2e1065`, background `#2e1065`.

## 3. Play Console
1. Create app "Aurora Memory Match", upload the `.aab` to Internal testing.
2. Setup → App signing → copy the **SHA-256 certificate fingerprint**.
3. Put it in `public/.well-known/assetlinks.json` (replace the placeholder) and redeploy.
   Without this the app shows a browser URL bar at the top.
4. Store listing: icon `public/icons/icon-512.png`, feature graphic `twa/feature-graphic.png`,
   2–8 phone screenshots, privacy URL https://auroramemorymatch.netlify.app/privacy.html.
5. Data safety: "No data collected or shared" (everything is stored on device).
