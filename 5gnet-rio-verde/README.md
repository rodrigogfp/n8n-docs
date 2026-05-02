# 5gnet Rio Verde — Vídeo Institucional (Remotion)

Vídeo educativo de ~45s explicando como a internet sai da rede global e chega à
casa do cliente, com estética de "desenho técnico / infraestrutura futurista":
fundo `slate-950`, traços neon ciano e violeta simulando fibra óptica.

## Stack

- Remotion 4 (`@remotion/cli`)
- React 19 + TypeScript
- TailwindCSS via `@remotion/tailwind`
- Animações com `spring` e `interpolate` (sem libs externas)

## Como rodar

```bash
cd 5gnet-rio-verde
npm install
npm run dev      # abre o Remotion Studio em http://localhost:3000
npm run build    # renderiza em out/5gnet-rio-verde.mp4
```

## Estrutura de cenas

| # | Tempo | Cena | Componente |
| - | ----- | ---- | ---------- |
| 01 | 0–7s   | Rede global de fibra | `SceneGlobal` |
| 02 | 7–15s  | Provedor (borda + switches) | `SceneProvider` |
| 03 | 15–24s | OLT, splitters e PON | `SceneDistribution` |
| 04 | 24–34s | ONU + Wi-Fi na casa do cliente | `SceneHome` |
| 05 | 34–45s | Anel óptico, failover e assinatura | `SceneOutro` |

## Composição

- ID: `FivegnetVideo`
- Resolução: 1920×1080
- FPS: 30
- Duração: 1350 frames (45s)

## Componentes reutilizáveis

- `DataFlow` — partículas neon viajando por trilhas (horizontal/vertical)
- `GridBackdrop` — grid sutil + halos radiais que dão profundidade
- `FloatingTerms` — termos técnicos flutuando como decoração (BGP, VLAN, GPON…)
- `SceneTransition` — entrada/saída por zoom ou slide
- `SceneLabel` / `Caption` — tipografia consistente entre cenas

## Áudio

A composição não inclui áudio. O roteiro de locução está em comentários no
código e pode ser gerado por TTS e adicionado depois com `<Audio>` do Remotion
ou via `ffmpeg` no MP4 final.
