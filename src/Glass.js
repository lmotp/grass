import * as THREE from "three";
import { MeshTransmissionMaterial } from "./material/MeshTransmissionMaterial.js";

import normalTexture from "./assets/dirt1.png";

const normalMapTexture = new THREE.TextureLoader().load(normalTexture);
normalMapTexture.wrapS = normalMapTexture.wrapT = 1000;

const geometry = new THREE.SphereGeometry(8, 32, 16);
const material = Object.assign(new MeshTransmissionMaterial(10), {
  clearcoat: 1,
  clearcoatRoughness: 0,
  transmission: 1,
  chromaticAberration: 0.03,
  anisotrophicBlur: 0.1,
  // Set to > 0 for diffuse roughness
  roughness: 0,
  thickness: 4.5,
  ior: 1.5,
  // Set to > 0 for animation
  distortion: 0.64,
  distortionScale: 0.2,
  temporalDistortion: 0.2,
  color: new THREE.Color("white"),
});
material.normalMap = normalMapTexture;

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
