# Google Drive Integration — Setup Guide

The Cyberpunk 2020 character generator can save and load character sheets directly to/from the signed-in user's Google Drive. This document describes the one-time Google Cloud Platform setup required to make those buttons functional.

## How it works

- **OAuth flow:** Google Identity Services (GIS) token client, in browser only. No backend, no refresh tokens, no client secret.
- **Scope:** `https://www.googleapis.com/auth/drive.file`. The app can only see files it created or files the user explicitly picks via the Google Picker. It cannot enumerate the user's Drive.
- **File format:** plain JSON, same shape as the existing local file save/load. Default filename `CP2020_<handle>.json`.
- **Identity persistence:** the app remembers the Drive file ID of the currently-loaded character in localStorage under `CP2020_CHAR_GEN_DRIVE_FILE_ID`, so subsequent "Save to Drive" clicks update the same file. "Reset" or loading a local file clears the association.
- **Token lifetime:** access tokens live ~1 hour, in memory only. Closing the tab forces re-auth on next use.

## Are these secrets?

**No.** Both the OAuth Client ID and the API key are public identifiers — they appear in browser JavaScript the moment any visitor loads the page. There is no client secret in this flow. What protects the credentials from abuse:

- **OAuth Client ID** is locked to specific **Authorized JavaScript Origins** (your domain). No other origin can use it.
- **API key** is locked to specific **HTTP referrers** and to the **Google Picker API** only.

Commit the values to `src/environments/environment.prod.ts` like any other config constant. Do not put them in sealed secrets or Helm values — they need to be baked into the built JS bundle.

## GCP Console setup (one-time)

### 1. Create or select a project

Go to <https://console.cloud.google.com/>, create a new project (suggested name: `cybersmily-chargen`).

Note the **Project number** — Console → Home → Project info. This is the `appId` value the Picker requires. It's all digits, distinct from the human-readable Project ID.

### 2. Enable required APIs

APIs & Services → Library. Enable both:

- **Google Drive API**
- **Google Picker API**

### 3. Configure the OAuth consent screen

APIs & Services → OAuth consent screen.

| Field | Value |
| --- | --- |
| User Type | External |
| App name | e.g. `Cybersmily Char Gen` |
| User support email | your email |
| Developer contact | your email |
| Scopes | `openid`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `.../auth/drive.file` |
| Test users | every Google account that should be allowed to sign in (up to 100) |

**Leave Publishing status as "Testing".** Do not click "Publish App" — that triggers Google's brand verification flow (logo review, homepage requirements, privacy policy). Testing mode supports up to 100 named users indefinitely and requires no verification.

To add more users later: OAuth consent screen → Test users → Add users. Anyone not on the list will see a "this app is unverified" hard block when they try to sign in.

### 4. Create the OAuth 2.0 Web Client

APIs & Services → Credentials → Create credentials → OAuth client ID.

- Application type: **Web application**
- Name: e.g. `cybersmily web`
- **Authorized JavaScript origins** (add both):
  - `https://cybersmily.ext.jrbhome.net`
  - `http://localhost:4200`
- Authorized redirect URIs: leave empty. The GIS token flow uses postMessage, not redirects.

Save. Copy the **Client ID** (ends in `.apps.googleusercontent.com`). This is the `clientId` value.

### 5. Create the API key

APIs & Services → Credentials → Create credentials → API key.

Immediately edit the new key:

- **Application restrictions** → HTTP referrers:
  - `https://cybersmily.ext.jrbhome.net/*`
  - `http://localhost:4200/*`
- **API restrictions** → Restrict key → check **Google Picker API**

Save. Copy the key. This is the `apiKey` value.

## Wire the values into the app

Edit [`src/environments/environment.prod.ts`](../src/environments/environment.prod.ts):

```ts
export const environment = {
  production: true,
  googleDrive: {
    clientId: '<OAuth Client ID, ends in .apps.googleusercontent.com>',
    apiKey: '<API key>',
    appId: '<Project number — all digits>',
  },
};
```

If you want the Drive buttons to work under `ng serve` locally, fill in the same shape in [`src/environments/environment.ts`](../src/environments/environment.ts). With empty strings, the buttons stay hidden (`isDriveConfigured` returns false) — no broken UI.

## Deploy

```sh
./bin/build && ./bin/deploy
```

After rollout, the character generator toolbar shows two new cloud icons:

- **Cloud-up** — Save current character to Drive. First click triggers Google consent. Subsequent saves update the same file (tracked by the stored `driveFileId`).
- **Cloud-down** — Open the Google Picker to choose a JSON file from Drive. Loading replaces the current character and re-associates the Drive file ID.

## Operational notes

- **Behavior when the token expires:** the next Drive action triggers a silent re-grant via GIS. No user interaction required if they're still signed in to Google in the browser.
- **"Save As" semantics:** not exposed as a separate button. To branch a character, hit Reset (clears `driveFileId`), edit, then Save to Drive — the next save creates a new file.
- **Conflict handling:** none in v1. Last write wins. If you edit the same character on two devices and save from both, the later save overwrites the earlier without warning.
- **Revoking access:** users can revoke at <https://myaccount.google.com/permissions>. The app also has a `signOut()` method on the service if you want to expose a button later.
