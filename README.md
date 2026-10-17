# Emily: VSL Funnel + Quiz Funnel (2026-10-16)

Built from Emily's 10-16-2026 live workshop recording (transcribed locally, `../2026-10-16 - Webinar Transcript/`), her live funnel pages (`go.` / `join.themedicarecoach.com`), and `Emily/brand/`.

Skills used: `vsl-master-architect` for the script, and `um-toolkit:page-architect` for both funnels, using the `vsl-landing` and `quiz-funnel` page-type specs (multi-page architecture, each step its own URL).

## What's here

| File | What it is |
|---|---|
| `01-VSL-Script.md` | A 13-minute VSL script with on-screen and B-roll cues, plus the list of items for Emily to confirm |
| `vsl-funnel/index.html` | VSL landing page: pre-frame, player, Golden Ticket Window diagram, 5 steps, reviews, about Emily, FAQ |
| `vsl-funnel/enroll.html` | Offer page: 4 steps + 4 bonuses, a price card, and a hand-off to the live checkout |
| `vsl-funnel/welcome.html` | Post-purchase welcome page with a 3-item prep checklist (template for GHL's thank-you step) |
| `quiz-funnel/index.html` | Pre-quiz landing page for the Medicare Readiness Check |
| `quiz-funnel/quiz.html` | 9 questions, 2 interstitials, contact gate, loading screen |
| `quiz-funnel/results.html` | Personalized Medicare Readiness Report: 5 profiles, 4 exposure meters, "you said" reasons, offer |
| `assets/` | Shared design system (`tmc.css`), behaviour + live checkout config (`tmc.js`), images taken from her live pages |

## Decisions I made without a sign-off (Phil said none was needed)

page-architect normally stops for an angle pick, a visual pick, and an H1 pick. I made those calls myself:

- **Angle:** "The One-Time Medicare Decision." It applies the creative direction lock: the wealth qualifier ("saved $100,000 or more?", lowered from $500K on 2026-10-17 per Phil) is the hook, the enemy is the incentive structure, the stake is doctors and savings together, and irreversibility (the 6-month supplement window) carries the urgency. There are no deadlines anywhere.
- **Mechanism names come from Emily's own words:** the "golden ticket" window and her "five-step process." Nothing was invented.
- **Visual:** Emily's own hook-band ad format (black band, white line, red line) used as the signature device, so ads and pages look like one system. Brand navy, deep navy and red, Cabin type. Her real photos, logo and published reviews come from her live pages. No AI images.
- **VSL page type:** `vsl-landing` with a buy-now hand-off, not book-a-call. That matches how her webinar sells, which is straight to checkout.

## Live destinations (one config: `assets/tmc.js`)

- Full pay: `https://join.themedicarecoach.com/mec-bonus` ($2,500 struck through, $1,497 one-time). This is where her webinar's `/bonuses` link redirects.
- Two payments: `https://go.themedicarecoach.com/mec-two-payments` (2 x $749)
- Free workshop (the "already on Medicare" quiz result): `https://go.themedicarecoach.com/free-workshop`
- Couples: per her webinar, choose the couple option at checkout, and the second person is +$700.

## Before these see paid traffic

1. **Record the VSL.** Until then, the player plays Emily's clean 76-second "Over 500k Savings" cut (`assets/video/emily-500k-76s-interim.mp4`, 11MB, 540x960), which says "over $500,000", a subset of the $100K+ headline, so it still fits. When the full VSL exists, set `data-src` on `.player` in `vsl-funnel/index.html` to that MP4 (captions burned in).
2. **Quiz wiring.** Answers and the contact gate stay in the visitor's browser (sessionStorage). Nothing is sent anywhere yet. The gate already carries email + call/text consent wording; have Emily's compliance contact approve it before any number is dialed. To go live, post the gate (first name, email, phone, plus answers as custom fields) to a GHL form (a new "Readiness Check" form, or reuse "Workshop Opt-In") and tag the result profile. The hook is the `submit` handler in `quiz.html`.
3. **Rebuild in GHL or host.** These are static HTML pages. Either host them (the deploy workflow) or rebuild them as GHL funnel steps using these files as the spec. Keep the checkout links pointing at the live GHL checkouts.
4. **Emily confirms** the items at the bottom of `01-VSL-Script.md`:
   - press line (Business Insider / Yahoo Finance), left out until confirmed
   - the "65% changed plans" stat
   - the satisfaction wording versus the 3-day service agreement
   - whether VSL traffic gets $1,497
   - permission to use the workshop client stories in paid media
5. **Quiz routing:** joining within 12 months goes to the Concierge checkout. More than a year out goes to the VSL page (with "come back inside 12 months"). Already on Medicare goes to the phone line, because the Concierge is a joining-Medicare product and the free workshop page currently runs a countdown (banned by the brand guide). If she wants a direct offer for the $297/$700 annual review, add its checkout link.
6. **`welcome.html` is a template.** The live checkout redirects to its own GHL thank-you page; point it here, or copy the prep checklist into that page.

## Pre-ship review

A cold reviewer checked every page and the script against the transcript, brand guide and review set. Fixed:
- the empty player and internal note
- a quiz email promise that nothing delivered
- missing call/text consent
- the struck $2,500 anchor
- the "make it right" line
- untraceable claims ("no ceiling", "most" research hospitals, "most clients tell us", the quiz "built by Emily's team", the countries stat)
- third-party health stories
- the Part B start of the 6-month window
- a double-tap skip bug
- question order for parent wording
- results routing by qualifier
- the sample-score mismatch

Still open: the Emily confirmations above.

## Test plan (pre-registered)

Each page carries `data-ab="h1"` on the headline block.

1. **Headline** (VSL page):
   - A: "Saved $100,000 or more? Standard Medicare advice wasn't built for you."
   - B: "You may only get one chance to pick the right Medicare plan."
   - C: "The plan I would have picked for my dad was absolutely not the right decision."
2. **Poster frame:** Emily red-top portrait versus her yellow-background portrait (the yellow one needs a higher-resolution file from her).
3. **Quiz hook:** "How ready are you?" versus "$100K+ saved? See how exposed your savings are."

Decision rule: run to 100 checkout clicks per arm, or 14 days. Pick the winner on cost per checkout start, not on CTR.

## Matched ads (same message as each page)

- **VSL feed ad:** a 60-second cut of the script (Lead + Golden Ticket Window + CTA) in the hook-band format. Line 1: "Saved $100,000 or more?" Line 2 in red: "Standard Medicare advice wasn't built for you."
- **Quiz static:** a black band with "You may only get one chance to pick the right Medicare plan." / "How ready are you? 2-minute check." and Emily's cut-out on the right.
- **Quiz retargeting:** the Golden Ticket timeline graphic, "6 months. That's your window." Then: "Take the 2-minute Readiness Check."
