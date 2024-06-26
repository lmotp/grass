uniform sampler2D uCloud;
uniform vec3 uInclination;
uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

vec3 green = vec3(0.2, 0.6, 0.3);

void main() {
  vec3 color = mix(green * 0.7, green, vPosition.y);
  color = mix(color, texture2D(uCloud, vUv).rgb, 0.4);

  // 빛방향 정하는값. dot은 
  float lighting = normalize(dot(vNormal, vec3(10)));
  gl_FragColor = vec4(color + lighting * 0.03, 1.0);
  // gl_FragColor = vec4(normalize(uInclination), 1.0);
  // gl_FragColor = vec4(uInclination.x, 1., 0., 1.0);
  // gl_FragColor = vec4(vec3(uTime), 1.0);
}