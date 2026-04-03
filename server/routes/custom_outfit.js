import express from 'express'
import { getOutfits, createOutfit, getOutfitById, editOutfit, deleteOutfit } from '../controllers/custom_outfit.js'

const router = express.Router()

router.get('/', getOutfits)
router.post('/', createOutfit)
router.put('/:id', editOutfit)
router.get('/:id', getOutfitById)
router.delete('/:id', deleteOutfit)

export default router