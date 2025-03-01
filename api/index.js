const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get("/",(req,res)=>{
    res.send("hello world ")
})

app.get('/download', (req, res) => {
    const audioUrl = req.query.url;
    if (!audioUrl) {
        return res.status(400).send('Please provide an MP3 URL');
    }

    const fileName = 'audio.mp3';
    const fileStream = fs.createWriteStream(fileName);

    request(audioUrl)
        .pipe(fileStream)
        .on('finish', () => {
            res.download(fileName, () => {
                fs.unlinkSync(fileName); // ডাউনলোডের পর ফাইল ডিলিট করে দেবে
            });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
