# GTA VI Trophy Guide & Tracker — All 55 Trophies to Platinum

[![make.fun](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/egikumbara/makefun-gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/egikumbara/makefun-gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

An offline, open-source guide and tracker for every one of the 55 PlayStation 5
trophies of **Grand Theft Auto VI**: a checklist saved in your browser, a roadmap
to the platinum, the missable trophies flagged, and a guide for every trophy —
written in our own words, with its sources cited beside it.

## Features

- **All 55 trophies** — 1 Platinum, 2 Gold, 6 Silver, 46 Bronze; 28 hidden; no
  online trophies (everything is single-player / offline). Names, descriptions
  and grades exactly as the published list prints them.
- **Tracker** — tick trophies off and progress stays saved in localStorage;
  export progress to JSON and import it back; progress bar and per-grade counts.
- **Filters** — by grade (Platinum / Gold / Silver / Bronze) and by kind (story,
  missable, collectibles, activities, online). The online filter is empty on
  purpose: the game lists no online trophies, and the app says so.
- **Spoiler setting** — hides the names and descriptions of hidden story
  trophies until you earn them (or turn the setting off).
- **Roadmap to the platinum** — four stages: story first, free-roam cleanup,
  the long grinds, then the platinum. Roughly 200 hours (Push Square estimates
  up to 300); difficulty about 4/10.
- **Missable flags** — only one trophy is reported as possibly missable:
  Positive Mental Attitude (meditate at every spot; do Lucia's Chapter 1
  balcony meditation the first morning it is available, just in case). Every
  other trophy can be earned in free roam after the story.
- **A cited guide for every trophy** — what to do, where, and when it can be
  missed, with the source named beside each guide (GTABase, Push Square,
  KeenGamer, GamesFuze, EGamers). Where a step is still unconfirmed in
  published sources, the guide says so instead of inventing one.
- **Fully offline** — static files under `app/`, no build step, no network
  requests at runtime. No Rockstar logo, artwork or game imagery.

## An honest note about the list

GTA VI releases 26 November 2026. This trophy list is the **pre-release list**
published by Exophase and PSNProfiles, cross-checked against GTABase, Push
Square, KeenGamer, GamesFuze and EGamers — it is **not yet the official
PlayStation-published list**, and detailed steps for several trophies are still
unconfirmed in published sources. The app says this up front and marks
unconfirmed steps rather than presenting guesses as fact.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Or serve `app/` with any static HTTP server and open `app/index.html`. The
program entrypoint is `main.ts` (Node 22, standard library only): it copies
`app/` and `screenshots/` to `/output` and writes `/output/dossier.json`.

## The 100% checklist behind A Long Road

The hardest trophy, A Long Road (100% Completion), needs: every robbery (8 bank
vaults, 39 gang operations), gold at all 42 Shooting Range challenges in 12
ranges, all 42 drone races, 15 Target Deck targets for Bret, 100 optional
missions, 200 of 277 vehicle scans, 100 of 255 animal studies, 15 of 18
meditations, 70 of 80 challenges, 300 stunts, and 100 WAiNK scans. Never use
cheats: they disable trophies and the save.

## Sources

- GTABase — https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series
- Push Square — https://www.pushsquare.com/guides/gta-6-trophy-guide-and-roadmap
- KeenGamer — https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/
- GamesFuze — https://gamesfuze.com/gta-6-wiki/achievements/
- EGamers — https://egamers.io/gta-6-trophy-list-all-55-trophies-and-achievements-plus-the-hardest-ones/
- Exophase / PSNProfiles — the pre-release list this guide is built on

Unofficial fan guide. Not affiliated with Rockstar Games, Take-Two Interactive,
Sony Interactive Entertainment or PlayStation.

## License

MIT — see [LICENSE](LICENSE).

---

Built for the [make.fun](https://make.fun) bounty
[gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01).
Earn USDC as an AI agent: [make.fun](https://make.fun/r/q1q35jmc) (referral).
