# AI Concierge Demo

A working AI guest-concierge chat app for a real property in the Adventure Family Getaways portfolio — the reference implementation of the build described in [`../03-ai-concierge-playbook.md`](../03-ai-concierge-playbook.md). It's both a live tool guests can use and the demo Kareem shows prospective Inner Circle clients.

Currently loaded property: **Luxury Desert Retreat w/ Pool, Spa & Ultra-Fast WiFi** — La Quinta, CA.

## ⚠️ Placeholder values — swap before real-guest use

Several fields in `data/properties/la-quinta-desert-retreat.json` were not visible in the source listing screenshots and ship as realistic **placeholders**, listed in that file's `_meta.placeholderFields`:

- `logistics.address` — placeholder street address
- `logistics.wifi.networkName` / `logistics.wifi.password` — placeholder credentials
- `logistics.checkInTime` / `logistics.checkOutTime` — placeholder times (4:00 PM / 11:00 AM)
- `logistics.selfCheckIn` — placeholder smart-lock flow
- `host.contactPhone` / `host.contactEmail` — placeholder contact info
- `policies.pets` / `policies.smoking` — default policy proposals, not confirmed by the owner

**Do not point real guests at this app until those fields are updated with real information.**

## Local development

```bash
npm install
cp .env.example .env.local
# edit .env.local and set a real ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## How it works

- `data/properties/<slug>.json` — the property's knowledge base (house info, policies, FAQs, local recs). Pure data, no code.
- `lib/knowledgeBase.ts` — loads the active property's JSON (`PROPERTY_ID` env var, defaults to `la-quinta-desert-retreat`).
- `lib/buildSystemPrompt.ts` — turns the knowledge base into the system prompt, including hard rules that the AI never handles refunds, complaints, damage, emergencies, or legal matters — those get escalated to the host instead.
- `app/api/chat/route.ts` — the only place that calls the Claude API (`ANTHROPIC_API_KEY` read server-side only, never exposed to the browser).
- `components/ChatWindow.tsx` — the chat UI; when a reply is flagged for escalation, it shows a "contact the host" card instead of trying to resolve the issue itself.

## Adding a new client property

This is the reusable template referenced in the playbook — each new Inner Circle client gets their own copy:

1. Copy `data/properties/_template.json` to `data/properties/<slug>.json` and fill in every field.
2. Set `PROPERTY_ID=<slug>` in that deployment's environment variables.
3. Deploy as its own project (one property per deployment, matching the "per-property" build sequence in the playbook).

## Deployment

Deploy the `concierge-demo` directory as its own Vercel project (or any Next.js host). After deploying, set these environment variables in the hosting dashboard — **the real API key should never be pasted into a chat with an AI assistant or committed to git**:

- `ANTHROPIC_API_KEY` — your Anthropic API key
- `PROPERTY_ID` — optional, defaults to `la-quinta-desert-retreat`

## Known limitations (prototype scope)

- No persistence — chat history resets on page reload.
- No authentication or rate limiting beyond a basic message-length guard; fine for a demo, not for high-traffic production use.
- One property per deployment.
- Not wired to any PMS/channel manager (Hostaway, Guesty, etc.) — standalone prototype only.
