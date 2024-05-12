import * as THREE from "three";

import vertexShader from "./shader/floor/vertex.glsl";
import fragmentShader from "./shader/floor/fragment.glsl";

import cloudSrc from "./assets/cloud.jpg";

const cloudTexture = new THREE.TextureLoader().load(cloudSrc);
cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;

const material = new THREE.ShaderMaterial({
  uniforms: {
    uCloud: { value: cloudTexture },
    uTime: { value: 0 },
    uInclination: { value: new THREE.Vector3() },
  },
  side: THREE.DoubleSide,
  vertexShader,
  fragmentShader,
});
const floor = new THREE.Mesh(new THREE.CircleGeometry(5, 8).rotateX(Math.PI / 2), material);

// 0을 제외하고 가장 작은 숫자만큼 y값을 내림.
floor.position.y = -Number.EPSILON;

export default floor;
