# Proyecto CHALLENGE TECO

### ` DEV - Juan Ignacio Mc Kenna`
<div style="display: flex; justify-content: space-around;">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg" width="50">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" width="50">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MySQL-Dark.svg" width="50">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Bootstrap.svg" width="50">
</div>



## Sobre mi proyecto

Este proyecto es una aplicación web Full Stack desarrollada con **Node.js**, **Express**, **React**, y **MySQL**. Ofrece autenticación de usuarios, control de roles y una Pokédex interactiva consumida desde la [PokeAPI](https://pokeapi.co/). Además, los usuarios con permisos de administrador o editor pueden acceder a un panel de gestión completo.


## Funcionalidad

- El proyecto comienza en una página inicio de sesion o registro (dependiendo si tiene usuario registrado o no el usuario puede elegir, pero no puede ingresar a la API)
- Al loguearse es redirigido al home donde tiene la opcion de visualizar una Pokédex consumiendo la API pública https://pokeapi.co/
- Si el usuario tiene rol ADMIN o EDITOR en el nav bar tendra la opcion de ingresar a un panel donde se podrá "Crear", "Editar", "Leer" o "eliminar" un usuario. Ádemas de visualizar una lista de usuarios generados en su totalidad con: id, nombre, email, rol




🛠️ **`Tecnologías utilizadas`**

### Frontend
- **React JS** – Librería principal para la construcción de la interfaz de usuario.

- **React DOM** – Permite renderizar componentes de React en el DOM del navegador.

- **React Router DOM** – Manejo de rutas en una SPA sin necesidad de recargar la página.

- **Bootstrap 5** – Framework CSS para diseño responsivo y componentes estilizados.

- **Bootstrap Icons** – Conjunto de íconos vectoriales listos para usar con Bootstrap.

- **AOS (Animate On Scroll)** – Librería para animaciones al hacer scroll en la página.

- **PropTypes** – Validación de tipos de propiedades en componentes React.

- **React Icons** – Colección de íconos populares integrables como componentes React.

- **React Spinners** – Conjunto de componentes de spinners/indicadores de carga personalizables.

- **SweetAlert2** – Biblioteca para mostrar alertas y modales con estilo moderno e interactivo.

**Iniciar frontend** -Para correr el backend utilizamos : npm run start 


### Backend
- **Node.js** – Entorno de ejecución para JavaScript del lado del servidor.

- **Express** – Framework minimalista para construir APIs RESTful de manera eficiente.

- **MySQL** – Sistema de gestión de bases de datos relacional.

- **Passport (local y JWT)** – Middleware para autenticación con sesiones y tokens.

- **bcrypt** – Librería para el hash y la verificación segura de contraseñas.

- **multer** – Middleware para manejo de subida de archivos (por ejemplo, imágenes).

- **dotenv** – Manejo de variables de entorno desde archivos `.env`.

- **winston** – Librería para el registro y manejo de logs personalizados.

- **Git & GitHub** – Herramientas para control de versiones y colaboración en código.

- **Iniciar backend** -Para correr el backend utilizamos : npm run dev



## ⚙️ Configuración del entorno

Crear un archivo `.env.dev` (o `.env.prod` según corresponda) en la raíz del proyecto con las siguientes variables:

```env
HOST=localhost
DATABASE=nombre_de_la_base
DB_USER=usuario
DB_PASSWORD=contraseña
ADMIN_EMAIL=admin@ejemplo.com
ADMIN_PWD=admin123
JWT_SECRET=jwt_secreto
JWT_COOKIE=authToken
```


**El entorno se encuentra configurado en `src/config/config.js` para leer estas variables.**


## Formato de la Base de Datos

CREATE TABLE usuarios (

id INT AUTO_INCREMENT PRIMARY KEY,

nombre VARCHAR(100) NOT NULL,

email VARCHAR(100) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

rol ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',

creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP

) COLLATE='utf8mb4_general_ci';

### Contacto

Linkedin :<a href="https://www.linkedin.com/in/juan-mckenna/"> Juan Mc Kenna </a>