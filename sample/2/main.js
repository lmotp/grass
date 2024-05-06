import * as THREE from "three";
import * as dat from "lil-gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Grass from "./Grass";

// 디바이스 기울기
const gui = new dat.GUI();
const inclination = {
  x: 0,
  y: 0,
  z: 0,
};

function onDeviceOrientationEvent(e) {
  const x = e.gamma;
  const y = e.beta;
  const z = e.alpha;

  inclination.x = x;
  inclination.y = y;
  inclination.z = z;
}

gui.add(inclination, "x").min(-1).max(1).step(0.01);
gui.add(inclination, "y").min(-1).max(1).step(0.01);
gui.add(inclination, "z").min(-1).max(1).step(0.01);

window.addEventListener("deviceorientation", onDeviceOrientationEvent);

// three.js 기본값,
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

camera.position.set(0, 2, 7);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2.2;
controls.maxDistance = 15;

const scene = new THREE.Scene();

const grass = new Grass(30, 100000);
scene.add(grass);

renderer.setAnimationLoop((time) => {
  grass.update(time, inclination);

  controls.update();
  renderer.render(scene, camera);
});
