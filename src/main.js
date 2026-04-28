import * as THREE from "three";
import * as dat from "lil-gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/addons/controls/TransformControls.js";

import Grass from "./Grass";
import Glass from "./Glass";
import floor from "./Floor";

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

gui.add(inclination, "x").min(-90).max(90).step(1);
gui.add(inclination, "y").min(-1).max(1).step(0.01);
gui.add(inclination, "z").min(-1).max(1).step(0.01);

window.addEventListener("deviceorientation", onDeviceOrientationEvent);

// three.js 기본값,
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// renderTarget
const targetPlaneSize = { width: 6, height: 7 };
const renderTargetWidth = targetPlaneSize.width * 300;
const renderTargetHeight = targetPlaneSize.height * 300;
const renderTarget = new THREE.WebGLRenderTarget(renderTargetWidth, renderTargetHeight);

const scene = new THREE.Scene();
const secondaryScene = new THREE.Scene();
secondaryScene.background = new THREE.Color(0xffffff);

// 카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

const secondaryCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
secondaryCamera.position.set(0, 2, 7.5);

const helper = new THREE.CameraHelper(secondaryCamera);
scene.add(helper);

const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.attach(secondaryCamera);
scene.add(transformControls);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2.2;
controls.maxDistance = 15;

// 조명
const ambientLight = new THREE.AmbientLight();
const pointLight = new THREE.PointLight();

pointLight.position.set(10, 10, 10);

secondaryScene.add(ambientLight);
secondaryScene.add(pointLight);

// 객체
const grass = new Grass(30, 100000);
secondaryScene.add(grass);
secondaryScene.add(floor);

const glass = Glass(renderTarget);

scene.add(glass);

renderer.setAnimationLoop((time) => {
  renderer.setRenderTarget(renderTarget);
  renderer.render(secondaryScene, secondaryCamera);
  renderer.setRenderTarget(null);

  renderer.render(scene, camera);

  grass.update(time, inclination);
  controls.update();
});
