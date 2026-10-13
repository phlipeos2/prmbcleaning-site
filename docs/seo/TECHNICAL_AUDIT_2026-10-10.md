# PRMB Cleaning — auditoria técnica de 10/10/2026

Data/hora de referência: 10 de outubro de 2026, America/Denver  
Escopo: CI local, produção pública, redirects, dados estruturados, headers e crawlers declarados  
Mudança de design/conteúdo público: nenhuma

## Resultado executivo

A fundação técnica está estável. A suíte local completa passou, as oito URLs canônicas responderam `200`, a rota inexistente respondeu `404`, os redirects críticos preservaram caminho/query, os blocos JSON-LD foram analisados como JSON válido e os headers de segurança estavam ativos. `robots.txt`, `sitemap.xml` e `llms.txt` responderam `200`.

Esta auditoria verifica disponibilidade e consistência técnica. Ela não comprova indexação, ranking, uso por modelos de IA ou aprovação do Perfil da Empresa.

## Suíte local completa

- Validador SEO: 8 rotas indexáveis, 8 URLs no sitemap e 9 títulos únicos.
- Lighthouse: 8/8 páginas aprovadas.
  - SEO: 100 em todas.
  - Acessibilidade: 100 em todas.
  - Best Practices: 100 em todas.
  - Performance: 90 na homepage; 98–100 nas demais páginas.
- Playwright: 22/22 testes aprovados em desktop e mobile.
- Os testes cobrem SEO/conversão, 404 real, mascaramento explícito do formulário no Clarity e bloqueio de Clarity em QA local.

## Produção pública

| Verificação | Resultado |
|---|---|
| Oito URLs canônicas | `200` |
| URL desconhecida | `404` |
| `robots.txt` | `200`, sitemap declarado |
| `sitemap.xml` | `200`, `application/xml` |
| `llms.txt` | `200`, `text/plain` |
| HTTP → HTTPS | `301` |
| `www` → apex | `301`, preservando caminho e query |
| Rotas legadas de privacy/about | `301` para destino canônico |

## GitHub Actions e referência remota

- As três execuções públicas mais recentes de `SEO quality gates` terminaram com sucesso.
- A execução mais recente é `37519573156`, concluída em 06/10/2026 para o commit remoto `ed6c9fe` (`Add Bing Webmaster ownership verification meta`).
- A homepage pública foi lida diretamente e contém o valor esperado de `msvalidate.01`, confirmando que a verificação Bing chegou à produção.
- O title público ainda é `PRMB Cleaning | 5-Star House & Commercial Cleaning in Utah`, confirmando que o experimento local de snippet não foi publicado por engano.
- `git ls-remote` confirmou que `main` público está em `ed6c9fe`, enquanto a referência local `origin/main` ainda aponta para o commit anterior `8d30e3f`.
- A referência foi atualizada com `git fetch` sem alterar arquivos de trabalho. O estado correto agora é `ahead 2, behind 1`: o remoto adicionou `ed6c9fe` sobre `8d30e3f`, enquanto os commits locais `4b52bf7` e `81afc2a` partiram do mesmo ancestral.
- O diff remoto foi inspecionado: ele adiciona somente a meta de verificação Bing `msvalidate.01` em `index.html`; os commits locais alteravam title/meta description e o pacote de QR, sem conflito semântico.
- `origin/main` foi integrado localmente no commit `a78dfbe` com merge `ort`, sem push e sem alterar os documentos não commitados. A meta Bing e as mudanças locais estão preservadas.
- A suíte completa pós-merge passou novamente: validador 8/8, Lighthouse SEO/acessibilidade/best-practices 100, performance 91–99 e Playwright 22/22.

## Canonical, H1 e JSON-LD

As oito URLs devolveram canonical autoconsistente e exatamente um `h1`.

| Página | Tipos JSON-LD observados |
|---|---|
| Homepage | `LocalBusiness`, `WebSite` |
| Diretório de serviços | `CollectionPage`, `BreadcrumbList` |
| Cinco páginas de serviço | `Service`, `BreadcrumbList` |
| Áreas de atendimento | `WebPage`, `BreadcrumbList` |

Todos os blocos JSON-LD da amostra foram convertidos como JSON válido. A validação semântica do vocabulário continua protegida pelo validador local; este teste público confirma apenas presença, parse e tipos esperados.

## Headers observados

- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- HTML: revalidação imediata (`max-age=0`)
- `sitemap.xml` e `llms.txt`: cache público de 3600 segundos
- `robots.txt`: Cloudflare respondeu com cache público de 14400 segundos, maior que a regra de origem de 3600; não há impacto funcional imediato.

## Crawlers declarados

Requisições públicas a `robots.txt` com os seguintes user agents responderam `200`; cada grupo nomeado e o sitemap estavam presentes:

- Googlebot
- Bingbot
- OAI-SearchBot
- GPTBot
- ChatGPT-User
- ClaudeBot
- Claude-SearchBot
- Claude-User

Isso confirma entrega do arquivo e intenção declarada, não acesso efetivo do crawler nem inclusão/citação em resultados. Nenhum token especulativo de Grok foi adicionado.

## Observações e próximos gates

- Nenhuma correção técnica urgente foi encontrada; não criar mudança só para gerar atividade.
- A verificação de indexação e o pacote da Auditoria 1 continuam prioritários em 11–12/10.
- Os dois commits locais de Clarity/snippet e QR continuam sem deploy por exigirem confirmação imediatamente antes da publicação.
- A integração local removeu a divergência; a branch está três commits à frente de `origin/main`. Qualquer push continua no gate de confirmação.
- A primeira tentativa local falhou porque o sandbox impediu a pasta temporária do Lighthouse; a mesma suíte foi executada com autorização e passou integralmente.
- As primeiras requisições públicas falharam por bloqueio de socket do sandbox; a repetição autorizada, somente leitura, concluiu a auditoria.
- A primeira consulta `gh run list` também foi bloqueada por socket; a repetição autorizada, somente leitura, confirmou CI verde.
