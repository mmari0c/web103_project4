import { pool } from '../config/database.js'

export const getCategories = async (req, res) => {
   try {
      const selectQuery = 'SELECT * FROM categories'
      const results = await pool.query(selectQuery)
      res.status(200).json(results.rows)
   } catch (error) {
      console.error('Error retrieving categories:', error)
      res.status(409).json({ error: 'Failed to retrieve categories.' })
   }
}