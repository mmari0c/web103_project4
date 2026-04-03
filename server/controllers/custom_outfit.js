import { pool } from '../config/database.js'

export const getOutfits = async (req, res) => {
   try {
      const selectQuery = `SELECT
                           co.outfit_id,
                           co.name,
                           top.item_id AS top_item_id,
                           top.name AS top_name,
                           top.image AS top_image,
                           top.style_tag AS top_style_tag,
                           top.price AS top_price,
                           jacket.item_id AS jacket_item_id,
                           jacket.name AS jacket_name,
                           jacket.image AS jacket_image,
                           jacket.style_tag AS jacket_style_tag,
                           jacket.price AS jacket_price,
                           bottom.item_id AS bottom_item_id,
                           bottom.name AS bottom_name,
                           bottom.image AS bottom_image,
                           bottom.style_tag AS bottom_style_tag,
                           bottom.price AS bottom_price,
                           shoes.item_id AS shoes_item_id,
                           shoes.name AS shoes_name,
                           shoes.image AS shoes_image,
                           shoes.style_tag AS shoes_style_tag,
                           shoes.price AS shoes_price
                           FROM custom_outfits co
                           JOIN items top ON co.top_id = top.item_id
                           LEFT JOIN items jacket ON co.jacket_id = jacket.item_id
                           JOIN items bottom ON co.bottom_id = bottom.item_id
                           JOIN items shoes ON co.shoes_id = shoes.item_id`
      const results = await pool.query(selectQuery)
      res.status(200).json(results.rows)
   } catch (error) {
      console.error('Error retrieving outfits:', error)
      res.status(409).json({ error: 'Failed to retrieve outfits.' })
   }
}

export const createOutfit = async (req, res) => {
   try {
      const { name, top_id, jacket_id, bottom_id, shoes_id} = req.body
      const insertQuery = {
         text: 'INSERT INTO custom_outfits (name, top_id, jacket_id, bottom_id, shoes_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
         values: [name, top_id, jacket_id, bottom_id, shoes_id]
      }
      const results = await pool.query(insertQuery)
      res.status(201).json(results.rows[0])
   } catch (error) {
      console.error('Error creating outfit: ', error)
      res.status(409).json({ error: 'Failed to create outfit.'})
   }
}

export const getOutfitById = async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const selectQuery = `SELECT
                           co.outfit_id,
                           co.name,
                           top.item_id AS top_item_id,
                           top.name AS top_name,
                           top.image AS top_image,
                           top.style_tag AS top_style_tag,
                           top.price AS top_price,
                           jacket.item_id AS jacket_item_id,
                           jacket.name AS jacket_name,
                           jacket.image AS jacket_image,
                           jacket.style_tag AS jacket_style_tag,
                           jacket.price AS jacket_price,
                           bottom.item_id AS bottom_item_id,
                           bottom.name AS bottom_name,
                           bottom.image AS bottom_image,
                           bottom.style_tag AS bottom_style_tag,
                           bottom.price AS bottom_price,
                           shoes.item_id AS shoes_item_id,
                           shoes.name AS shoes_name,
                           shoes.image AS shoes_image,
                           shoes.style_tag AS shoes_style_tag,
                           shoes.price AS shoes_price
                           FROM custom_outfits co
                           JOIN items top ON co.top_id = top.item_id
                           LEFT JOIN items jacket ON co.jacket_id = jacket.item_id
                           JOIN items bottom ON co.bottom_id = bottom.item_id
                           JOIN items shoes ON co.shoes_id = shoes.item_id
                           WHERE co.outfit_id = $1`
      const results = await pool.query(selectQuery, [id])
      res.status(200).json(results.rows[0])
   } catch (error) {
      console.error('Error retrieving outfit by ID: ', error)
      res.status(409).json({ error: 'Failed to retrieve outfit.'})
   }
}

export const editOutfit = async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const { name, top_id, jacket_id, bottom_id, shoes_id} = req.body
      const updateQuery = {
         text: 'UPDATE custom_outfits SET name = $1, top_id = $2, jacket_id = $3, bottom_id = $4, shoes_id = $5 WHERE outfit_id = $6 RETURNING *',
         values: [name, top_id, jacket_id, bottom_id, shoes_id, id]
      }
      const results = await pool.query(updateQuery)
      res.status(200).json(results.rows[0])
   } catch (error) {
      console.error('Error editing outfit: ', error)
      res.status(409).json({ error: 'Failed to edit outfit.'})
   }
}

export const deleteOutfit = async (req, res) => {
   try {
      const id = parseInt(req.params.id)
      const deleteQuery = 'DELETE FROM custom_outfits WHERE outfit_id = $1'
      await pool.query(deleteQuery, [id])
      res.status(204).send()
   } catch (error) {
      console.error('Error deleting outfit: ', error)
      res.status(409).json({ error: 'Failed to delete outfit.'})
   }
}
