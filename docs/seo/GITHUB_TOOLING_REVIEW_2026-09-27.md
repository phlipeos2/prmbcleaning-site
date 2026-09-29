# PRMB Cleaning — revisão de ferramentas open source e busca por IA

Data: 27 de setembro de 2026
Princípio: ferramenta reduz risco ou aumenta informação; não cria ranking sozinha.

## Decisão executiva

- **Manter agora:** Lighthouse, Playwright, GitHub Actions, `ripgrep` e GitHub CLI.
- **Adicionar no ciclo 0–15:** Lychee para links externos, Nu Html Checker para validade HTML e relatório informativo de Lighthouse Agentic Browsing.
- **Preparar agora e ativar com confirmação:** Bing Webmaster Tools + IndexNow.
- **Pilotar nos dias 31–45:** OpenSEO, privado, versão fixada, crédito limitado e sem expor modo sem autenticação.
- **Reavaliar depois:** SEOnaut, SerpBear e GBP API oficial.
- **Não priorizar:** Google Preferred Sources, containerização do site, wrappers aleatórios de IndexNow, clientes não oficiais de GBP e ferramentas de backlinks/reviews automáticos.

## Avaliação

| Projeto | Estado/versão observada | Benefício | Custo/risco | Decisão |
|---|---|---|---|---|
| [OpenSEO](https://github.com/every-app/open-seo) | MIT, ativo, 0.1.9 em 17/09/2026; projeto jovem 0.x | Pesquisa de concorrentes, backlinks, grid local e visibilidade direcional em IA | Dados úteis dependem de DataForSEO/créditos; Docker/credenciais; telemetria opt-out; `local_noauth` não pode ficar exposto | Piloto D31–45 para 10–20 consultas e grid 3×3, se custo aprovado |
| [Lighthouse](https://github.com/GoogleChrome/lighthouse) | Apache-2.0, oficial; 13.5.0 já fixado | Performance, SEO, acessibilidade, boas práticas e auditorias emergentes para agentes | Score técnico não prova relevância/ranking | Manter; Agentic Browsing separado e não bloqueante |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Oficial, 0.15.1 observado | Histórico e regressão por commit | Servidor completo é excesso para oito URLs | Workflow atual é suficiente; reavaliar histórico depois |
| [Playwright](https://github.com/microsoft/playwright) | Apache-2.0, oficial; 1.63.0 já usado | Testa canonical, telefone, formulário, 404, mobile e JavaScript real | Tempo de CI e browser | Manter e estender para produção/conversão |
| [Lychee](https://github.com/lycheeverse/lychee) | MIT/Apache-2.0, ativo; 0.24.2 e action 2.9.0 observados | Links externos quebrados em HTML/Markdown e CI | 403/429 podem gerar falso positivo | Adotar semanal/PR com versão/SHA fixo, retry e triagem |
| [Nu Html Checker](https://github.com/validator/validator) | MIT, oficial/ativo | HTML/CSS/SVG semanticamente válido em todas as rotas | Novo binário/container no CI | Adotar D0–15 com imagem/digest ou pacote fixado |
| [llms.txt](https://github.com/AnswerDotAI/llms-txt) | Apache-2.0; especificação emergente | Índice conciso para consumidores que optam por usá-lo | Sem garantia de crawl, citação ou ranking; risco de drift | Manter e validar contra sitemap/fatos; baixa prioridade |
| [IndexNow](https://www.indexnow.org/documentation) | Protocolo oficial, sem wrapper necessário | Notifica URLs novas/alteradas/removidas ao Bing e participantes | Recebimento 200 não significa indexação; requer chave pública e submissão externa | Script Node próprio mínimo; ativar após Bing e confirmação |
| [SiteOne Crawler](https://github.com/janreges/siteone-crawler) | Open source ativo; 2.5.1 observado | Crawler completo, relatórios SEO/segurança/acessibilidade | Sobreposição e novo binário; análise IA opcional pode consumir API | Auditoria trimestral opcional; não é gate principal agora |
| [SEOnaut](https://github.com/StJudeWasHere/seonaut) | MIT, self-hosted | Monitoramento/crawler independente | Go, MySQL e Docker para apenas oito URLs | Não agora; reavaliar com 50–100 URLs |
| [SerpBear](https://github.com/towfiqi/serpbear) | MIT; 3.1.0 observado | Rank tracking self-hosted | APIs/proxies, manutenção e sobreposição com OpenSEO | Usar apenas se OpenSEO for rejeitado |
| [Schema.org](https://github.com/schemaorg/schemaorg) | Fonte oficial ativa | Vocabulário para entidade e serviços | Instalar repo não traz benefício | Usar vocabulário/validadores; reforçar semântica e fatos |

## O OpenSEO serve?

Sim. Ele serve como camada de inteligência para pesquisa, grid local, concorrentes, backlinks e acompanhamento direcional de respostas de IA. Não serve como substituto de Search Console, GA4, Perfil da Empresa, conteúdo, reviews, citações ou prova operacional. Também não é “gratuito” em uso real quando depende de DataForSEO.

Gate do piloto:

1. ambiente privado e autenticação ativa;
2. versão fixada e repositório revisado;
3. limite de créditos aprovado;
4. 1–3 temas comerciais e 10–20 consultas;
5. grid 3×3, nunca localização falsa em massa;
6. comparação com dados de primeira parte;
7. manter somente se mudar decisões e justificar custo.

## Descoberta por buscadores de IA

- OpenAI: permitir `OAI-SearchBot` para busca; `GPTBot` é controle separado de treinamento; `ChatGPT-User` atende ações iniciadas pelo usuário.
- Anthropic: `Claude-SearchBot`, `Claude-User` e `ClaudeBot` têm funções diferentes; busca/uso e treinamento devem ser decisões separadas.
- Google/Gemini: recursos generativos usam a fundação do índice do Google. `Google-Extended` não controla ranking normal do Google Search.
- Bing/Copilot: sitemap, IndexNow, links internos/externos e conteúdo estruturado melhoram descoberta/atualização; não garantem citação.
- Grok/xAI: não foi encontrado token oficial público confiável para crawler/submissão. Não adicionar `GrokBot` especulativo.
- Cloudflare pode bloquear agentes na borda mesmo quando `robots.txt` permite; a auditoria D0–15 deve verificar os user agents oficiais ao vivo.

## Ferramentas e práticas rejeitadas

- páginas de cidade automáticas ou doorway;
- conteúdo IA em escala sem experiência/originalidade;
- keyword stuffing no nome do Perfil;
- compra de centenas de backlinks/citações;
- reviews falsas, incentivadas ou filtradas;
- fotos geradas apresentadas como trabalho real;
- scraping direto de Google com proxy farms/CAPTCHAs;
- clientes não oficiais ou reverse-engineered do Perfil da Empresa;
- instalar repositório sem revisar licença, atividade, permissões e credenciais.

## Rollout

- **D0–15:** manter gates; revisar e pinçar Lychee/Nu; Agentic Browsing informativo; auditar crawlers; preparar IndexNow.
- **D16–30:** verificar Bing, enviar sitemap e ativar IndexNow com confirmação; registrar baseline.
- **D31–45:** piloto OpenSEO limitado; comparar com GSC/GBP/GA4.
- **D46–60:** rank tracking semanal de 20–50 termos somente se o piloto provar valor.
- **D61–75:** usar dados para citações, links e melhorias; nenhuma automação de outreach.
- **D76–90:** manter, trocar ou remover ferramentas com base no ROI; reavaliar GBP API oficial.

## Fontes primárias

- Lighthouse: https://github.com/GoogleChrome/lighthouse
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci
- Playwright: https://github.com/microsoft/playwright
- Lychee: https://github.com/lycheeverse/lychee
- Nu Html Checker: https://github.com/validator/validator
- IndexNow: https://www.indexnow.org/documentation
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Anthropic crawlers: https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Google crawlers: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
- Google AI Search: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a
