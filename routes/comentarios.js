const express = require('express');
const router = express.Router();

const pool = require('../database')


router.get('/comentarios/:id', async (req, res) => {
    const {id} = req.params
    const [rows] = await pool.query('SELECT * FROM comentarios WHERE id_imagen = ?', [id])
    res.render('comentarios', {comentarios: rows})
})




module.exports = router;
