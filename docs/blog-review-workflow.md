# Cómo revisamos y publicamos posts del blog

Framework para que **Santi y el socio** revisen y curen cada post **antes** de que salga en vivo. Nada se publica hasta que los dos aprueben.

## El flujo en 5 pasos

1. **Draft.** Claude escribe el post y lo sube a una rama `draft/<tema>` en GitHub. Nunca directo a `main`, así que el sitio en vivo no se toca.

2. **Preview.** Cloudflare genera **automáticamente** una URL de preview de esa rama, donde el post se ve **exactamente como quedaría publicado** (no markdown, la página real). Claude les pasa el link. Se abre desde cualquier dispositivo, sin instalar nada.
   > Formato del link: `https://<nombre-rama>.talent-weave-works.pages.dev/blog`

3. **Curar.** Dejan comentarios con los cambios que quieran:
   - **Cambios de texto/tono:** lo más simple → decírselo a Claude (chat) o comentar en el Pull Request. Claude aplica los cambios y la preview se actualiza sola en ~1 minuto.
   - Repiten hasta que los dos estén conformes.

4. **Aprobar.** En el Pull Request de GitHub, cada uno da **Approve**. La regla de `main` exige **2 aprobaciones**, así que un solo OK no alcanza.

5. **Publicar.** Se mergea el PR → Cloudflare publica en `meiba.com.ar` en minutos. El sitemap se actualiza solo.

## Por qué este framework
- **Ven la página real**, no código. Cero fricción técnica.
- **Doble aprobación obligatoria**: nada sale sin los dos.
- **Reversible**: si algo se cuela, se revierte el merge y listo.
- **Usa lo que ya tienen** (GitHub + Cloudflare), sin sumar herramientas ni costos.
- Las preview URLs están marcadas `noindex`: Google no las indexa, no compiten con el sitio real.

## Para curar mucho texto en conjunto (opcional)
Si en algún post quieren co-editar párrafos a cuatro manos, Claude puede dejar el borrador primero en un **Google Doc** compartido (modo sugerencias) y, una vez cerrado, pasarlo a la web. Para ajustes normales, el flujo de arriba alcanza.

## Setup único (una sola vez)
Para que la regla de "2 aprobaciones" se cumpla sola, activar branch protection en `main`:
GitHub → repo → **Settings → Branches → Add branch ruleset** → Branch: `main` →
tildar **Require a pull request before merging** y **Require approvals: 2**.
