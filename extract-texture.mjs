import { NodeIO } from '@gltf-transform/core';
import fs from 'fs';

const io = new NodeIO();
const document = await io.read('./public/models/card.glb');
const root = document.getRoot();

root.listTextures().forEach((tex, i) => {
  const image = tex.getImage();
  const mime = tex.getMimeType();
  const ext = mime === 'image/png' ? 'png' : 'jpg';
  const filename = `extracted-texture-${i}-${tex.getName() || 'unnamed'}.${ext}`;
  fs.writeFileSync(filename, image);
  console.log(`Saved ${filename}`);
});

root.listMaterials().forEach((mat) => {
  console.log('Material:', mat.getName(), '-> baseColorTexture name:', mat.getBaseColorTexture()?.getName());
});