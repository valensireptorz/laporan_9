const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All DPI
router.get('/', (req, res) => {
  connection.query('SELECT id_dpi, nama_dpi FROM dpi', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data DPI',
        data: rows,
      });
    }
  });
});

// GET DPI by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT id_dpi, nama_dpi FROM dpi WHERE id_dpi = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data DPI not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data DPI',
        data: rows[0],
      });
    }
  });
});

// POST DPI (Menambah Data Baru)
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO dpi SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_dpi = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data DPI berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH (Update) DPI by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE dpi SET ? WHERE id_dpi = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data DPI not found',
      });
    } else {
      updatedData.id_dpi = id;
      return res.status(200).json({
        status: true,
        message: 'Data DPI berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE DPI by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM dpi WHERE id_dpi = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data DPI not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data DPI berhasil dihapus',
      });
    }
  });
});

module.exports = router;