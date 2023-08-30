import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const { PORT } = process.env;

// Application level middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

app.post('/api/users', upload.single('upfile'), (req, res) => {
  const fileData = req.file;
  const dataObj = {
    name: fileData.originalname,
    type: fileData.mimetype,
    size: fileData.size,
  };
  res.send(dataObj);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
