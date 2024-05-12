uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

float wave(float waveSize, float tipDistance, float centerDistance) {
  // isTip은 블레이드 인덱스의 5번째 꼭짓점인지 유무, 즉 isTip이면 
  bool isTip = (gl_VertexID + 1) % 5 == 0;

  // 잎사귀가 얼마나 빠르게 흔들릴지 결정
  float waveDistance = isTip ? tipDistance : centerDistance;
  return sin((uTime / 500.0) + waveSize) * waveDistance;
}

void main() {
  vPosition = position;
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  if(vPosition.y < 0.0) {
    vPosition.y = 0.0;
  } else {
    vPosition.x += wave(uv.x * 10.0, 0.5, 0.1);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}