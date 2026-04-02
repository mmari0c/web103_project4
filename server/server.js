import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import itemsRouter from './routes/items.js'
import customOutfitRouter from './routes/custom_outfit.js'
import categoriesRouter from './routes/categories.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }

    next()
})

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

app.use('/items', itemsRouter)
app.use('/outfits', customOutfitRouter)
app.use('/categories', categoriesRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
