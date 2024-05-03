import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Grass from "./Grass";

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

camera.position.set(-7, 3, 7);
// camera.position.set(1, 1, 7);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2.2;
controls.maxDistance = 15;

const scene = new THREE.Scene();

const grass = new Grass(30, 1000);
scene.add(grass);

renderer.setAnimationLoop((time) => {
  grass.update(time);

  controls.update();
  renderer.render(scene, camera);
});
