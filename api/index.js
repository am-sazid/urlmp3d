export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Please provide a YouTube URL" });
    }

    try {
        // MP3 ডাউনলোড লিংকের জন্য ফ্রি API
        const apiUrl = `https://api.vevioz.com/api/button/mp3?url=${encodeURIComponent(url)}`;

        return res.status(200).json({ downloadUrl: apiUrl });
    } catch (error) {
        return res.status(500).json({ error: "Failed to convert video to MP3" });
    }
}
