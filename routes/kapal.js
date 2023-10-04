const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET All Kapal
router.get('/', (req, res) => {
    connection.query('SELECT kapal.nama_kapal, pemilik.nama_pemilik, dpi.luas AS luas, alat_tangkap.nama_alat_tangkap FROM kapal ' +
      'LEFT JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik ' +
      'LEFT JOIN dpi ON kapal.id_dpi = dpi.id_dpi ' +
      'LEFT JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap', (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: 'Server Error',
          });
        } else {
          return res.status(200).json({
            status: true,
            message: 'Data Kapal',
            data: rows,
          });
        }
      });
  });
  

// GET Kapal by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT kapal.nama_kapal, pemilik.nama_pemilik, dpi.luas AS luas, alat_tangkap.nama_alat_tangkap FROM kapal ' +
      'LEFT JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik ' +
      'LEFT JOIN dpi ON kapal.id_dpi = dpi.id_dpi ' +
      'LEFT JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap ' +
      'WHERE kapal.id_kapal = ?', [id], (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: 'Server Error',
          });
        }
        if (rows.length <= 0) {
          return res.status(404).json({
            status: false,
            message: 'Data Kapal not found',
          });
        } else {
          return res.status(200).json({
            status: true,
            message: 'Data Kapal',
            data: rows[0],
          });
        }
      });
});


// POST Kapal 
router.post('/', (req, res) => {
  const newData = req.body; // Data yang dikirimkan dalam body permintaan

  connection.query('INSERT INTO kapal SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else {
      newData.id_kapal = result.insertId;
      return res.status(201).json({
        status: true,
        message: 'Data Kapal berhasil ditambahkan',
        data: newData,
      });
    }
  });
});

// PATCH Kapal by ID
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE kapal SET ? WHERE id_kapal = ?', [updatedData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kapal not found',
      });
    } else {
      updatedData.id_kapal = id;
      return res.status(200).json({
        status: true,
        message: 'Data Kapal berhasil diupdate',
        data: updatedData,
      });
    }
  });
});

// DELETE Kapal by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM kapal WHERE id_kapal = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Kapal not found',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Data Kapal berhasil dihapus',
      });
    }
  });
});

module.exports = router;