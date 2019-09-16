const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', async(req, res)=>{
    // To Know what is received
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/', async(req, res)=>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?',  [id]);
    const link = links[0];
    console.log(link);
    res.render('links/edit', { link });
});

router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    }
    await pool.query('UPDATE links SET ? WHERE id = ?',  [newLink, id]);
    res.redirect('/links');
});

module.exports = router;

