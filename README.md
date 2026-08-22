# Proyecto: Gestor de Tareas Avanzado (Angular + Lumen)

Este proyecto está dividido en dos partes: el **Backend** (API RESTful con Lumen PHP) y el **Frontend** (Aplicación web con Angular).

Para que la aplicación funcione, necesitas tener ambos servidores corriendo simultáneamente. A continuación te explico cómo iniciarlos.

---

## 1. Iniciar el Backend (Lumen)

El backend expone la API y se conecta a la base de datos SQLite.

1. Abre una nueva terminal o consola de comandos.
2. Navega a la carpeta del backend:
   ```bash
   cd ruta/a/tu/proyecto/AngularLumen/backend
   ```
3. Ejecuta el servidor de desarrollo de PHP apuntando a la carpeta `public`:
   ```bash
   php -S localhost:8000 -t public
   ```
4. Verás un mensaje indicando que el servidor ha iniciado. Déjalo corriendo en esa ventana.

---

## 2. Iniciar el Frontend (Angular)

El frontend es la interfaz gráfica que consumirá la API del backend.

1. Abre **otra** nueva ventana de terminal (no cierres la del backend).
2. Navega a la carpeta del frontend:
   ```bash
   cd ruta/a/tu/proyecto/AngularLumen/frontend
   ```
3. Inicia el servidor de desarrollo de Angular:
   ```bash
   npm start
   ```
4. Espera a que termine de compilar. Cuando veas el mensaje `Compiled successfully` o `Watch mode enabled`, podrás acceder a la aplicación web.
5. Abre tu navegador web favorito y entra a:
   [http://localhost:4200](http://localhost:4200)

---

### Notas Adicionales
- Si en algún momento modificas la estructura de la base de datos (migraciones), puedes resetearla corriendo el siguiente comando dentro de la carpeta `backend/`:
  ```bash
  php artisan migrate:refresh --seed
  ```
