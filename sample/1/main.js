import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

// init
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

// Mesh
const GRASS_BLADES = 1024;
const GRASS_BLADE_VERTICES = 15;


function CreateTileGeometry() { 
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
  }
}

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation
function animation(time) {
  renderer.render(scene, camera);
}
