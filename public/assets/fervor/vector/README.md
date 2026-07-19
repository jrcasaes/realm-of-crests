# Mestres vetoriais dos glifos de Fervor

Conjunto técnico derivado das leis topológicas do sistema canônico de Marcas e Glifos de Fervor.

## Escopo

- 8 mestres SVG base, um por família de Fervor;
- 8 variantes SVG monocromáticas escuras;
- 8 variantes SVG monocromáticas claras;
- 16 PNG transparentes de 4096 px, positivos e negativos;
- 8 PDF vetoriais para produção.
- `viewBox` uniforme de `0 0 1000 1000` e fundo transparente.

Os vetores codificam apenas a **topologia essencial** de cada glifo. Eles não constituem novas transfigurações e não substituem a matriz canônica de 40 WebP — oito famílias por cinco matérias — que permanece em `public/assets/fervor/`.

## Pastas

- `masters/`: arquivos reutilizáveis com traços em `currentColor`;
- `mono-dark/`: produção em `#0B0A08`, para fundos claros;
- `mono-light/`: produção em `#F5E6BE`, para fundos escuros.
- `mono-png/dark/` e `mono-png/light/`: exports transparentes em 4096 px;
- `pdf/`: masters vetoriais em PDF.

## Convenção

`RoC_Glyph_<Family>_<Variant>_v<version>.svg`

Famílias: `Legacy`, `Rage`, `Faith`, `Hope`, `Grief`, `Vengeance`, `Pride` e `Unity`.

## Regra de uso

Alterações de escala e cor são permitidas. Distorção, rotação arbitrária, troca de topologia, inclusão de matéria ou recombinação entre famílias exigem nova validação canônica.
