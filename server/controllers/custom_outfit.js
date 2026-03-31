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
