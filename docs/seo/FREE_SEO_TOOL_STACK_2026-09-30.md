# PRMB Cleaning — Free and Low-Cost SEO Tool Stack

Date: 2026-09-30  
Scope: `prmbcleaning.com` and only the PRMB Cleaning Google Business Profile.

## Selection principle

A tool enters the stack only when it produces a decision or an action that the current stack cannot already produce reliably. More dashboards do not create rankings. The useful outputs are: technical defects fixed, new queries discovered, indexation improved, local visibility measured, conversion friction removed, or legitimate authority opportunities found.

## Adopt now

| Tool | Cost | Job in this project | Access/data required | Success test |
|---|---:|---|---|---|
| [Ahrefs Free / Webmaster Tools](https://ahrefs.com/webmaster-tools) | Free for verified properties | Independent crawl, backlink/keyword discovery and health history | Ahrefs account and proof of ownership; prefer verification through the existing Search Console property | Project verified, first crawl completed, findings reconciled with the internal validator and GSC |
| [Microsoft Clarity](https://clarity.microsoft.com/) | Free | Heatmaps and session behavior to improve quote, call and text conversion | Clarity project ID and sitewide tag | Live collection verified, form inputs masked, cookies disabled until consent, privacy disclosure published |
| [Bing Webmaster Tools](https://www.bing.com/webmasters/) | Free | Bing indexing, search performance and site diagnostics | Import of the verified GSC property or another verification method | Property verified, sitemap accepted and baseline exported |
| [IndexNow](https://www.indexnow.org/) | Free/open protocol | Notify participating engines quickly when canonical URLs are added, changed or removed | A site verification key and endpoint implementation | A changed test URL is accepted and logs show a successful submission |

## Use on demand without installing

| Tool | Cost | Best use | Decision |
|---|---:|---|---|
| Google Search Console | Free | Authoritative Google queries, pages, indexing and enhancements | Already core; inspect every 15-day audit |
| Google Analytics 4 | Free | Sessions and lead events for calls, texts, email and forms | Already installed; use for outcomes, not rank estimates |
| Google Rich Results Test | Free | External validation of deployed structured data | Run after schema changes |
| PageSpeed Insights / CrUX | Free | Field and lab Core Web Vitals | Run at audit cutoffs; local Lighthouse remains the CI gate |
| Google Trends | Free | Seasonality and relative demand | Use for content timing, not absolute volume |
| Google Keyword Planner | Free with a Google Ads account | Commercial/local keyword ideas and volume ranges | Use only when access is available; no campaign purchase is required for this phase |
| AlsoAsked | Three free searches/day at the time reviewed | Real question clusters for service-page FAQs and evidence-led content | Exhaust free quota before considering a plan |
| GridRankTracker | 100 free lifetime credits at the time reviewed | One controlled Google Maps geo-grid baseline | Pilot a small grid for 2–3 high-intent phrases; do not claim that a scan improves ranking |

## Low-cost option to reconsider after the baseline

| Tool | Cost reviewed | Value | Gate before purchase |
|---|---:|---|---|
| [PlePer](https://pleper.com/) | US$18/year, single-business plan | GBP change, duplicate, review and Q&A monitoring plus local research utilities | Buy only if the 15-day manual/automated review misses changes or consumes more time than the fee justifies |

## Reviewed, but not adopted now

| Tool | Reason to defer |
|---|---|
| GMB Everywhere | Useful competitor/category audits, but it is a browser extension with broad page access. Review permissions and request action-time approval before installation. Current web tools cover the immediate need. |
| Screaming Frog Free | Strong crawler and free for up to 500 URLs, but PRMB has eight indexable routes and already runs a custom SEO validator, Lighthouse and Playwright. Low incremental value today. |
| `MelnixDev/seo-crawl-audit` | Local-first and promising, but duplicates the existing crawl/regression gates. Revisit only if the site grows beyond the current validator. |
| `calesthio/PhantomReach` | Broad local-business audit, but it is a newer AGPL application and several useful modules require external API keys. No installation before repository/security review and a demonstrated data gap. |
| `fenjo26/OpenGSC` | Very broad self-hosted GSC/local/AI toolset, but it creates a second reporting platform and requires OAuth/API maintenance. Too much operational surface for the present site size. |
| `Canonry/canonry` | Interesting open-source AEO/analytics concept, but overlaps GSC, GA4, Clarity and the current planning system. Defer until there is a stable need for log-based AI crawler analysis. |

## Microsoft Clarity privacy configuration

Official Microsoft documentation says that sensitive content and every input field are masked by default. For PRMB, the safer operating mode is:

1. Keep masking at least at the default **Balanced** mode; never add an unmask attribute to the quote form.
2. Add `data-clarity-mask="true"` to the quote form as defense in depth before the tag is published.
3. Turn Clarity cookies off in project settings until an explicit consent mechanism is implemented. Cookieless collection is acceptable for the initial heatmap/friction baseline, even though cross-page session continuity is reduced.
4. Do not send names, emails, telephone numbers or other customer identifiers to Clarity through custom IDs or events.
5. Update the privacy policy before enabling collection.
6. Verify both the `/collect` request and the absence of `_clck`/`_clsk` cookies in the no-consent state.

Sources: [setup](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup), [masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking), [consent mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode), [data collection](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data).

## GitHub automation opportunity

[microsoft/clarity-mcp-server](https://github.com/microsoft/clarity-mcp-server) is the strongest new repository found for this phase. It is published by Microsoft under the MIT license and can query Clarity analytics and session recordings from an MCP-compatible client. It can make the 15-day audits faster once useful data exists.

Do not install or connect it yet. It requires a Clarity data-export API token, which is persistent access. After the Clarity project is collecting valid data, review the pinned package version, create a narrowly named token with owner confirmation, store it outside the repository, and run a read-only proof before adopting it.

## Rollout order

1. Owner completes the Google sign-in/account confirmation for Ahrefs and Clarity using `prmbcleaning@gmail.com`.
2. Verify `prmbcleaning.com` in Ahrefs and run the first crawl.
3. Create the Clarity project, record its project ID, keep cookies off and retain Balanced/Strict masking.
4. Add the Clarity tag, explicit form masking and privacy disclosure; test locally and in production.
5. Connect Bing Webmaster Tools and IndexNow.
6. Run one geo-grid baseline and compare it with GBP/Search Console data at the first 15-day cutoff.
7. Only then decide whether PlePer or the official Clarity MCP adds enough value.

