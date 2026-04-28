import * as THREE from "three";
const [vertexShader, fragmentShader] = await Promise.all([
  fetch(new URL("./shader/floor/vertex.glsl", import.meta.url)).then((response) => response.text()),
  fetch(new URL("./shader/floor/fragment.glsl", import.meta.url)).then((response) => response.text()),
]);

const cloudTexture = new THREE.TextureLoader().load(new URL("./assets/cloud.jpg", import.meta.url).href);
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
const floor = new THREE.Mesh(new THREE.CircleGeometry(15, 8).rotateX(Math.PI / 2), material);

// 0을 제외하고 가장 작은 숫자만큼 y값을 내림.
floor.position.y = -Number.EPSILON;

export default floor;
