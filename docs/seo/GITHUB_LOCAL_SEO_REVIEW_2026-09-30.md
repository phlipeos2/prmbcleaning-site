# PRMB Cleaning — auditoria crítica de repositórios GitHub para SEO local

Data: 30 de setembro de 2026
Escopo: `prmbcleaning.com` e exclusivamente o Perfil da Empresa PRMB Cleaning, ID `7764775686424117208`
Regra: nenhum repositório recebe credenciais, OAuth, chave, instalação ou acesso ao Perfil apenas por estar público no GitHub.

## Resumo executivo

Os links enviados agregaram boas ideias, mas não justificam instalar uma “plataforma mágica”. A maior parte do valor está em processos: auditoria repetível do Perfil, posts factuais, fluxo de avaliações, citações Tier 1, geo-grid com custo controlado e monitoramento de mudanças.

Decisões:

1. **Adotar agora, de forma adaptada:** checklists selecionados do `localseoskills`, sem importar as 39 skills nem executar instaladores remotos.
2. **Adicionar ao projeto:** playbook próprio do Perfil, calendário diário Q4, fluxo de reviews/QR original, auditoria quinzenal, Bing Places e Apple Business como citações Tier 1.
3. **Pilotar depois de aprovação de custo:** `legends-geogrid`, por ser focado, MIT, com estimativa e teto de gasto explícitos.
4. **Reavaliar no fim do trimestre:** `google-business-profile-ai-automation`, somente se a economia operacional justificar Google Cloud, aprovação da API e OAuth restrito ao Perfil PRMB.
5. **Não instalar:** scrapers diretos de Google Maps/Semrush, plugin WordPress antigo, MCPs hospedados com escopo amplo, categorias sem licença e pacote proprietário.

## Critérios da peneira

Cada candidato foi avaliado por:

- aderência ao gargalo atual da PRMB;
- licença e possibilidade real de uso;
- atividade e maturidade;
- dependências, credenciais e permissões;
- risco de suspensão, bloqueio, scraping ou gasto involuntário;
- controle de custo e reversibilidade;
- compatibilidade com o site estático/Cloudflare;
- capacidade de produzir uma decisão mensurável;
- sobreposição com Search Console, GA4, Clarity, Ahrefs, Playwright e o trabalho já feito.

## Avaliação dos links enviados

| Fonte | O que existe | Crítica | Decisão PRMB |
|---|---|---|---|
| `topics/google-business-profile` | Catálogo com 80 repositórios na leitura de 30/09 | Mistura ferramentas legítimas, scrapers, demos, skills e projetos sem licença. Tag/recência não prova qualidade | Usar somente como radar trimestral; nunca instalar pelo tópico |
| `topics/local-seo?l=go` | Um único projeto: `tools-google-maps` | É scraper de leads/contatos, não ferramenta de ranking da PRMB; não resolve indexação, autoridade ou conversão | Rejeitado |
| `topics/local-seo-link-building` | Um repositório imobiliário irrelevante, zero estrelas | O tópico não contém ferramenta aplicável ao negócio | Rejeitado como fonte operacional |
| `garrettjsmith/localseoskills` | 39 skills, MIT, ativo, 106 estrelas, 2,6 mil instalações agregadas | Boa arquitetura de checklists e aprovações; vários sinais de ranking são apresentados com certeza maior que a documentação oficial; módulos direcionam para ferramentas externas | Adotar métodos selecionados, reescritos com fontes oficiais e controles PRMB; não instalar tudo |
| `rgelhausen/local-seo-and-business-listings` | Plugin WordPress GPL-2.0, três commits | Código sem atualização desde 2015, depende de WordPress e de conta externa; o site PRMB não usa WordPress | Rejeitado |
| `topics/open-source-seo?l=python` | Dois projetos | `seo-command-center` é interessante, mas depende de DataForSEO e duplica a stack; `semrush-scraper` é frágil e baseado em scraping | Deferir o primeiro; rejeitar o segundo |

## Avaliação dos candidatos descobertos

### `garrettjsmith/localseoskills`

**O que passa:**

- separar Perfil, posts, avaliações, citações, geo-grid, Bing e Apple em rotinas próprias;
- briefs persistentes e histórico de decisões;
- tarefas com níveis de aprovação;
- perfil completo e coerente antes de aumentar posts;
- medição de ranking local antes/depois;
- fluxo contínuo de avaliações genuínas;
- citações por prioridade, não em massa.

**O que não passa sem correção:**

- tratar posts, engajamento, sinais sociais ou geotag EXIF como fatores confirmados;
- publicar 2–3 vezes por semana ou diariamente sem demanda/prova;
- inserir palavras-chave/localidade artificialmente em respostas a avaliações;
- pedir ao cliente que mencione serviço, cidade ou colaborador na avaliação;
- usar foto gerada como prova de trabalho, equipe, imóvel ou resultado;
- confiar em “percentuais” ou pesos de ranking não divulgados pelo Google.

**Integração:** o playbook `GBP_OPERATING_PLAYBOOK_2026_Q4.md` incorpora os fluxos úteis, mas mantém as regras oficiais e o ledger de evidências da PRMB como autoridade superior.

### `danishfareed/Google-Maps-SERP`

Pontos positivos: interface local, histórico, geo-grid, SQLite e ausência declarada de telemetria.

Riscos decisivos:

- automatiza buscas reais no Google Maps, inclui proxies e fontes de proxies;
- o instalador é não assinado e o README orienta contornar SmartScreen/Gatekeeper;
- o repositório não expôs um arquivo `LICENSE` na árvore revisada, apesar de README/package declararem MIT;
- traz Electron/Next/Playwright/Prisma e superfície operacional grande para um único perfil.

**Decisão:** não instalar, não contornar barreira do sistema e não usar proxy/scraping do Google. O benefício de geo-grid será testado por caminho baseado em API e custo controlado.

### `avalonreset/legends-geogrid`

Pontos positivos:

- MIT e ativo;
- separa observação, hipótese e recomendação;
- trabalha com `placeId`/CID/domínio para evitar confusão de entidade;
- estima custo antes de executar;
- exige `--execute` e `--confirm-cost-usd`;
- preserva dados brutos, cache e evidência;
- oferece exemplos offline e não exige servidor hospedado.

Custos/riscos:

- exige DataForSEO, Python e configuração adicional;
- o preço do README é estimativa do software, não garantia do provedor;
- um grid grande produz precisão aparente sem necessariamente produzir decisão;
- não substitui Search Console, Perfil ou leads.

**Decisão:** aprovado para piloto D31–45, inicialmente com 3 temas comerciais, grid 3×3 ou 5×5 e teto a ser aprovado imediatamente antes da compra/execução. Só permanece se alterar uma decisão concreta de página, área ou Perfil.

### `local-falcon/mcp`

Pontos positivos: projeto oficial do fornecedor, MIT, OAuth, anotações de ferramentas e cobertura de Google/Apple/IA.

Riscos:

- depende de conta/créditos Local Falcon;
- expõe dezenas de ferramentas, inclusive campanhas, consumo de créditos e escrita no Perfil;
- aumenta o escopo de OAuth e a superfície de erro para um negócio com um único perfil;
- o mesmo Google login também enxerga PS Carpentry USA, que está fora do escopo absoluto.

**Decisão:** não conectar o MCP. Se um serviço gerenciado superar o piloto DataForSEO em custo/qualidade, usar inicialmente a interface do fornecedor com confirmação, escopo mínimo e sem escrita no GBP.

### `tanzeeldevAi/google-business-profile-ai-automation`

Pontos positivos:

- MIT, ativo e com centenas de testes offline declarados;
- dry-run por padrão e `--apply` separado;
- ledger explícito de fatos;
- reviews negativas retidas para humano;
- relatórios de “não verificado” quando a API não permite ler algo;
- monitoramento de mudanças e seleção explícita de localização.

Riscos:

- exige projeto Google Cloud, aprovação para Business Profile APIs, OAuth e credenciais persistentes;
- pode reescrever descrição, responder reviews e publicar posts;
- incorpora regras não oficiais como score e pode transformar correlação em recomendação;
- precisa de proteção adicional para impedir qualquer seleção de PS Carpentry USA;
- o Google informa que não há sandbox de produção equivalente para esses dados.

**Decisão:** incorporar agora os padrões de dry-run, facts-only, relatório de cobertura e human-in-the-loop. Não instalar nem autorizar OAuth no Sprint 1. Reavaliar D76–90 apenas se o volume justificar e após revisão de código/escopos.

### `iamaanahmad/ReviewQR-Pro`

A tática é útil: um link/QR direto reduz fricção para avaliações legítimas. Entretanto, a árvore revisada não continha o arquivo `LICENSE` apontado pelo README, o app inclui dependência de IA sem necessidade para gerar QR e instalar a aplicação inteira seria excesso.

**Decisão:** não reutilizar o código. Criar um ativo original da PRMB, usando o Place ID confirmado, logo da empresa e instrução neutra. Sem desconto, brinde, pedido de cinco estrelas, review gating ou pedido de palavras específicas.

### `carbondigitalus/gbp-industry-categories`

Lista estática com cerca de 4.045 categorias únicas declaradas, mas sem licença detectada e sujeita a atualização/localização do Google.

**Decisão:** não copiar nem versionar a lista. Usar o catálogo visível no Perfil e comparar categorias reais dos concorrentes; registrar somente opções relevantes observadas.

### `testedmedia/seo-command-center`

MIT, simples e com controle de custos. Pode consolidar ranking, gaps, AI Overview e grid via DataForSEO. Porém, exige credenciais, SQLite, possível Cloudflare KV/token e duplica Ahrefs/GSC/Clarity no estágio atual.

**Decisão:** deferido. Reavaliar depois do Dia 45 somente se houver mais de 20 consultas com sinal, o piloto pago mudar decisões e o custo operacional do dashboard for menor que análises pontuais.

### `abouchard11/midnight-seo-skills`

O arquivo de licença afirma “PROPRIETARY — NO LICENSE GRANTED” e o uso comercial exige licença paga por assento. O pacote também inclui táticas de parasite SEO incompatíveis com a estratégia de autoridade legítima da PRMB.

**Decisão:** rejeitado; nenhum conteúdo será copiado ou instalado.

### `omkarcloud/semrush-scraper` e `hannesegi/tools-google-maps`

Ambos priorizam scraping/extração de dados. O primeiro oferece scraping do Semrush sem API; o segundo extrai contatos de Maps para geração de leads.

**Decisão:** rejeitados por fragilidade, risco de bloqueio/termos e falta de aderência ao objetivo de ranquear/converter a PRMB.

## Funções que entram no projeto

1. **Scorecard factual do Perfil:** precisão, status, categoria, serviços, áreas, horários, URLs/UTMs, posts, reviews, fotos editoriais e mudanças pendentes.
2. **Monitor de deriva:** comparação quinzenal do Perfil/site/fontes; nenhuma correção duplicada enquanto o Google revisa uma mudança.
3. **Pipeline de posts:** pauta → evidência → landing page → UTM → imagem editorial → aprovação → publicação → leitura de resultado.
4. **Pipeline de reviews:** serviço concluído → pedido neutro → link/QR → monitoramento → resposta humana em 24–48 h.
5. **Citações Tier 1:** Bing Places, Apple Business, Yelp/Nextdoor/Thumbtack somente quando apropriado e com conta/verificação do proprietário.
6. **Geo-grid experimental:** medição pequena, custo limitado e decisão explícita antes de escalar.
7. **Benchmark de concorrentes:** categoria, reviews, cobertura, páginas, prova, citações e conversão; sem copiar nem denunciar automaticamente.
8. **Descoberta por IA:** fatos coerentes, schema, páginas citáveis, fontes independentes e acompanhamento manual/API autorizado.
9. **Gate de segurança:** nenhuma ferramenta pode escrever no Perfil, gastar crédito, criar OAuth/chave ou tocar PS Carpentry USA sem aprovação/escopo específico.

## Rollout revisado

- **D0–15:** scorecard, Bing/IndexNow, UTMs, monitor de deriva, fluxo de reviews/QR, posts a cada 7–10 dias.
- **D16–30:** Bing Places ou outra citação Tier 1, primeiro ativo citável, baseline Clarity e rotina de reviews.
- **D31–45:** piloto `legends-geogrid` ou alternativa manual; OpenSEO deixa de ser piloto padrão e vira comparação opcional.
- **D46–60:** conversão, qualidade de lead, segunda citação e decisão sobre ampliar ranking monitorado.
- **D61–75:** link/parceria local legítima, página vencedora, categorias/áreas somente por evidência.
- **D76–90:** auditoria trimestral; reavaliar GBP API/automação somente com ROI, escopo e aprovação.

## Fontes primárias e repositórios

- Google — ranking local: https://support.google.com/business/answer/7091
- Google — posts: https://support.google.com/business/answer/7342169
- Google — política de conteúdo/reviews: https://support.google.com/business/answer/7400114
- Google — Business Profile APIs: https://developers.google.com/my-business/content/overview
- Google — requisitos de API: https://developers.google.com/my-business/content/prereqs
- Microsoft — Bing Places: https://www.bingplaces.com/
- Apple — Business Connect: https://businessconnect.apple.com/
- Local SEO Skills: https://github.com/garrettjsmith/localseoskills
- Legends GeoGrid: https://github.com/avalonreset/legends-geogrid
- GBP Autopilot: https://github.com/tanzeeldevAi/google-business-profile-ai-automation
- Local Falcon MCP: https://github.com/local-falcon/mcp
- SEO Command Center: https://github.com/testedmedia/seo-command-center
