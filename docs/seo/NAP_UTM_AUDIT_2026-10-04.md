# PRMB Cleaning — auditoria NAP, horários, área e UTM

Data: 4 de outubro de 2026
Escopo validado: arquivos locais do site versus último estado autenticado registrado do Perfil PRMB Cleaning
Limitação: o helper do navegador não permitiu uma nova leitura ao vivo do Perfil.

## Resultado

| Campo | Site/schema após correção | Último estado do Perfil | Situação |
|---|---|---|---|
| Marca | `PRMB Cleaning` | `PRMB Cleaning - House Cleaning and Commercial Cleaning` | Diferença conhecida; não editar sem prova do nome real |
| Telefone | `+1 385-314-9098` | `+1 385-314-9098` | Consistente |
| Website | `https://prmbcleaning.com/` | `https://prmbcleaning.com/` | Consistente; UTM do Perfil preparada, não aplicada |
| E-mail | `prmbcleaning@gmail.com` | Conta operacional conhecida | Consistente nos materiais internos/site |
| Horários | seg–sex 07:00–21:00; sáb 07:00–14:00; dom fechado | Mesmo horário | Consistente |
| Área prioritária | Salt Lake City, Provo, Ogden e Park City | Mesmas quatro cidades submetidas | Consistente após remover Lehi/Sandy/Draper do texto residual da home |
| Endereço | não publicado; empresa de área de serviço | empresa de área de serviço | Consistente |

## Correções executadas

- Removidas Lehi, Sandy e Draper da FAQ/rodapé da home; nenhuma página de cidade foi criada.
- Adicionado gate no validador para impedir que essas cidades não confirmadas voltem a páginas indexáveis ou `llms.txt`.
- Normalizado o post de 03/10 para `utm_campaign=gbp_posts`.
- Criada a taxonomia versionada em `UTM_TAXONOMY_2026_Q4.md`.

## Pendência de navegador

Quando o helper voltar, conferir ao vivo nome, telefone, website, horários, área, descrição e reviews. Não salvar nenhuma edição duplicada; a descrição continua tratada como pendente até evidência contrária.
