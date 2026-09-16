# Sitio web – New Lakewood Chamber of Commerce

Sitio estático (HTML + CSS + JS). No necesita servidor ni base de datos.

## Estructura
```
index.html          Portada
membership.html     Membresía y cuotas
events.html         Eventos
directory.html      Directorio de miembros (con búsqueda)
transparency.html   Junta directiva y documentos públicos
contact.html        Contacto
data/site-data.js   << TODO EL CONTENIDO EDITABLE ESTÁ AQUÍ
assets/css/styles.css
assets/js/main.js   Menú, pie de página y listas (no hace falta tocarlo)
docs/               PDFs de actas, Form 990, balances
```

## Editar contenido
Abrir `data/site-data.js`:
- Cuotas: arreglo `tiers`
- Eventos: arreglo `events` (fecha AAAA-MM-DD; los pasados se ocultan solos)
- Miembros: arreglo `members` (borrar los de ejemplo)
- Junta: arreglo `board`
- Documentos: subir el PDF a `docs/` y agregarlo en `documents`
- Enlaces: `links.join` (formulario de Zeffy) y `links.contactForm` (Formspree)
- Crédito del voluntario: `volunteerCredit`

## Probar en local
Doble clic en `index.html`. Funciona sin servidor.

## Pendientes antes de lanzar
- [ ] Enlace de membresía de Zeffy en `links.join`
- [ ] Endpoint de Formspree en `links.contactForm`
- [ ] Correo real en `email`
- [ ] Nombre del voluntario en `volunteerCredit`
- [ ] Nombres de la junta
- [ ] Confirmar tabla de cuotas oficial
