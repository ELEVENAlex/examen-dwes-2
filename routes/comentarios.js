const express = require('express');
const router = express.Router();

const pool = require('../database')


router.get('/comentarios/:id', async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query('SELECT * FROM comentarios WHERE id_imagen = ?', [id])
    res.render('comentarios', {comentarios: rows, id})
})

router.get('/addcomment/:id', async (req, res) => {
    const {id} = req.params
    res.render('addcomment', {id})
})

router.post('/addcomment/:id', async (req, res) => {
    const {id} = req.params
    const {autor, comentario} = req.body
    const newComentario = {
        autor,
        comentario,
        id_imagen: id
    }
    await pool.query('INSERT INTO comentarios SET ?',[newComentario])
    res.redirect('/fotos/comentarios/' + id)
})




module.exports = router;
