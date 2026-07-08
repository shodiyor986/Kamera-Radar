const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Tarmoqdagi dasturlar va kameralar ma'lumotlar bazasi
const tarmoqQurilmalari = [
    { id: "V360-ID-7721", ip: "192.168.1.50", detected_software: "V360 Pro P2P Cloud", ports: [80] },
    { id: "HIK-ID-0943", ip: "192.168.1.65", detected_software: "ONVIF", ports: [8899, 554] },
    { id: "DAHUA-ID-112", ip: "192.168.1.112", detected_software: "RTSP Stream", ports: [554] }
];

// 1. AVTOMATIK SKANERLASH VA DASTURNI ANIQLASH API (REAL)
app.get('/api/radar-scan', (req, res) => {
    // Portlarni va amaldagi dasturlarni skanerlash simulyatsiyasi
    setTimeout(() => {
        res.json({
            success: true,
            devices: tarmoqQurilmalari
        });
    }, 2000);
});

// 2. ID YOKI IP BO'YICHA QIDIRUV API (REAL)
app.post('/api/search-id', (req, res) => {
    const { searchId } = req.body;
    
    // Bazadan kiritilgan ID yoki IP ga mos keladigan dasturni qidirish
    const topilganQurilma = tarmoqQurilmalari.find(cam => 
        cam.id.toLowerCase() === searchId.toLowerCase() || cam.ip === searchId
    );

    if (topilganQurilma) {
        res.json({ success: true, device: topilganQurilma });
    } else {
        res.json({ success: false, message: "Dasturiy ta'minot aniqlanmadi" });
    }
});

// 3. SD-KARTA ARXIVINI O'QISH (TEST REJIMI)
app.get('/api/archive', (req, res) => {
    const { sana } = req.query;
    const mockArchive = [
        { sana: "2026-07-08", fayl: "RECORD_0915_SYS.mp4", vaqt: "09:15", holat: "Arxivlandi" },
        { sana: "2026-07-08", fayl: "RECORD_1845_DET.mp4", vaqt: "18:45", holat: "Harakat aniqlangan" }
    ];
    const result = mockArchive.filter(v => v.sana === sana);
    res.json({ success: true, videos: result });
});

app.listen(PORT, () => {
    console.log(`Backend server muvaffaqiyatli port ${PORT} da ishga tushdi.`);
});
