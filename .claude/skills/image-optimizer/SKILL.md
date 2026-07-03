---
name: image-optimizer
description: Baixa uma imagem de uma URL, redimensiona e converte para WebP, salvando em public/ para servir localmente. Usar sempre que uma imagem externa (Pexels, Unsplash etc.) precisar ser localizada, ou ao adicionar qualquer novo asset de imagem que deva ser otimizado antes de entrar em public/.
---

# Image Optimizer

Baixa uma imagem a partir de uma URL, redimensiona para um tamanho adequado ao
uso na web e converte para WebP, salvando o resultado em `public/` deste
projeto — para que o app sirva a imagem localmente, sem depender de
requisições a serviços externos (Pexels, Unsplash etc.) em tempo de execução.

## Quando usar

- Quando o usuário pedir para "baixar e otimizar" uma imagem, "localizar" uma
  imagem hotlinkada, ou adicionar qualquer novo asset de imagem ao projeto.
- Sempre que uma URL de imagem externa estiver prestes a ser usada em
  `<Image src="...">` — prefira baixar e localizar em vez de hotlinkar.

## Pré-requisito

O script depende de `sharp` (devDependency). Se `node_modules/sharp` não
existir, rode primeiro:

```
npm install --save-dev sharp
```

Neste ambiente (macOS arm64), o `npm install` baixa o binário pré-compilado
`@img/sharp-darwin-arm64` automaticamente — não deve exigir compilação nativa.
Se a importação de `sharp` falhar depois de instalado, tente reinstalar com
`npm install --include=optional sharp`.

## Presets de largura/qualidade

Escolha o preset pelo contexto de uso da imagem (baseado nos `sizes` usados
pelos componentes `<Image fill>` deste projeto). Não redecida esses valores a
cada chamada — use a tabela:

| Categoria                                              | Largura máx. (`--width`) | Qualidade (`--quality`) |
| ------------------------------------------------------- | ------------------------- | -------------------------- |
| Hero / banner full-bleed (`sizes="100vw"`)               | 1920                       | 75                          |
| Item de cardápio / tile (`sizes` ~25–33vw no desktop)    | 800                        | 75                          |
| Imagem de página "Sobre" (`sizes` ~50vw no desktop)      | 1200                       | 75                          |

Se a imagem processada mostrar artefatos de compressão visíveis, suba a
qualidade para 80–85 pontualmente para aquele arquivo.

## Comando

```
node scripts/optimize-image.mjs --url <URL de origem> --out <caminho relativo a public/> --width <N> --quality <Q>
```

Ou via npm script equivalente:

```
npm run optimize-image -- --url <URL> --out <caminho> --width <N> --quality <Q>
```

Convenção de nomes/pastas dentro de `public/images/`:

```
public/images/
  hero.webp
  menu/<slug>.webp      # slug = a mesma chave usada em app/lib/images.ts::menuItemImages
  sobre/<nome-descritivo>.webp
```

Rode o comando uma vez por imagem (em lote, repita para cada URL). Confira o
código de saída e o stderr de cada chamada — o script falha explicitamente em
erro de rede, HTTP não-2xx, ou content-type que não seja `image/*`.

## Pós-processamento obrigatório

Depois de gerar o(s) arquivo(s) `.webp`, atualize `app/lib/images.ts`:

- Troque **somente** o campo `src` de cada `SourcedImage` afetado, do URL do
  Pexels para o caminho local (`/images/menu/<slug>.webp` etc.).
- **Preserve** `alt`, `photographer` e `pexelsUrl` sem alteração — eles servem
  de proveniência/atribuição da foto original, mesmo depois que o arquivo
  passa a ser servido localmente.

## Arquivos-espelho a checar na mesma mudança

Assim como `docs/design/tokens.reference.css` precisa ficar em sincronia com
`app/globals.css`, ao localizar imagens confira também:

- `next.config.ts` — remova a entrada de `remotePatterns` do domínio de
  origem (ex.: `images.pexels.com`) **somente depois** de confirmar, via
  `grep -rn "images.pexels.com" app/ next.config.ts`, que nenhum `src`
  restante ainda hotlinka aquele domínio. Uma migração parcial não pode
  quebrar as imagens que ainda não foram localizadas.
- `CLAUDE.md` — se a seção "Menu data pipeline" (ou equivalente) descrever o
  esquema atual de hotlinking, atualize a prosa para refletir que as imagens
  agora são arquivos WebP locais em `public/images/`.
- Não mexa em `docs/design/*` — isso é responsabilidade do agente
  `design-system-guardian`, não desta skill.

## Tratamento de falha

Se o download de uma URL falhar, mantenha o `src` hotlinkado original
daquele item em `images.ts`, sinalize no resumo final quais itens não foram
migrados, e não remova o `remotePattern` correspondente em `next.config.ts`
enquanto restar qualquer item pendente.

## Verificação final

```
grep -rn "images.pexels.com" app/ next.config.ts
```

Deve retornar vazio ao final de uma migração completa. Depois, rode
`npm run build` para validar TypeScript e o build de produção com os novos
caminhos de imagem.
