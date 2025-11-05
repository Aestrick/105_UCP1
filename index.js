const express = require('express');
const app = express();
const port = 3000;

const db = require('./models');

app.use(express.json());

app.post('/hotel', async (req, res) => {
    try {
        const { tipe_kamar, kapasitas_tamu, lantai, fasilitas, tanggal_pesan } = req.body;
        
        if (!tipe_kamar || !kapasitas_tamu) {
            return res.status(400).json({ message: 'Tipe kamar dan kapasitas tamu wajib diisi' });
        }

        const dataBaru = await db.Hotel.create({
            tipe_kamar: tipe_kamar,
            kapasitas_tamu: kapasitas_tamu,
            lantai: lantai,
            fasilitas: fasilitas,
            tanggal_pesan: tanggal_pesan
        });
        
        res.status(201).json({
            success: true,
            message: 'Data hotel berhasil dibuat',
            data: dataBaru
        });

    } catch (error) {
        console.error('Error CREATE hotel:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/hotel', async (req, res) => {
    try {
        const semuaHotel = await db.Hotel.findAll();
        res.status(200).json({
            success: true,
            message: 'Data hotel berhasil diambil',
            data: semuaHotel
        });
    } catch (error) {
        console.error('Error GET all hotel:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/hotel/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await db.Hotel.findByPk(id);

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel tidak ditemukan' });
        }

        res.status(200).json({
            success: true,
            message: 'Data hotel berhasil diambil',
            data: hotel
        });

    } catch (error) {
        console.error('Error GET by ID hotel:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.put('/hotel/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await db.Hotel.findByPk(id);

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel tidak ditemukan' });
        }

        const { tipe_kamar, kapasitas_tamu, lantai, fasilitas, tanggal_pesan } = req.body;

        await hotel.update({
            tipe_kamar: tipe_kamar,
            kapasitas_tamu: kapasitas_tamu,
            lantai: lantai,
            fasilitas: fasilitas,
            tanggal_pesan: tanggal_pesan
        });

        res.status(200).json({
            success: true,
            message: 'Data hotel berhasil diupdate',
            data: hotel 
        });

    } catch (error) {
        console.error('Error UPDATE hotel:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.delete('/hotel/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await db.Hotel.findByPk(id);

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel tidak ditemukan' });
        }

        await hotel.destroy();

        res.status(200).json({
            success: true,
            message: 'Data hotel berhasil dihapus'
        });

    } catch (error) {
        console.error('Error DELETE hotel:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(port, async () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    try {
        await db.sequelize.authenticate();
        console.log('Koneksi ke database MySQL (Tentrem) BERHASIL.');
    } catch (error) {
        console.error('Koneksi ke database GAGAL:', error);
    }
});