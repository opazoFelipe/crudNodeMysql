const express = require('express');
const router = express.Router();

const pool = require('../database');

// Show all links registered in the database
router.get('/', async(req, res)=>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    res.render('links/list', { links });
});

// Add View returned by this route
router.get('/add', (req, res)=>{
    res.render('links/add');
});

// Submit form for store the data with POST method
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

// Edit link returned by this route
router.get('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?',  [id]);
    const link = links[0];
    console.log(link);
    res.render('links/edit', { link });
});

// Update links by their id in the database
router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    }
    await pool.query('UPDATE links SET ? WHERE id = ?',  [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});

// Delete links by their id in the database
router.get('/delete/:id', async(req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
});

module.exports = router;

