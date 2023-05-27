# Forum API

Esta es una API para un foro creada con node, [express](https://expressjs.com/), sequelize y postgres.

## Funcionalidades

- [x] Registro de usuario
- [x] Login de usuario
- [x] Obtener todas la categorias
- [x] Obtener todas las publicaciones de una categoria
- [x] Obtener una publicación con sus respuestas
- [x] Crear publicaciones en una categoria
- [x] Crear respuestas en una publicación
- [x] Solo un admin puede crear categorias
- [ ] Paginación de publicaciones y respuestas
- [x] Manejo de errores
- [x] Validación de datos
- [x] Autenticación
- [x] Permisos
- [x] Envio de correo
- [x] Validar email
- [ ] Recuperar contraseña

## Retos

1. Un moderador y un administrador pueden cerrar una publicación.
   > Que nadie más puede realizar comentarios en esa publicación
2. Que un admin pueda aprobar las respuestas
