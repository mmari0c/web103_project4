import express from 'express'
import { getOutfits, createOutfit } from '../controllers/custom_outfit.js'

const router = express.Router()

router.get('/', getOutfits)
router.post('/', createOutfit)

export default router