// Descarga las fotos que hoy están en images.jumpseller.com a public/img
// y cambia las rutas en src/data/productos.json. Ejecútalo con: npm run imagenes
// Hazlo ANTES de cerrar o cancelar la tienda de Jumpseller, o las fotos dejarán de verse.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const archivo = "src/data/productos.json";
const productos = JSON.parse(await readFile(archivo, "utf8"));
await mkdir("public/img", { recursive: true });

let bajadas = 0;
let fallidas = 0;
for (const p of productos) {
  const nuevas = [];
  for (const [i, url] of p.imagenes.entries()) {
    if (!url.startsWith("http")) {
      nuevas.push(url);
      continue;
    }
    const ext = (new URL(url).pathname.match(/\.(png|jpe?g|webp|gif)$/i)?.[1] ?? "png").toLowerCase();
    const nombre = `${p.slug}-${i + 1}.${ext}`;
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      await writeFile(path.join("public/img", nombre), Buffer.from(await r.arrayBuffer()));
      nuevas.push(`/img/${nombre}`);
      bajadas++;
    } catch (e) {
      console.warn(`No se pudo bajar ${url}: ${e.message}`);
      nuevas.push(url);
      fallidas++;
    }
  }
  p.imagenes = nuevas;
}
await writeFile(archivo, JSON.stringify(productos, null, 2) + "\n");
console.log(`Imágenes descargadas: ${bajadas}. Fallidas: ${fallidas}.`);
