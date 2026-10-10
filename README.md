# Catálogo (Astro + Cloudflare Pages)

Sitio 100 % estático: categorías y productos en la raíz (`/origen`, `/origen-400-ml`), cada uno con su propia página, sitemap y botones de WhatsApp al detal y al por mayor. Instalable como PWA.

## Dónde editar

- `src/data/config.json`: nombre, descripción, números de WhatsApp (formato `57` + número, sin espacios) y mínimo al por mayor.
- `src/data/categorias.json`: categorías (`slug`, `nombre`, `descripcion`).
- `src/data/productos.json`: productos (`slug`, `categoria`, `nombre`, `descripcion`, `precioDetal`, `imagen`).
- `public/`: íconos, `_redirects` (redirecciones 301) y `robots.txt`.

Reglas de los slugs: en minúsculas y sin repetirse entre categorías y productos. Para conservar el posicionamiento, usa los mismos slugs que tenían en Jumpseller. El build falla con un mensaje claro si hay repetidos.

## Comandos

```
npm install
npm run dev       # ver el sitio en local
npm run build     # genera la carpeta dist
```

## Publicar en Cloudflare Pages

Sin GitHub: `npx wrangler pages deploy dist`
Con GitHub: conecta el repositorio, comando de build `npm run build`, carpeta de salida `dist`.

Después conecta `catalogo.com.co` como dominio personalizado y crea una regla de redirección 301 de `tiendas.com.co` hacia `catalogo.com.co`. Envía `https://catalogo.com.co/sitemap-index.xml` en Search Console.
