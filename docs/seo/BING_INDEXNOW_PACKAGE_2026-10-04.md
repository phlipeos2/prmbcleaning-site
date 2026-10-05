# PRMB Cleaning — pacote Bing Webmaster Tools + IndexNow

Data de preparação: 4 de outubro de 2026
Estado: `KEY_READY_FOR_DEPLOY`
Escopo: `prmbcleaning.com` e as 8 URLs canônicas do sitemap
Submissão externa executada: **não**

## Decisão

Preparar agora e ativar somente no gate público de 13/10, após confirmação no momento da ação. O pacote não promete indexação: um recebimento HTTP 200/202 do IndexNow confirma apenas que a notificação foi recebida ou está com a chave em validação.

## O que já está pronto

- `https://prmbcleaning.com/sitemap.xml` contém 8 URLs HTTPS canônicas do mesmo host.
- `robots.txt` referencia o sitemap e permite `Bingbot`.
- `scripts/indexnow.mjs` lê o sitemap, bloqueia host/protocolo inesperado, parâmetros, fragmentos e duplicatas, e monta um único lote.
- `npm run indexnow:prepare` é somente leitura e não usa chave nem rede.
- `npm run indexnow:submit` é bloqueado por três gates: chave válida, arquivo da chave verificável no domínio e `INDEXNOW_CONFIRM_SUBMISSION=PRMB_ONLY`.
- Uma chave técnica de verificação foi criada como arquivo raiz autoverificável. Ela não concede acesso a contas e só terá efeito após o deploy e uma submissão autorizada.

## Checklist de ativação — exige confirmação no momento da ação

1. Entrar em `https://www.bing.com/webmasters/` na conta corporativa escolhida pelo proprietário.
2. Preferir importar somente `prmbcleaning.com` do Google Search Console; revisar a permissão periódica antes de aceitar. Se a propriedade não aparecer, usar verificação manual por meta tag ou DNS.
3. Confirmar no painel que o ativo selecionado é `prmbcleaning.com`; não importar nem operar qualquer outro negócio.
4. Verificar se `https://prmbcleaning.com/sitemap.xml` foi importado. Se não, submeter esse URL uma única vez.
5. Confirmar que existe exatamente um arquivo raiz IndexNow autoverificável, com nome e conteúdo idênticos.
6. Publicar a chave após revisão e confirmar que o arquivo responde 200, sem redirect e com o conteúdo exato.
7. Obter confirmação do proprietário imediatamente antes da submissão externa.
8. Executar uma única submissão das 8 URLs canônicas e registrar horário, código HTTP e corpo da resposta sem gravar a chave nos logs.
9. Aceitar 200 ou 202 como recebimento; diagnosticar 400/403/422; não reenviar em loop; tratar 429 como limite/possível spam.
10. Após 24–48 horas, registrar no Bing: sitemap processado, URLs descobertas, inspeção de URL e baseline de impressões/cliques, mesmo que ainda zerado.

## Comandos seguros

Preparação local sem rede:

```powershell
npm run indexnow:prepare
```

Submissão futura, somente durante uma execução autorizada, com variáveis temporárias de processo e sem salvar a chave no repositório:

```powershell
$env:INDEXNOW_CONFIRM_SUBMISSION = 'PRMB_ONLY'
npm run indexnow:submit
Remove-Item Env:INDEXNOW_CONFIRM_SUBMISSION
```

## Critérios de aceite

- propriedade Bing verificada na conta aprovada;
- sitemap aceito/importado com 8 URLs;
- chave publicada e verificada no host correto;
- somente uma submissão inicial registrada;
- resposta 200/202 documentada sem expor a chave;
- inspeção posterior separa recebimento, descoberta, rastreamento e indexação;
- nenhuma promessa de posição, prazo ou inclusão no Bing/Copilot.

## Fontes primárias verificadas em 04/10/2026

- Bing — adicionar/verificar site e importar do Search Console: https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b
- Bing — sitemaps: https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed
- Bing — inspeção de URL: https://www.bing.com/webmasters/help/URL-Inspection-55a30305
- IndexNow — documentação do protocolo: https://www.indexnow.org/documentation
- IndexNow — FAQ e endpoint global: https://www.indexnow.org/faq
