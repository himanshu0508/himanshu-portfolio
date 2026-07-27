import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';

const io = new NodeIO();
const document = await io.read('./public/models/card.glb');
const root = document.getRoot();

const newImageData = fs.readFileSync('./src/assets/Lanyard/profile.png');

const material = root.listMaterials().find(m => m.getName() === 'base'); // adjust if extract step showed a different name
const texture = material.getBaseColorTexture();
texture.setImage(newImageData).setMimeType('image/png');

await io.write('./public/models/card.glb', document);
console.log('Done — card.glb updated.');