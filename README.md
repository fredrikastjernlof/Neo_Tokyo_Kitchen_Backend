# 🍜 Neo Tokyo Kitchen — Backend API

## 🧾 Beskrivning

Detta repository innehåller backend-delen för projektet **Neo Tokyo Kitchen**, ett restaurangsystem byggt som en del av kursen Backend-baserad webbutveckling.

Denna del av projektet går ut på att skapa ett backend-system för en fiktiv restaurang. I detta projekt valdes ett japanskt restaurangkoncept med neon/cyberpunk-inspirerad design och fokus på hantering av menyer, kategorier, bordsbokningar och administrationsfunktionalitet.

Backend-systemet ansvarar för:

- autentisering och auktorisering
- hantering av menykategorier och menyobjekt
- bordsbokningar
- statushantering för bokningar
- e-postbekräftelser
- skyddade admin-routes
- kommunikation med MongoDB Atlas

---

# 🎯 Syfte

Syftet med projektet är att:

- skapa en REST-baserad webbtjänst med full CRUD-funktionalitet
- använda JWT för autentisering och skyddade routes
- lagra data i MongoDB Atlas
- skapa ett realistiskt restaurangsystem med bokningsfunktionalitet
- bygga en backend som senare konsumeras av en Angular-frontend
- arbeta med projektstruktur, validering och säkerhet i en större applikation

---

# 🛠️ Tekniker

Projektet är byggt med:

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Nodemailer
- dotenv
- CORS
- Multer
- Sharp
- Nodemon

---

# 📦 Projektstruktur

```text
backend/
├── server.js
├── package.json
├── .env
├── .env.sample
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── menuCategoryController.js
    │   ├── menuItemController.js
    │   └── bookingController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── uploadMiddleware.js
    ├── models/
    │   ├── userModel.js
    │   ├── menuCategoryModel.js
    │   ├── menuItemModel.js
    │   └── bookingModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── menuCategoryRoutes.js
    │   ├── menuItemRoutes.js
    │   └── bookingRoutes.js
    ├── services/
    │   └── emailService.js
    └── uploads/
        ├── categories/
        └── temp/
```

---

# 📦 Datamodeller

## 👤 User

Används för autentisering av personal/admin.

### Fält

- `name`
- `email`
- `password`
- `role`
- `createdAt`
- `updatedAt`

### Exempel på funktionalitet

- lösenord hashas med bcrypt
- email valideras och lagras i lowercase
- JWT-token genereras vid login
- roller:
  - `admin`
  - `staff`

---

## 📂 MenuCategory

Representerar kategorier på restaurangens meny.

### Fält

- `name`
- `slug`
- `description`
- `image`
- `sortOrder`
- `isActive`
- `createdAt`
- `updatedAt`

### Exempel på funktionalitet

- skapa, uppdatera och ta bort kategorier
- kategorier används för att strukturera restaurangens meny
- kategoribilder kan laddas upp via Multer
- bilder konverteras automatiskt till WebP med Sharp
- tidigare kategoribild ersätts automatiskt vid ny uppladdning
- uppladdade bilder serveras statiskt via Express

---

## 🍱 MenuItem

Representerar restaurangens maträtter.

### Fält

- `name`
- `description`
- `category`
- `price`
- `dietary`
- `protein`
- `spiceLevel`
- `tags`
- `isAvailable`
- `sortOrder`
- `createdAt`
- `updatedAt`

---

## 📅 Booking

Representerar restaurangbokningar.

### Fält

- `name`
- `email`
- `phone`
- `guests`
- `startTime`
- `bookingNumber`
- `durationMinutes`
- `status`
- `notes`
- `createdAt`
- `updatedAt`

---

# 🔐 Autentisering

Webbtjänsten använder JWT (JSON Web Token) för autentisering och skydd av admin-routes.

Skyddade routes kräver:

```txt
Authorization: Bearer TOKEN
```

---

# 📧 E-postfunktionalitet

I projektet används Nodemailer tillsammans med Gmail SMTP för att skicka automatiska email.

## Funktioner

- bokningsbekräftelse vid skapad bokning
- avbokningsbekräftelse vid statusändring till `cancelled`

---

# 🔁 Funktionalitet (CRUD)

## 🔐 Auth

- registrera användare
- logga in användare
- skapa JWT-token

## 📂 Categories

- hämta kategorier
- skapa kategori
- uppdatera kategori
- ta bort kategori
- ladda upp kategoribild

## 🍜 Menu Items

- hämta menyobjekt
- skapa menyobjekt
- uppdatera menyobjekt
- ta bort menyobjekt

## 📅 Bookings

- skapa bokning
- automatiskt genererade bokningsnummer
- hämta bokningar
- uppdatera bokning
- ta bort bokning
- skicka boknings-/ avbokningsbekräftelse via email

---

# 🔗 API Endpoints

## 🔐 Auth

| Metod | Endpoint | Beskrivning |
|---|---|---|
| POST | `/api/auth/register` | Registrera admin/staff |
| POST | `/api/auth/login` | Logga in användare |

---

## 📂 Categories

| Metod | Endpoint | Beskrivning |
|---|---|---|
| GET | `/api/categories` | Hämta alla kategorier |
| GET | `/api/categories/:id` | Hämta kategori via id |
| POST | `/api/categories` | Skapa kategori |
| POST | `/api/categories/:id/image` | Ladda upp kategoribild |
| PUT | `/api/categories/:id` | Uppdatera kategori |
| DELETE | `/api/categories/:id` | Ta bort kategori |

---

## 🍱 Menu Items

| Metod | Endpoint | Beskrivning |
|---|---|---|
| GET | `/api/menu-items` | Hämta alla menyobjekt |
| GET | `/api/menu-items/:id` | Hämta menyobjekt via id |
| GET | `/api/menu-items/category/:slug` | Hämta menyobjekt via kategori |
| POST | `/api/menu-items` | Skapa menyobjekt |
| PUT | `/api/menu-items/:id` | Uppdatera menyobjekt |
| DELETE | `/api/menu-items/:id` | Ta bort menyobjekt |

---

## 📅 Bookings

| Metod | Endpoint | Beskrivning |
|---|---|---|
| POST | `/api/bookings` | Skapa bokning |
| GET | `/api/bookings` | Hämta alla bokningar |
| GET | `/api/bookings/:id` | Hämta bokning via id |
| PUT | `/api/bookings/:id` | Uppdatera bokning |
| DELETE | `/api/bookings/:id` | Ta bort bokning |

---

### Exempel på request body

#### Skapa kategori

POST `/api/categories`

```json
{
  "name": "Ramen",
  "slug": "ramen",
  "description": "Traditionella japanska nudelsoppor."
}
```

#### Skapa menyrätt

POST `/api/menu-items`

```json
{
  "name": "Tonkotsu Ramen",
  "description": "Fläskbuljong med nudlar och ägg.",
  "category": "<kategori-id>",
  "price": 159,
  "protein": "pork",
  "spiceLevel": 1,
  "isAvailable": true
}
```

Ersätt `<kategori-id>` med ID från en befintlig kategori.

#### Skapa bokning

POST `/api/bookings`

```json
{
  "name": "Anna Andersson",
  "email": "anna@example.se",
  "phone": "0701234567",
  "guests": 4,
  "startTime": "2026-06-15T18:00:00.000Z"
}
```

#### Skapa personal

POST `/api/auth/register`

```json
{
  "name": "Erik Svensson",
  "email": "erik@example.se",
  "password": "password123",
  "role": "staff"
}
```

#### Skapa administratör

POST `/api/auth/register`

```json
{
  "name": "Maria Johansson",
  "email": "maria@example.se",
  "password": "password123",
  "role": "admin"
}
```

#### Logga in

POST `/api/auth/login`

```json
{
  "email": "admin@example.se",
  "password": "password123"
}
```

---

# 📁 Installation (lokalt)

## 1. Klona repositoryt

```bash
git clone https://github.com/fredrikastjernlof/Neo_Tokyo_Kitchen_Backend.git
```

## 2. Installera dependencies

```bash
npm install
```

## 3. Skapa `.env`

```env
PORT=5001

MONGO_URI=din_mongodb_connection_string

JWT_SECRET=din_hemliga_jwt_nyckel

EMAIL_USER=din_gmail_adress
EMAIL_PASS=ditt_google_app_password
```

## 4. Starta utvecklingsservern

```bash
npm run dev
```

eller:

```bash
npm start
```

---

# 🔐 Säkerhet

Projektet använder:

- JWT för autentisering
- bcrypt för hashning av lösenord
- protected routes
- environment variables via `.env`
- Mongoose-validering
- filvalidering vid bilduppladdning
- begränsning av filstorlek vid uploads

---

## 🌐 Publicering

Webbtjänsten är publicerad via Render och använder MongoDB Atlas som databas.

[Öppna webbtjänst](https://neo-tokyo-kitchen-api.onrender.com/)

---

# ✅🙌 Det här tar jag med mig från projektet

Under detta projekt har jag arbetat med att bygga ett större backend-system med fokus på struktur, autentisering, bokningslogik och relationsdata.

Det som varit mest lärorikt har varit att förstå hur olika delar i ett backend-system hänger ihop, från routes och controllers till databashantering, middleware och services.

Projektet har också varit väldigt lärorikt när det gäller struktur och planering. I tidigare projekt har jag ofta tyckt att det varit svårt att veta hur projektstrukturen ska byggas upp från början. Men trots att detta varit en ganska omfattande uppgift känner jag att jag lyckades skapa en bra struktur redan från start, vilket gjorde det mycket enklare att fortsätta utveckla projektet under arbetets gång.