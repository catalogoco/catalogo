import categorias from "../data/categorias.json";
import laboratorios from "../data/laboratorios.json";
import todos from "../data/productos.json";

// Solo se publican los productos con publicar distinto de false.
export const productos = todos.filter((p) => p.publicar !== false);

export const labPorSlug = Object.fromEntries(laboratorios.map((l) => [l.slug, l]));
export const catPorSlug = Object.fromEntries(categorias.map((c) => [c.slug, c]));

export const productosDeLab = (slug) => productos.filter((p) => p.laboratorio === slug);
export const productosDeCat = (slug) => productos.filter((p) => (p.categorias ?? []).includes(slug));

// Una página de laboratorio o categoría solo existe si tiene al menos un producto publicado.
export const labsConProductos = laboratorios.filter((l) => productosDeLab(l.slug).length > 0);
export const catsConProductos = categorias.filter((c) => productosDeCat(c.slug).length > 0);

export const pesos = (n) => "$" + Number(n).toLocaleString("es-CO");
export const wa = (numero, texto) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
export const nombreCompleto = (p) =>
  p.presentacion && !p.nombre.includes(p.presentacion) ? `${p.nombre} ${p.presentacion}` : p.nombre;

// Falla el build con un mensaje claro si los datos tienen algún problema.
export function validar() {
  const errores = [];
  const slugs = [
    ...catsConProductos.map((c) => c.slug),
    ...labsConProductos.map((l) => l.slug),
    ...productos.map((p) => p.slug),
  ];
  const vistos = new Set();
  for (const s of slugs) {
    if (vistos.has(s)) errores.push(`Slug repetido entre categorías, laboratorios y productos: ${s}`);
    vistos.add(s);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) errores.push(`Slug inválido (solo minúsculas, números y guiones): ${s}`);
  }
  for (const p of productos) {
    if (!labPorSlug[p.laboratorio]) errores.push(`${p.slug}: el laboratorio "${p.laboratorio}" no existe en laboratorios.json`);
    for (const c of p.categorias ?? []) {
      if (!catPorSlug[c]) errores.push(`${p.slug}: la categoría "${c}" no existe en categorias.json`);
    }
    if (p.precioDetal == null) errores.push(`${p.slug}: falta precioDetal (o ponle "publicar": false)`);
    // Las imágenes son opcionales: sin foto, el producto muestra "Foto pendiente".
  }
  if (errores.length) throw new Error("Problemas en los datos:\n - " + errores.join("\n - "));
}
