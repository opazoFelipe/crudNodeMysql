const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('links/add');
});

router.post('/add', (req, res)=>{
    // To Know what is received
    console.log(req.body);
    res.send('received');
});

module.exports = router;

// min 1:11:09 Video del crud
// https://www.youtube.com/watch?v=qJ5R9WTW0_E