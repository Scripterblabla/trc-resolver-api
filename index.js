const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint utama API Resolver / Bypass
app.get('/api/bypass', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ 
            status: "error", 
            message: "Did you Forgot something?" 
        });
    }

    try {
        let serviceType = "Unknown";
        let resolvedLink = "";

        // Deteksi jenis link berdasarkan URL yang dimasukkan
        if (targetUrl.includes("linkvertise.com") || targetUrl.includes("link-to.net")) {
            serviceType = "Linkvertise";
            // [LOGIKA LINKVERTISE] 
            // Masukkan logika/script bypass Linkvertise di sini jika sudah ada
            resolvedLink = "https://linkvertise.com/your-target";

        } else if (targetUrl.includes("lootlabs.gg") || targetUrl.includes("loot-link.com")) {
            serviceType = "LootLabs";
            // [LOGIKA LOOTLABS]
            resolvedLink = "https://example.com/hasil-bypass-lootlabs";

        } else if (targetUrl.includes("work.ink")) {
            serviceType = "Work.ink";
            // [LOGIKA WORK.INK]
            resolvedLink = "https://example.com/hasil-bypass-workink";

        } else {
            // Jika link umum / tidak dikenali, kembalikan link asli atau pesan error
            serviceType = "Direct/Other";
            resolvedLink = targetUrl; 
        }

        // Kirim hasil JSON kembali ke website Anda
        return res.status(200).json({
            status: "success",
            service: serviceType,
            original_url: targetUrl,
            bypassed_url: resolvedLink
        });

    } catch (error) {
        return res.status(500).json({ 
            status: "error", 
            message: "Gagal memproses link: " + error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server API Resolver berjalan di port ${PORT}`);
});
