# PRMB Cleaning — taxonomia UTM Q4 2026

Versão: 1.0 — 4 de outubro de 2026

## Padrões

| Uso | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` |
|---|---|---|---|---|
| Website principal do Perfil | `google` | `organic` | `gbp` | omitido |
| Post do Perfil | `google` | `organic` | `gbp_posts` | `YYYY-MM-DD_slug-curto` |
| Citação/diretório | nome canônico do diretório | `referral` | `local_citations` | identificador do perfil/listagem |
| Parceiro/editorial local | domínio ou parceiro | `referral` | `local_authority` | ativo ou campanha factual |

## Regras

- Usar minúsculas, ASCII, hífen no slug e data ISO.
- Não usar telefone, e-mail, nome de cliente ou outro dado pessoal em parâmetros.
- Canonical e sitemap nunca contêm UTM.
- Reutilizar exatamente o mesmo link ao medir um ativo; não criar variantes durante a campanha.
- O relatório de 15 dias separa `gbp`, `gbp_posts`, `local_citations` e `local_authority`.
- O post de 03/10 foi normalizado para `utm_campaign=gbp_posts` antes da publicação.

## URLs aprovadas

- Perfil: `https://prmbcleaning.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- Post de 03/10: `https://prmbcleaning.com/services/?utm_source=google&utm_medium=organic&utm_campaign=gbp_posts&utm_content=2026-10-03_preparing-estimate`
