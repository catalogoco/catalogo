# Catálogo (Astro + Cloudflare Pages)

Sitio 100 % estático: laboratorios, categorías y productos en la raíz (`/laboratorio-natural-medix`, `/capsulas`, `/fenogreco-alholva`), cada uno con su propia página, sitemap y botones de WhatsApp al detal y al por mayor. Instalable como PWA.

## Dónde editar

- `src/data/config.json`: nombre, descripción, números de WhatsApp (formato `57` + número, sin espacios) y mínimo al por mayor.
- `src/data/laboratorios.json`: los 9 laboratorios. La página de un laboratorio solo se crea cuando tiene al menos un producto. El campo `descripcion` es el texto propio de esa página (conviene 100 a 200 palabras).
- `src/data/categorias.json`: categorías.
- `src/data/productos.json`: productos (`slug`, `nombre`, `laboratorio`, `categorias`, `categoriaPrincipal`, `presentacion`, `descripcionCorta`, `descripcionHtml`, `precioDetal`, `imagenes`).
- `public/_redirects`: redirecciones 301 de URLs viejas.

Reglas de los slugs: en minúsculas y sin repetirse entre productos, categorías y laboratorios. El build falla con un mensaje claro si hay repetidos.

## Estado de los datos

Cargados desde `import_jumpseller_20260924.sql`: 39 de los 81 productos de Natural Medix, los que tienen foto. Los otros 41 no se publican todavía y sus URLs viejas quedan redirigidas en `public/_redirects`. Cuando publiques un producto, agrégalo a `productos.json` y borra su línea de `_redirects`.

Faltan los productos de Vanier (Origen 400 mL), Makilar 2.0 (Blue Line 360 mL) y Mega Foods (Zarzilla Alfa 500 mL), que no venían en el archivo.

## Comandos

```
npm install astro @astrojs/sitemap
npm run dev        # ver el sitio en local
npm run imagenes   # baja las fotos de Jumpseller a public/img (hazlo antes de cerrar la tienda)
npm run build      # genera la carpeta dist
```

## Publicar en Cloudflare Pages

Sin GitHub: `npx wrangler pages deploy dist`
Con GitHub: conecta el repositorio, comando de build `npm run build`, carpeta de salida `dist`.

Después conecta `catalogo.com.co` como dominio personalizado y crea una regla de redirección 301 de `tiendas.com.co` hacia `catalogo.com.co`. Envía `https://catalogo.com.co/sitemap-index.xml` en Search Console.
