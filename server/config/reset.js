import './dotenv.js'
import { pool } from './database.js'
import categoryData from '../data/categories.js'
import itemData from '../data/items.js'

const createCategoriesTable = async () => {
   const createTableQuery = `
      DROP TABLE IF EXISTS custom_outfits;
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS categories;
      CREATE TABLE categories (
         category_id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL
      );
   `

   await pool.query(createTableQuery)
   console.log('Categories table created successfully.')
}

const seedCategoriesTable = async () => {
   await createCategoriesTable()

   for (const category of categoryData) {
      const insertQuery = {
         text: 'INSERT INTO categories (category_id, name) VALUES ($1, $2)',
         values: [category.category_id, category.name]
      }

      await pool.query(insertQuery)
      console.log(`Category "${category.name}" inserted successfully.`)
   }
}

const createItemsTable = async () => {
   const createTableQuery = `
      CREATE TABLE items (
         item_id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         category_id INT REFERENCES categories(category_id) NOT NULL,
         style_tag VARCHAR(255) NOT NULL,
         price DECIMAL(10, 2) NOT NULL,
         image VARCHAR(255) NOT NULL
      );
   `

   await pool.query(createTableQuery)
   console.log('Items table created successfully.')
}

const seedItemsTable = async () => {
   await createItemsTable()

   for (const item of itemData) {
      const insertQuery = {
         text: 'INSERT INTO items (name, category_id, style_tag, price, image) VALUES ($1, $2, $3, $4, $5)',
         values: [item.name, item.category_id, item.style_tag, item.price, item.image]
      }

      await pool.query(insertQuery)
      console.log(`Item "${item.name}" inserted successfully.`)
   }
}

const createCustomOutfitTable = async () => {
   const createTableQuery = `
      CREATE TABLE custom_outfits (
         outfit_id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         top_id INT REFERENCES items(item_id) NOT NULL,
         jacket_id INT REFERENCES items(item_id),
         bottom_id INT REFERENCES items(item_id) NOT NULL,
         shoes_id INT REFERENCES items(item_id) NOT NULL
      );
   `

   await pool.query(createTableQuery)
   console.log('Custom outfits table created successfully.')
}

const resetDatabase = async () => {
   try {
      await seedCategoriesTable()
      await seedItemsTable()
      await createCustomOutfitTable()
      console.log('Database reset and seed complete.')
   } catch (err) {
      console.error('Error resetting database:', err)
   } finally {
      await pool.end()
   }
}

await resetDatabase()
