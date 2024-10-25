# Express PostgreSQL CRUD Application
---

A simple Express.js app for managing items in a PostgreSQL database.

## Technologies
- **Node.js**
- **Express**
- **PostgreSQL**
- **Body-Parser**
- **EJS**

Install dependencies:
---
npm install

Set up PostgreSQL and create the items table:
---

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

Configure database connection in dbConfig.js:
---

import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

export default pool;

Start the server:
---
nodemon index.js

Usage
---
Navigate to http://localhost:3000 to use the app.

Routes
---
GET / - View all items.
POST /add - Add an item.
POST /edit - Edit an item.
POST /delete - Delete an item.













