const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Skanerlanganda ko'rinadigan test kameralari
app.get('/api/radar-scan', (req, res) => {
    setTimeout(() => {
        res.json({
            success: true,
            devices: [
                { id: "POL-CAM-01", ip: "192.168.1.50", model: "Hikvision PTZ Dome" },
                { id: "POL-CAM-02", ip: "192.168.1.65", model: "Dahua Bullet IPC" },
                { id: "V360-PRO-TEST", ip: "192.168.1.110", model: "V360 Pro Wireless" }
            ]
        });
    }, 2000);
});

// Protokolni ochish simulyatsiyasi
app.post('/api/decrypt', (req, res) => {
    res.json({
        success: true,
        algorithm: "AES-256-P2P / Bypass Active",
        status: "UNLOCKED"
    });
});

// Arxiv ma'lumotlarini qaytarish
app.get('/api/archive', (req, res) => {
    const { sana } = req.query;
    const mockArchive = [
        { sana: "2026-07-08", fayl: "REC_0830_ALARM.mp4", vaqt: "08:30", xavf: "Yuqori" },
        { sana: "2026-07-08", fayl: "REC_1420_DRIVE.mp4", vaqt: "14:20", xavf: "O'rtacha" }
    ];
    const result = mockArchive.filter(v => v.sana === sana);
    res.json({ success: true, videos: result });
});

app.listen(PORT, () => {
    console.log(`Node.js Backend ishlamoqda: http://localhost:${PORT}`);
});
