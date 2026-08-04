# Around The U.S.

## Descripción

Around The U.S. es una aplicación web interactiva donde los usuarios pueden explorar y compartir lugares interesantes de Estados Unidos mediante tarjetas con imágenes y nombres.

El proyecto fue refactorizado y desarrollado con **TypeScript** y **Programación Orientada a Objetos (POO)**, conectándose a una **API REST** para gestionar datos en tiempo real mediante el patrón `async/await`.

## Funcionalidad

- Carga inicial de tarjetas y datos del perfil del usuario directamente desde una API REST remota.
- Creación y persistencia dinámica de nuevas tarjetas en el servidor.
- Edición del nombre, descripción del perfil y actualización de la foto de avatar sincrónicamente con la API.
- Eliminación de tarjetas propias con confirmación previa mediante modal.
- Sistema de "Me gusta" interactivo sincronizado en tiempo real con la API.
- Apertura de imágenes en modal con vista ampliada.
- Cierre de ventanas emergentes mediante botones de cierre, clic en el overlay o la tecla `Escape`.
- Validación de formularios en tiempo real con gestión de estado de botones.

## Tecnologías utilizadas

- HTML5 (Semántico)
- CSS3 (Metodología BEM y diseño responsivo)
- TypeScript (Con tipado estricto e interfaces)
- JavaScript / POO (Clases modulares para API, modales, formularios y tarjetas)
- Consumo de API REST mediante `fetch` y `async/await`
- Webpack (Empaquetado de módulos)
- Git & GitHub Pages

## GitHub Pages

https://mqgiag.github.io/web_project_around_es/