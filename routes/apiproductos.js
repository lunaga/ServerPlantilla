const express = require('express')

const Contenedor = require('../db/productos')
const path = './db/productos.txt'
const productos = new Contenedor (path)

const api = express.Router()
module.exports=api

api.use(function (req, res, next) {
    if (req.originalUrl === '/api/productos/:id') {
        if (req.method === 'POST') {
            req.method = 'PUT'
        }
    }
    next()
})

api.get('/api/productos', (_, res) => {
    productos.getAll().then((result) => { 
        let title= 'Guitarras'
        res.render('productos', {title, result} || {error: "producto no encontrado"}) })
})

api.get('/api/productos/:id', (req, res) => {
    const { id } = req.params
    productos.getById(Number(id))
        .then((result) => { res.send(result || { error: "No se encuentra dicho producto" }) })
})

api.post('/api/productos', (req, res) => {
    const nuevoProd = req.body
    productos.save(nuevoProd)
    res.redirect('/api/productos')
})


api.put('/api/productos/:id', (req, res) => {
        productos.modifyById(req.body, req.params.id)
        res.redirect('/api/productos')
})

api.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params
    productos.deleteById(Number(id))
    res.send('' || { error: 'No se encuentra el producto' })
})