import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FOLDER_ID = '1fXFjejI86vYJbNK1nSCeaWsSX2eCTl8R';
const API_KEY = process.env.VITE_GOOGLE_DRIVE_API_KEY;
const PHOTOS_DIR = path.join(__dirname, 'public', 'photos');

// Ensure photos directory exists
if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
}

async function fetchFolders() {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&key=${API_KEY}`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function fetchPhotosFromFolder(folderId) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,mimeType)&key=${API_KEY}`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function downloadFile(fileId, filePath) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function syncPhotos() {
    console.log('🔄 Syncing photos from Google Drive...\n');

    if (!API_KEY) {
        console.error('❌ Error: VITE_GOOGLE_DRIVE_API_KEY not found in environment variables');
        process.exit(1);
    }

    try {
        // Fetch all folders (categories)
        const foldersData = await fetchFolders();

        if (!foldersData.files || foldersData.files.length === 0) {
            console.log('⚠️  No category folders found in Google Drive');
            return;
        }

        console.log(`Found ${foldersData.files.length} categories\n`);

        const manifest = {};
        let totalPhotos = 0;

        // Process each folder
        for (const folder of foldersData.files) {
            const categoryName = folder.name;
            const categoryDir = path.join(PHOTOS_DIR, categoryName);

            // Create category directory
            if (!fs.existsSync(categoryDir)) {
                fs.mkdirSync(categoryDir, { recursive: true });
            }

            console.log(`📁 Processing category: ${categoryName}`);

            // Fetch photos from this folder
            const photosData = await fetchPhotosFromFolder(folder.id);

            if (!photosData.files || photosData.files.length === 0) {
                console.log(`   No photos in ${categoryName}`);
                manifest[categoryName] = [];
                continue;
            }

            console.log(`   Found ${photosData.files.length} photos`);

            // Download each photo
            const photoNames = [];
            for (const photo of photosData.files) {
                const filePath = path.join(categoryDir, photo.name);
                await downloadFile(photo.id, filePath);
                photoNames.push(photo.name);
                console.log(`   ✓ ${photo.name}`);
            }

            manifest[categoryName] = photoNames;
            totalPhotos += photoNames.length;
        }

        // Save manifest
        fs.writeFileSync(
            path.join(PHOTOS_DIR, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
        );

        console.log(`\n✅ Successfully synced ${totalPhotos} photos across ${foldersData.files.length} categories`);

    } catch (error) {
        console.error('❌ Error syncing photos:', error.message);
        process.exit(1);
    }
}

syncPhotos();
