// O export estático do Next 16 grava os segmentos RSC em pastas
// (ex.: visit/__next.visit/__PAGE__.txt), mas o navegador os pede com nome
// "achatado" (visit/__next.visit.__PAGE__.txt). Hospedagens simples como a
// Hostinger não fazem essa tradução, então copiamos cada arquivo para o nome
// esperado e evitamos 404 no pré-carregamento das páginas.
import { cpSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full);
    else walk(full);
  }
}

function flatten(pageDir, segmentDir) {
  for (const name of readdirSync(segmentDir)) {
    const full = join(segmentDir, name);
    if (statSync(full).isDirectory()) {
      flatten(pageDir, full);
    } else {
      const flat = relative(pageDir, full).split(sep).join(".");
      cpSync(full, join(pageDir, flat));
    }
  }
}

walk(OUT);
