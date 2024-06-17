import multer from 'multer';
import express, { Request } from 'express';
const router = express.Router();




const base = "http://localhost:3000/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../imageUser/');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '.jpg';
        console.log("Generated filename: " + filename);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req: Request & { file: Express.Multer.File }, res) => {
    try {
        if (!req.file) {
            console.log('No file uploaded.');
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        console.log("File path: " + req.file.path);
        const fileUrl = `${base}${req.file.path}`;
        res.status(200).send({ url: fileUrl });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

export default router;



