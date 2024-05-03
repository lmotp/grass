import * as THREE from "three";

import cloudSrc from "./assets/cloud.jpg";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";

const BLADE_WIDTH = 0.1;
const BLADE_HEIGHT = 0.8;
const BLADE_HEIGHT_VARIATION = 0.6;
const BLADE_VERTEX_COUNT = 5;
const BLADE_TIP_OFFSET = 0.1;

const cloudTexture = new THREE.TextureLoader().load(cloudSrc);
cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;

// lerp와 비슷한 느낌의 보간법.
function interpolate(val, oldMin, oldMax, newMin, newMax) {
  return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

class GrassGeometry extends THREE.BufferGeometry {
  constructor(size, count) {
    super();

    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i < count; i++) {
      const surfaceMin = (size / 2) * -1;
      const surfaceMax = size / 2;
      const radius = (size / 2) * Math.random(); // 심어지는 위치 인듯.
      const theta = Math.random() * 2 * Math.PI;

      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);

      uvs.push(
        ...Array.from({ length: BLADE_VERTEX_COUNT }).flatMap(() => [
          interpolate(x, surfaceMin, surfaceMax, 0, 1),
          interpolate(y, surfaceMin, surfaceMax, 0, 1),
        ])
      );

      const blade = this.computeBlade([x, 0, y], i);
      positions.push(...blade.positions);
      indices.push(...blade.indices);
    }

    this.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    this.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));

    // 각 삼각형의 인덱스값 선언
    this.setIndex(indices);

    this.computeVertexNormals();
  }

  // Grass blade generation, covered in https://smythdesign.com/blog/stylized-grass-webgl
  // TODO: reduce vertex count, optimize & possibly move to GPU
  computeBlade(center, index = 0) {
    const height = BLADE_HEIGHT + Math.random() * BLADE_HEIGHT_VARIATION;
    const vIndex = index * BLADE_VERTEX_COUNT;

    // Randomize blade orientation and tip angle
    const yaw = Math.random() * Math.PI * 2;
    const yawVec = [Math.sin(yaw), 0, -Math.cos(yaw)];
    const bend = Math.random() * Math.PI * 2;
    const bendVec = [Math.sin(bend), 0, -Math.cos(bend)];

    // Calc bottom, middle, and tip vertices
    // 포지션(정점) 위치, bl,br은 밑에 좌우, tl,tr,tc 위쪽 tip분
    // 여기서 잎사귀 크기 정함.
    const bl = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * 1 + center[i]);
    const br = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * -1 + center[i]);
    const tl = yawVec.map((n, i) => n * (BLADE_WIDTH / 4) * 1 + center[i]);
    const tr = yawVec.map((n, i) => n * (BLADE_WIDTH / 4) * -1 + center[i]);
    const tc = bendVec.map((n, i) => n * BLADE_TIP_OFFSET + center[i]);

    // Attenuate height
    tl[1] += height / 2;
    tr[1] += height / 2;
    tc[1] += height;

    return {
      positions: [...bl, ...br, ...tr, ...tl, ...tc],
      // [0,1,2  2,4,3  3,0,2] 이러한 느낌으로 삼각형이 총 3개인거다.
      // 첫번째와 마지막이 네모 박스 느낌, 두번째는 위쪽 뚜껑? 느낌으로 4번째가 뚜껑 맨 윗부분이라고 생각하면 됨.
      indices: [vIndex, vIndex + 1, vIndex + 2, vIndex + 2, vIndex + 4, vIndex + 3, vIndex + 3, vIndex, vIndex + 2],
    };
  }
}

class Grass extends THREE.Mesh {
  constructor(size, count) {
    const geometry = new GrassGeometry(size, count);
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

    super(geometry, material);

    // 바닥 만듦
    const floor = new THREE.Mesh(new THREE.CircleGeometry(15, 8).rotateX(Math.PI / 2), material);
    // 0을 제외하고 가장 작은 숫자만큼 y값을 내림.
    floor.position.y = -Number.EPSILON;

    this.add(floor);
  }

  update(time, inclination) {
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uInclination.value = inclination;
  }
}

export default Grass;
