const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM imagenes')
  res.render('fotos', {imagenes: rows})
});

router.get('/mejorvaloradas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM imagenes ORDER BY likes desc')
  res.render('fotos', {imagenes: rows})
});

router.get('/peorvaloradas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM imagenes ORDER BY dislikes desc')
  res.render('fotos', {imagenes: rows})
});

router.get('/comentadas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM imagenes WHERE id in (SELECT id_imagen FROM comentarios)')
  res.render('fotos', {imagenes: rows})
});

router.get('/nocomentadas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM imagenes WHERE id not in (SELECT id_imagen FROM comentarios)')
  res.render('fotos', {imagenes: rows})
});

router.get('/addimage', async (req, res) => {
  res.render('nuevafoto')
})

router.post('/addimage', async (req, res) => {
  const {id} = req.params
  const {imagen, titulo, descripcion} = req.body
  const foto = {
    id: null,
    imagen,
    titulo,
    descripcion,
    likes: 0,
    dislikes: 0
  }
  await pool.query('INSERT INTO imagenes SET ?',[foto])
  res.redirect('/fotos')
})

router.get('/edit/:id', async (req, res) => {
  const {id} = req.params
  const [row] = await pool.query('SELECT * FROM imagenes WHERE id = ?', [id])
  res.render('edit', {foto: row[0]})
})

router.post('/edit/:id', async (req, res) => {
  const {id} = req.params
  const {imagen, titulo, descripcion} = req.body
  const foto = {
    imagen,
    titulo,
    descripcion
  }
  await pool.query('UPDATE imagenes SET ? WHERE id = ?', [foto, id])
  res.redirect('/fotos')
})

router.get('/delete/:id', async (req, res) => {
  const {id} = req.params
  await pool.query('DELETE FROM imagenes WHERE id = ?', [id])
  res.redirect('/fotos')
})

router.get('/like/:id', async (req, res) => {
  const {id} = req.params
  await pool.query('UPDATE imagenes SET likes = likes+1 WHERE id = ?', [id])
  res.redirect('/fotos')
})

router.get('/dislike/:id', async (req, res) => {
  const {id} = req.params
  await pool.query('UPDATE imagenes SET dislikes = dislikes+1 WHERE id = ?', [id])
  res.redirect('/fotos')
})

module.exports = router;
