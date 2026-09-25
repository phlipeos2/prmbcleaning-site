# PRMB Cleaning — SEO Execution Report

Date: September 25, 2026
Scope: website, Google Search Console, Google Business Profile, local competitors and AI-search discoverability

## Executive result

The website has moved from a one-page SEO footprint to an eight-URL, internally linked service architecture without redesigning the existing homepage. The implementation adds real 404 handling, crawler controls, corrected hours, static FAQs, structured data, canonical redirects, a complete sitemap, an `llms.txt` discovery guide and automated quality gates.

All eight indexable routes passed the local SEO validator and Lighthouse. Final Lighthouse results were 91–99 for performance and 100 for accessibility, best practices and SEO.

The foundation is live in production. Public verification confirmed the expected 200/301/404 behavior, asset caching and security headers. The final GitHub Actions run passed across all eight routes.

## Operational execution on September 25

- Resubmitted the eight-URL sitemap in Search Console.
- Started validation for the legacy soft-404 and old 5xx issue groups.
- Requested priority indexing for the service hub, commercial cleaning, house cleaning and service-area pages.
- Submitted a factual GBP description and replaced the statewide area with Salt Lake City, Provo, Ogden and Park City; Google review is pending.
- Rewrote all ten GBP service descriptions to remove unverified claims and clarify scope.
- Responded to the only unanswered review; the response is published and visible as the owner.
- Generated three realistic editorial images without people, logos or fake job claims.
- Published the first commercial-cleaning GBP update with a direct service-page link.
- Moved `www.prmbcleaning.com` from the stale origin to the Cloudflare Pages project; both apex and `www` are now active with SSL.
- Prepared a host-level 301 redirect from `www` to the apex. Cloudflare displayed a final DNS warning, so deployment is waiting for a specific owner confirmation.
- Found older public GBP posts with a wrong phone number, stale hours/coverage and unsupported claims. Their deletion is waiting for a specific owner confirmation.
- Prepared a prioritized local-authority plan and four-week evidence-first content calendar.
- Added a defensive AOS initialization guard so a blocked animation CDN cannot create a JavaScript exception or impair page behavior.
- Final local rerun passed all eight routes: SEO 100, accessibility 100, best practices 96 and performance 92–100. The remaining best-practices deduction is caused by external-resource requests being blocked in the local audit environment, not a site JavaScript error.

## Baseline before publication

### Google Search Console — previous three months

- 5 clicks
- 572 impressions
- 0.9% CTR
- Average position 29.3
- 1 indexed page; 12 excluded/not indexed
- 6 impressions in Google generative-AI features
- 100% of regular and generative impressions attributed to the homepage

Observed search demand is concentrated in commercial cleaning, including Provo and Salt Lake City variants. This is why the Commercial Cleaning page is an early priority.

### Google Business Profile — April through September 2026

- 5 interactions
- 312 viewers
- Fewer than 50 searches
- 5.0 rating from 9 Google reviews
- 8 reviews answered; 1 unanswered
- Google reports that photos have not been updated for 566 days

### Authority

Search Console recognizes only five external links: three from YellowPages and two from iHeartSLC, all pointed to the homepage. No useful internal-link report existed because the old site had almost no crawlable page architecture.

## What was implemented and why it matters

| Change | Practical impact |
|---|---|
| Service hub plus five service pages | Gives Google and AI systems a dedicated answer source for each commercial intent instead of forcing the homepage to rank for everything. |
| Service-area page | Explains the published geography without creating thin doorway pages for dozens of cities. |
| Eight-URL sitemap | Helps discovery and lets Search Console measure each intent separately. |
| Real `404.html` | Stops unknown legacy URLs from returning the homepage as a false 200/soft 404. |
| Canonicals and 301 redirects | Consolidates `/privacy-policy.html`, `/privacy-policy/` and `/about/` legacy signals. |
| Correct Monday–Saturday hours | Aligns the website and structured data with the current Google profile. |
| Static FAQ HTML | Makes answers readable without JavaScript and easier for crawlers and assistive technology to understand. |
| LocalBusiness, WebSite, Service and Breadcrumb data | Clarifies the relationship between the company, website and service pages. |
| OpenAI/Anthropic crawler declarations | Documents that search/user agents are allowed. Google AI still relies on normal Googlebot indexing. |
| `llms.txt` | Provides a concise discovery guide for systems that choose to use it. Google states that it does not affect Google rankings. |
| Security/cache headers | Adds HSTS, `nosniff`, safer referrer policy and predictable caching on Cloudflare Pages. |
| Lighthouse GitHub workflow | Prevents future changes from silently breaking SEO, accessibility or best-practice thresholds. |
| Durable project memory | Preserves baselines, decisions, access context, risks and the next action across recurring runs. |

## Competitive position

Alta Janitorial currently has stronger quantitative proof, a deeper service/location architecture and more than 100 reviews. B-CLEAN USA combines service pages, Utah County locality pages and a clear process. Wasatch Cleaners uses hyperlocal detail, starting prices and time expectations.

PRMB should not copy their pages. The differentiated opportunity is:

- specific service scopes with exclusions and preparation guidance;
- real job photos and short case studies from Utah projects;
- honest owner expertise and named authorship;
- commercial pages tied to verified facility experience;
- fewer, stronger city pages only after there is real proof in those markets;
- faster, documented review and lead-response operations.

## AI-search strategy

The foundation is the same for Google AI Overviews/AI Mode, ChatGPT Search, Claude and Grok: crawlable pages, clear entity facts, original evidence, internal links and corroborating third-party mentions.

- Google already recorded 6 generative-AI impressions from the homepage.
- `OAI-SearchBot` and Claude search/user agents are allowed.
- No speculative Grok crawler directive was added because no authoritative xAI crawler identity was found.
- The next gains should come from real case studies, fresh photos, consistent citations and service-specific pages being indexed—not from creating hundreds of AI-written articles.

## 15/30/45/60-day expectations

These are directional scenarios, not guarantees. The old site produced only five clicks in three months and no GA4 conversion baseline exists, so the first month should be judged by indexation and impressions before traffic volume.

### 15 days

- Google discovers the eight sitemap URLs and begins replacing legacy exclusions.
- Three to eight pages may be indexed, depending on crawl timing and perceived quality.
- Commercial/service queries should begin appearing against the new URLs.
- GBP should show the approved profile edits, first editorial image/post and review response after Google processing.

Reasonable signal range: 100–400 new Search Console impressions and 3–15 clicks, with high uncertainty.

### 30 days

- Service pages have initial query/page data for title and content refinement.
- Internal links are visible in Search Console.
- GBP service/category/area improvements and first activity posts are live, if approved.
- Conversion tracking should separate form, call and SMS actions.

Reasonable signal range: 400–1,500 impressions and 10–45 organic clicks in a rolling 30-day period. Reaching 700 organic visits in the first month would be an outlier and should not be promised.

### 45 days

- The best-performing service and locality combinations receive content expansion based on real queries.
- First real project case study and customer-photo updates support experience and corroboration.
- Citation cleanup and a small number of locally relevant links begin to strengthen authority.

Reasonable signal range: 800–2,500 impressions and 20–75 organic clicks in a rolling 30-day period.

### 60 days

- Two full indexing/content feedback cycles have occurred.
- Pages with weak CTR can receive evidence-based title/description tests.
- GBP activity, review velocity, photos and website landing pages operate as one local-search system.
- A decision can be made on whether one or two verified city pages deserve investment.

Reasonable signal range: 1,500–5,000 impressions and 35–140 organic clicks in a rolling 30-day period. The 700-visit stretch target likely needs a longer runway, sustained authority work and proven content—often several months, not weeks.

## Immediate next steps

1. Ask Google to reread the existing sitemap and validate resolved coverage issues after action-time approval.
2. Confirm the real-world business name before changing the GBP name.
3. Confirm the genuine service radius/base city before replacing the overly broad `Utah` area.
4. Publish the prepared reply to Leo’s review after action-time approval.
5. Use the approved generated images only as editorial illustrations; never as completed PRMB work or before/after evidence.
6. Choose or create the correct GA4/GTM property and track form submits, calls and SMS.
7. Reconcile name, phone, URL and description on YellowPages, iHeartSLC, Thumbtack, Facebook and Instagram.
8. Claim Apple/Bing/Yelp/Nextdoor one at a time after the owning account and private verification details are confirmed.
9. Create the first evidence-rich case study when a real project record and client permission are available.
10. Deploy and verify the prepared `www` 301 after confirming the Cloudflare warning; review Search Console/GBP metrics every three days.

## Items that still require owner validation

- official real-world business name;
- base city and profitable service radius;
- services and claims that can be proven operationally;
- licensing, insurance, eco-friendly and satisfaction-guarantee wording;
- GA4/GTM account ownership;
- owning accounts and private verification details for third-party citation profiles;
- permission and source material for any real-project case study.

## Supporting deliverables

- `docs/seo/LOCAL_AUTHORITY_PLAN_2026-09-25.md`
- `docs/seo/CONTENT_CALENDAR_2026-10.md`
- `docs/seo/GBP_PLAYBOOK.md`
- `assets/seo/prmb-commercial-cleaning-utah-editorial-2026-09.png`
- `assets/seo/prmb-house-cleaning-utah-editorial-2026-09.png`
- `assets/seo/prmb-move-out-cleaning-utah-editorial-2026-09.png`
