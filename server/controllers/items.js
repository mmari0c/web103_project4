import { pool } from './database.js'

export const getAllItems = async (req, res) => {
   try {
      const selectQuery = 'SELECT * FROM items'
      const results = await pool.query(selectQuery)
      res.status(200).json(results.rows)  
   } catch (error) {
      console.error('Error retrieving items:', error)
      res.status(409).json({ error: 'Failed to retrieve items.' })
   }
}

export const getItemByCategory = async (req, res) => {
   try {
      const categoryId = parseInt(req.params.categoryId)
      const selectQuery = 'SELECT * FROM items WHERE category_id = $1'
      const results = await pool.query(selectQuery, [categoryId])
      res.status(200).json(results.rows)
   } catch (error) {
      console.error('Error retrieving item by category:', error)
      res.status(409).json({ error: 'Failed to retrieve item by category.' })
   }
}