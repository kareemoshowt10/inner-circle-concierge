# 03 — AI Concierge Playbook

This is the product. Every install follows the same repeatable build so quality is consistent and delivery hours stay inside package scope.

## The stack

| Layer | Options | Notes |
|---|---|---|
| AI brain | Claude (claude.ai / Claude API) or ChatGPT | Claude Projects work well as a per-property concierge with the knowledge base attached |
| Knowledge base | House manual, FAQ doc, local recs, policies | The real product — the AI is only as good as this |
| Messaging | PMS/channel manager (Hostaway, OwnerRez, Guesty, Hospitable) native AI or inbox; or Airbnb/VRBO inbox + templates | Use the client's existing PMS AI features first; add custom AI where they fall short |
| Guidebook | Touch Stay, Hostfully guidebook, or a simple web page | Linked in every pre-arrival message |
| Automation | PMS message scheduling; Zapier/Make for cross-tool flows | Keep it boring and reliable |

## Build sequence (per property)

1. **Intake (30–45 min call):** property details, guest pain points, existing tools, message history export.
2. **Knowledge base build:** mine past guest messages for the top 25 real questions; write the house manual, FAQ, and local recommendations in the owner's voice.
3. **AI concierge setup:** create the assistant (e.g., a Claude Project per property), load the knowledge base, write the system prompt (tone, boundaries, escalation rules: pricing, refunds, and complaints always go to the human).
4. **Message sequences:** install the 6-touch flow — confirmation, pre-arrival (with guidebook link), check-in day, mid-stay check, checkout, review request — plus upsell touches where the PMS supports them.
5. **Test:** run the 25 questions through the assistant; fix gaps. Send a full test booking through the sequence.
6. **Handoff:** live walkthrough with the owner; leave a one-page "how to update your knowledge base" cheat sheet.

## Computer & workstation setup (Full Install and up)

- Machine health check and updates; browser profiles separated (personal vs. business)
- Password manager installed, accounts migrated
- Cloud backup configured (documents, photos, knowledge-base files)
- All AI tools installed, signed in, and pinned; PMS and bank/booking logins secured with 2FA
- One-page "your setup" reference sheet

## Escalation rules baked into every install

The AI never handles: refunds/discounts, complaints/damage, emergencies, anything legal. Those route to the owner with a suggested draft. This keeps the AI a trust builder rather than a liability.

## Delivery checklists (scope control)

- **Quick Start:** steps 1–6 for one property. No automation beyond the PMS scheduler. One handoff call.
- **Full Install:** steps 1–6 × up to 3 properties + workstation setup + 90-min training.
- **Portfolio System:** everything + owner dashboard (Notion/Sheets), SOP docs, team training, 30-day support window logged against a checklist.

Anything outside the checklist is a change order quoted separately — this is what keeps effective $/hr above target.

## Own-portfolio demo

Before selling install #1, the full stack runs on Adventure Family Getaways' own properties. That produces: before/after response-time stats, screenshots for marketing, and the confidence of having debugged everything on home turf. Guests of the own portfolio get the best version of the product for free — which is also the review engine for the rental business itself.

A working reference implementation of this build, running on the La Quinta desert retreat property, lives in [`/concierge-demo`](concierge-demo/README.md).
