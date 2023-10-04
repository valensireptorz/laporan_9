const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Alat Tangkap
router.get('/', (req, res) => {
  connection.query('SELECT * FROM alat_tangkap', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Alat Tangkap',
        data: rows,
      });
    }
  });
});

// GET Alat Tangkap by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM alat_tangkap WHERE id_alat_tangkap = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Alat Tangkap not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Alat Tangkap',
        data: rows[0],
      });
    }
  });
});

// POST Alat Tangkap 
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO alat_tangkap SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_alat_tangkap = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Alat Tangkap berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH  Alat Tangkap by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Alat Tangkap not found',
      });
    } else {
      updatedData.id_alat_tangkap = id;
      return res.status(200).json({
        status: true,
        message: 'Data Alat Tangkap berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Alat Tangkap by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Alat Tangkap not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Alat Tangkap berhasil dihapus',
      });
    }
  });
});

module.exports = router;