import express from 'express'
import { getOutfits } from '../controllers/custom_outfit.js'

const router = express.Router()

router.get('/outfits', getOutfits)

export default router