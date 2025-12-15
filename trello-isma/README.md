# Trello Isma App
## 📁 Estructura

- `trello-isma` → Frontend
- `trello-api` → Backend / API

---

## 🚀 Instalación y ejecución

### 1️⃣ Frontend – instalar dependencias

```bash
cd trello-isma
npm install
```

---

### 2️⃣ Backend – instalar dependencias

```bash
cd trello-api
npm install
```

---

### 3️⃣ Backend – ejecutar SEED (OBLIGATORIO)

> ⚠️ **Este paso es obligatorio para que la app funcione con datos**

Desde la carpeta `trello-api` ejecutar:

```bash
npm run seed
```

Este comando inicializa la base de datos y carga datos de ejemplo (columnas, tarjetas y subtareas).

---

### 4️⃣ Levantar la aplicación

#### Backend

```bash
cd trello-api
npm run dev
```

#### Frontend

```bash
cd trello-isma
npm run dev
```

---

## ✅ Resultado

Con el frontend y el backend corriendo, y el **seed ejecutado**, la aplicación se puede usar normalmente y el tablero se muestra con datos precargados.

---

## 🛠️ Notas

- El **seed debe ejecutarse al menos una vez** antes de usar la app.
- Podés volver a correr `npm run seed` si necesitás resetear los datos.
- Asegurate de levantar primero el backend.
