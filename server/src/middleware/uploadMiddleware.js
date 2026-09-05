import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories exist
const contactsUploadDir = path.join(__dirname, '../uploads/contacts');
const productsUploadDir = path.join(__dirname, '../uploads/products');

if (!fs.existsSync(contactsUploadDir)) fs.mkdirSync(contactsUploadDir, { recursive: true });
if (!fs.existsSync(productsUploadDir)) fs.mkdirSync(productsUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // If route is /contacts, save to contacts folder, else products
    const folder = req.baseUrl.includes('contacts') ? contactsUploadDir : productsUploadDir;
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  }
});

export default multer({ storage });
