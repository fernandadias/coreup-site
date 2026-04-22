# Design System · CoreUP Team

Tokens básicos para uso em produto (landing, app mobile, peças de marketing).
Arquivos fonte de referência: [tailwind.config.ts](tailwind.config.ts) e [app/globals.css](app/globals.css).

---

## Cores

### Backgrounds
| Token | Valor | Uso |
|---|---|---|
| `bg-0` | `#000000` | Fundo principal (body) |
| `bg-1` | `#0A0A0C` | Superfícies elevadas, cards |
| `bg-2` | `#141418` | Borders sutis, hover states, ícones |

### Texto
| Token | Valor | Uso |
|---|---|---|
| `fg-0` | `#FAFAFA` | Headings, texto primário |
| `fg-1` | `#A1A1AA` | Texto corrido, body |
| `fg-2` | `#52525B` | Muted, captions, labels |

### Accent (destaque)
| Token | Valor | Uso |
|---|---|---|
| `accent` | `#D4FF3A` | CTAs, números, highlights |
| `accent-glow` | `rgba(212, 255, 58, 0.28)` | Halos, shadows |

### Linhas
| Token | Valor | Uso |
|---|---|---|
| `line` | `rgba(255, 255, 255, 0.08)` | Borders de cards, separadores |

### Estado
- **Erro:** `rgb(239, 68, 68)` (red-500) com bg `rgba(239,68,68,0.1)` e border `rgba(239,68,68,0.3)`
- **Sucesso:** usar `accent` direto

---

## Tipografia

| Família | Variável CSS | Uso |
|---|---|---|
| **Genos** | `--font-display` | Headings, números grandes, CTAs |
| **Inter** | `--font-sans` | Body, UI, labels |

**Pesos Genos disponíveis:** 400, 500, 600, 700, 800
**Estilo autoral do H1 do hero:** `italic` + `font-semibold`

### Escala (mobile → desktop)
| Nível | Tamanho | Line-height | Tracking |
|---|---|---|---|
| Display XL (hero) | `4rem` | `0.7` | `tracking-tight` |
| Display L | `3rem` / `text-6xl` | `1.05` | `tracking-tightest` (-0.04em) |
| H2 seção | `text-3xl` → `text-5xl` | `1.1` | `tracking-tightest` |
| H3 card | `text-xl` → `text-2xl` | `1.2` | `tracking-tight` |
| Body L | `text-lg` → `text-xl` | `1.6` | natural |
| Body | `text-base` | `1.6` | natural |
| Caption / label | `text-xs` uppercase | `1.2` | `tracking-widest` (0.2em) |

---

## Espaçamento

Múltiplos de **4px** (escala Tailwind padrão).

- Gap entre elementos dentro de card: `gap-4` (16px)
- Gap entre blocos de conteúdo: `gap-6` → `gap-8` (24–32px)
- Padding interno de card: `p-6` → `p-10` (24–40px)
- Padding vertical de seção: `py-24` → `py-32` (96–128px)
- Container max-width: `max-w-6xl` com padding `px-6 md:px-8`

---

## Radius

| Token | Valor | Uso |
|---|---|---|
| `rounded-lg` | 8px | Ícones pequenos |
| `rounded-xl` | 12px | Inputs, cards compactos |
| `rounded-2xl` | 16px | Cards de conteúdo |
| `rounded-3xl` | 24px | Cards hero, mockups |
| `rounded-full` | 9999px | Botões, pills, avatars |

---

## Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-glow-sm` | `0 0 24px 0 var(--accent-glow)` | Hover de CTAs, cards ativos |
| `shadow-glow` | `0 0 80px 0 var(--accent-glow)` | Halo de destaque (form, mockup) |

---

## Motion

- **Easing padrão:** `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo)
- **Duração UI:** `200ms` (hover de botões)
- **Duração reveal:** `300ms` (cards hover, accordion)
- **Duração entrada:** `800ms` (fade-up inicial)
- **Pulse glow:** `3s ease-in-out infinite`
- **Reduced motion:** todas as animações reduzidas a `0.01ms` via `@media (prefers-reduced-motion)`

---

## Componentes-base

### Button
- **Primary:** `bg-accent` + `text-bg-0`, hover com `shadow-glow-sm` + `brightness-110`
- **Ghost:** transparente + hover `bg-bg-1` com border
- **Outline:** border `line` + hover border `accent/40`
- **Sizes:** `md` (h-11, px-5) e `lg` (h-14, px-7)
- Sempre `rounded-full`

### Pill
- **Default:** `border-line` + `bg-bg-1` + `text-fg-1`
- **Accent:** `border-accent/30` + `bg-accent/10` + `text-accent`
- `rounded-full`, `px-3.5 py-1.5`, `text-xs`

### Card
- Base: `rounded-2xl border border-line bg-bg-1 p-8`
- Hover (classe `.card-hover`): `translateY(-4px)` + border `accent/30` + `shadow-glow-sm`

### Input / Select / Textarea
- `h-12 rounded-xl border border-line bg-bg-0/60 px-4 text-sm`
- Focus: `border-accent/60` + `ring-2 ring-accent/30`

---

## Detalhes visuais

- **Grid de fundo:** linhas 1px com `rgba(255,255,255,0.08)` a cada 64px, com mask radial degradê
- **Noise overlay:** SVG turbulence inline, `opacity-[0.06]` + `mix-blend-overlay`
- **Hero glow:** gradiente radial `accent-glow` 50% × 60% no topo
- **Seleção de texto:** bg `accent`, texto `bg-0`
- **Focus ring:** `outline: 2px solid accent` + `outline-offset: 3px`
