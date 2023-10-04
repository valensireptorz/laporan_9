const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Pemilik
router.get('/', (req, res) => {
  connection.query('SELECT * FROM pemilik', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Pemilik',
        data: rows,
      });
    }
  });
});

// GET Pemilik by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM pemilik WHERE id_pemilik = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Pemilik not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Pemilik',
        data: rows[0],
      });
    }
  });
});

// POST Pemilik 
router.post('/add', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO pemilik SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_pemilik = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Pemilik berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH  Pemilik by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE pemilik SET ? WHERE id_pemilik = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Pemilik not found',
      });
    } else {
      updatedData.id_pemilik = id;
      return res.status(200).json({
        status: true,
        message: 'Data Pemilik berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Pemilik by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM pemilik WHERE id_pemilik = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Pemilik not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Pemilik berhasil dihapus',
      });
    }
  });
});

module.exports = router;