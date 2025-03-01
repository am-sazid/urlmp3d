import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // CORS সমস্যা এড়াতে

app.get("/", (req, res) => {
    res.send("🎵 Welcome to the YouTube MP3 Downloader API! 🎵");
});

// MP3 Download Route (Free API ব্যবহার করে)
app.get('/api/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Please provide a YouTube URL" });
    }

    try {
        // ফ্রি API থেকে MP3 লিংক
        const apiUrl = `https://api.vevioz.com/api/button/mp3?url=${encodeURIComponent(url)}`;

        return res.json({ downloadUrl: apiUrl });
    } catch (error) {
        return res.status(500).json({ error: "Failed to convert video to MP3" });
    }
});

// Vercel Serverless Handler
export default app;
