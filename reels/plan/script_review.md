# Script review system (v1, 12 Nov 2026)

Every script gets two reviews before any voiceover is recorded or reel is built: **Pass 1, the Expert** and **Pass 2, the ICP viewer**. A script ships only when both passes are clean. The daily run writes both reviews into `plan/reviews/<date>_<reel>.md` so the weekend rewind can compare predictions with real Instagram numbers.

## Word budget (fact, measured)
Our ElevenLabs voiceovers, after pause-trimming, run at **~2.9 words per second** (7 reels measured: 2.74–3.11 w/s).

| Reel type | Target length | Max VO words |
|---|---|---|
| A · series value reel | 20–24 s | 60 |
| B · pure virality | 9–15 s | 35 |
| C · test / cut-down | 7–12 s | 28 |

Over budget = cut, not speed up the voice.

## How to cut (the order matters)
1. **One message.** Write the message in one sentence. Any line that doesn't serve it goes.
2. **One number.** Keep the strongest statistic. A second stat in the VO goes on screen instead, or is cut.
3. **Source on screen, not in the voice.** "In Baymard's research, forty percent…" → "Baymard: forty percent…" plus a source line.
4. **The cut test, line by line.** Remove each line and reread the script. If the point survives, the line stays out.
5. **Show, don't say.** If the visual already shows it (a price rising, a phone tapping), the VO doesn't describe it.
6. **But / therefore, never "and then".** Each beat should turn the last one ("She's ready… but shipping, forty-nine… so she's gone"). A list of facts joined by "and" is where viewers leave.
7. **Kill warm-ups.** No "So,", "Here's the thing", "Let me tell you", "In this video". Start on the image or the number.
8. **End on the payoff line, then one CTA.** Nothing after the CTA.

## Pass 1: Expert review (CRO strategist + short-form editor)
Score each item PASS / FIX, with the fix written in.
1. **Fact check.** Every number has a named source and date in the script notes. Illustrative figures are labelled "example" on screen. Demo stores are labelled demo.
2. **One message** stated in one sentence.
3. **Hook (0–2 s).** Shows WHAT the reel is about, visually and in words, by second 2. Specific (a number, a ₹ price, a named moment), not a generic question.
4. **Turn by ~5 s.** A reversal, a "but", or a stakes line arrives before the viewer settles.
5. **Open loop.** Something is unresolved until the payoff (why she left, what the fix is).
6. **Silence before impact.** ~0.4 s pause before the key number.
7. **Payoff matches the hook.** The ending answers the exact question the opening raised. No bait.
8. **Word budget** met (table above).
9. **Spoken-word test.** Read aloud. No written-English phrases, no tongue-twisters, numbers said the way Indians say them ("nine sixty-seven", "forty-six lakh").
10. **CTA** is one specific action (Comment STORE / Save / Send to a founder), matching the test plan.
11. **Brand rules.** VO + SFX only, no music; no invented results; no competitor named on screen.

## Pass 2: ICP viewer review (simulated, then checked against real data)
Read the script as **Profile A** from `icp-final-v2`: an Indian Shopify D2C founder or marketing lead in fashion, beauty or home, running Meta ads, scrolling Reels on a phone between tasks. In their words: "Ads get clicks but nobody buys."

Walk the script in these windows. For each, write **KEEP** or **SKIP** and the reason in the founder's own voice (one line).

| Window | The founder's question | Skip if… |
|---|---|---|
| 0–3 s | "Is this about me and my store?" | it opens on a generic shopper, a brand name I don't know, or a vague claim |
| 3–8 s | "Is this something I don't already know?" | it states the obvious ("reviews matter") without a twist |
| Middle | "Is this still going somewhere?" | a second stat, a list without a turn, or a line the visual already showed |
| Last 3 s | "What do I do on Monday?" | the fix is vague ("optimise your checkout") or there is no fix |

Then answer:
- **Would they save it?** (Only if there's a fix they can apply.)
- **Would they comment STORE?** (Only if they now suspect their own store has this leak.)
- **Would they send it to someone?** (Only if it names a feeling they've had.)

Any SKIP → rewrite that window, then re-run both passes on the changed lines.

**Label (interpretation):** Pass 2 is a simulation by Claude, not data. Its job is to catch obvious skip points before we spend a voiceover. The real judge is Instagram's **skip rate** (viewers who scroll away in the first 3 seconds) and the **retention graph** in Reel insights. The weekend rewind compares each predicted SKIP window with where the real retention line actually drops, and updates this rubric when the simulation is wrong.

## Weekend rewind inputs (per reel)
Predicted skip windows · actual skip rate · retention graph drop points · saves · shares · STORE comments · profile visits · audit DMs. Judge by STORE comments and audit DMs, not views.

---

## Worked example: Reel 20, "The surprise at checkout"

**v2 (85 words, ~29 s, over budget)**
> Eight ninety-nine. She's ready to pay. … Shipping, forty-nine. … Platform fee, nineteen. … Nine sixty-seven. She's gone. In Baymard's research, forty percent of shoppers who abandoned checkout said extra costs were too high. Twelve percent couldn't even see the total up front. She wasn't upset about forty-nine rupees. She was upset she found out last. So show delivery on the product page. Put "free delivery above nine ninety-nine" right under the price. Let the last number… be the first number she saw. Save this.

**Pass 1 (Expert)**
- Fact: PASS (Baymard, updated 28 Oct 2026; prices labelled example).
- Hook: PASS. A rising ₹ price is specific and visual.
- Word budget: **FIX**, 85 words vs 60.
- One number: **FIX**. "Twelve percent" dilutes "forty percent". Moved to the screen.
- Source in voice: **FIX**. "In Baymard's research" → "Baymard found".
- Fix lines: **FIX**. Two fix lines say the same thing; keep the specific one.

**Pass 2 (ICP)**
- 0–3 s: KEEP. "₹899, that's my AOV." Specific price reads as their store.
- 3–8 s: KEEP. The price climbing is the open loop.
- Middle: **SKIP risk**. "Twelve percent couldn't see the total" is a second stat with no new turn.
- Last 3 s: KEEP. "Under the price" is a Monday task.
- Save: yes. STORE comment: likely if they charge a COD or platform fee.

**v3 (58 words, ~20 s)**
> Eight ninety-nine. She taps Buy. … Shipping, forty-nine. … Platform fee, nineteen. … Nine sixty-seven. … She's gone. Baymard found forty percent of shoppers who quit checkout blamed extra costs. She wasn't upset about forty-nine rupees. She was upset she found out last. Show delivery cost right under the price. Let the last number… be the first number she saw. Save this.

Screen only: "12% couldn't see the total up front · Baymard, Oct 2026" · "Example prices".
