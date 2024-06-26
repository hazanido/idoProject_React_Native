// src/routes/file_route.ts

import multer from 'multer';
import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

const base = "http://localhost:3000/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destPath = path.join(__dirname, '../../imageUser');
        console.log(`Destination path: ${destPath}`);
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '.jpg';
        console.log("Generated filename: " + filename);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req: Request & { file: Express.Multer.File }, res: Response) => {
    try {
        if (!req.file) {
            console.log('No file uploaded.');
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        const filePath = path.relative(__dirname, req.file.path);
        const fileUrl = `${base}idoProject_backend/imageUser/${filePath.replace(/\\/g, '/')}`;
        console.log(`File uploaded: ${fileUrl}`);
        res.status(200).send({ url: fileUrl });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

export default router;
