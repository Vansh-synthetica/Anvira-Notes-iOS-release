# Anvira Notes for iPad and iPhone

Study notebooks, flashcards with spaced review, guide tools, timed tests, drawing and messages — the touch app from [Anvira Notes](https://github.com/Vansh-synthetica/anvira-notes-ios-dev)' `ios` branch, published here in two forms that can run on an iPad or iPhone without an Apple Developer account:

- **a web app (PWA)** you can install right this second from Safari, and
- **unsigned `.ipa` builds** (in [Releases](https://github.com/Vansh-synthetica/Anvira-Notes-iOS-release/releases)) that a PC/Mac sideloader can install.

Nothing here is App Store–signed yet, so both paths are personal installs, not distribution.

---

## Install the web app (fastest: no Mac, no cables — iPad or iPhone alone)

1. Open **Safari** on the iPad (Safari specifically — Chrome/Firefox on iOS do not add home-screen apps).
2. Go to **https://vansh-synthetica.github.io/Anvira-Notes-iOS-release/**
3. Tap the **Share** button · scroll and tap **Add to Home Screen** · tap **Add**.
4. Open "Anvira Notes" from the home screen — it runs full screen like an app, remembers its window and keeps working offline once loaded. The app icon is the Anvira skull.

Inside the app, sign in with the Anvira account you were given; your notebooks and drawings stay on the device in Safari's home-screen storage, the account server only carries sign-in, sharing and messages.

## Install a release build (.ipa) from a computer

The `.ipa` in Releases is **unsigned** (code signing needs a paid Apple Developer account, which this project has not attached yet). Install either way:

- **AltStore / SideStore** (recommended): install AltServer on the PC, connect the iPad with a cable, then open the `.ipa` with AltStore. The free Apple ID used for signing must first be trusted on the iPad (Settings → General → VPN & Device Management).
- **Sideloadly**: cable-connected install with the same free-Apple-ID rule (7-day signing; re-sign after a week).

These binaries are built by the private CI on a real Mac (Xcode 26, iOS 26 min). The `sha256` files are checksums: on a PC, `certutil -hashfile Anvira-Notes-1.0.0.ipa SHA256` and compare.

## Releases

| File | What it is |
| --- | --- |
| `Anvira-Notes-x.y.z.ipa` | The whole iPhone/iPad app, zipped, unsigned — install with a sideloader above |
| `Anvira-Notes-x.y.z.ipa.sha256` | Checksum to confirm the download is intact |

## About this repo

This repository holds **built app artefacts only** — the PWA site on the `gh-pages` branch and binaries in Releases. Source stays in the private development repo.
